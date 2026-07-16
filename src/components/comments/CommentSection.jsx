/**
 * 评论区容器组件
 * 负责：加载评论、组装嵌套树、管理加载 / 错误 / 提交状态，
 * 并渲染顶层评论表单与评论列表。所有数据交互经由 src/api/comments.js 完成，
 * 与具体后端（Supabase / 本地降级）解耦。
 */

import React, { useEffect, useState, useCallback } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { fetchComments, createComment } from '../../api/comments'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import './comments.css'

/**
 * 将扁平评论列表组装为嵌套树
 * @param {Array} flatList - 扁平评论数组（含 parent_id）
 * @returns {Array<{ comment: Object, replies: Array }>} 顶层评论树
 */
function buildCommentTree(flatList) {
  const map = new Map()
  flatList.forEach((c) => map.set(c.id, { comment: c, replies: [] }))

  const roots = []
  flatList.forEach((c) => {
    const node = map.get(c.id)
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id).replies.push(node)
    } else {
      roots.push(node)
    }
  })
  return roots
}

/**
 * 评论区
 * @param {Object} props
 * @param {string} props.slug - 文章 slug（评论归属标识）
 */
function CommentSection({ slug }) {
  const { t, language } = useLanguage()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  /**
   * 加载评论列表
   */
  const load = useCallback(async () => {
    setLoading(true)
    setLoadError(false)
    try {
      const list = await fetchComments(slug)
      setComments(list)
    } catch (err) {
      console.error('Failed to load comments:', err)
      setLoadError(true)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    load()
  }, [load])

  /**
   * 提交评论（顶级或回复统一入口）
   * @param {string|null} parentId - 父评论 id；顶级为 null
   * @param {{ authorName: string, content: string }} payload
   */
  const handleSubmit = async (parentId, payload) => {
    setSubmitting(true)
    setSubmitError(false)
    try {
      const created = await createComment({
        post_slug: slug,
        parent_id: parentId,
        author_name: payload.authorName,
        content: payload.content,
      })
      setComments((prev) => [...prev, created])
    } catch (err) {
      console.error('Failed to submit comment:', err)
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const tree = buildCommentTree(comments)

  return (
    <section className="comment-section" id="comments">
      <h2 className="comment-section__title">
        {t('comments.title')}
        <span className="comment-section__count">
          {t('comments.count', { count: comments.length })}
        </span>
      </h2>

      {/* 顶层评论表单 */}
      <div className="comment-section__form">
        <CommentForm submitting={submitting} onSubmit={(payload) => handleSubmit(null, payload)} />
      </div>

      {/* 提交错误提示 */}
      {submitError && (
        <div className="comment-section__alert comment-section__alert--error" role="alert">
          {t('comments.submitError')}
        </div>
      )}

      {/* 加载状态 */}
      {loading && (
        <div className="comment-section__status" role="status">
          <span className="comment-section__spinner" aria-hidden="true" />
          {t('comments.loading')}
        </div>
      )}

      {/* 加载错误（含重试） */}
      {!loading && loadError && (
        <div className="comment-section__alert comment-section__alert--error" role="alert">
          {t('comments.loadError')}
          <button type="button" className="comment-section__retry" onClick={load}>
            {t('comments.retry')}
          </button>
        </div>
      )}

      {/* 空状态 */}
      {!loading && !loadError && tree.length === 0 && (
        <p className="comment-section__empty">{t('comments.empty')}</p>
      )}

      {/* 评论列表 */}
      {!loading && !loadError && tree.length > 0 && (
        <div className="comment-section__list">
          {tree.map((node) => (
            <CommentItem
              key={node.comment.id}
              comment={node.comment}
              replies={node.replies}
              depth={1}
              onReply={handleSubmit}
              language={language}
              submitting={submitting}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default CommentSection
