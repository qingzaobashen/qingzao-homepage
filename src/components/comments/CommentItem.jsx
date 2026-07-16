/**
 * 单条评论组件（支持递归嵌套渲染回复）
 * 渲染昵称、正文、提交时间，并提供「回复」入口。
 * 回复采用内联表单（compact 模式），通过父子回调将 parent_id 回传顶层提交。
 */

import React, { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import CommentForm from './CommentForm'

/**
 * 视觉缩进最大层级：超过后不再增加左边距，避免移动端过窄
 */
const MAX_INDENT_DEPTH = 3

/**
 * 将 ISO 时间格式化为「相对时间 + 绝对时间」标题
 * @param {string} iso - ISO 8601 时间字符串
 * @param {string} language - 当前语言
 * @returns {{ relative: string, absolute: string }}
 */
function formatTime(iso, language) {
  const date = new Date(iso)
  const diffMs = Date.now() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const isEn = language === 'en-US'

  let relative
  if (diffMin < 1) {
    relative = isEn ? 'just now' : '刚刚'
  } else if (diffMin < 60) {
    relative = isEn ? `${diffMin}m ago` : `${diffMin} 分钟前`
  } else if (diffMin < 1440) {
    const h = Math.floor(diffMin / 60)
    relative = isEn ? `${h}h ago` : `${h} 小时前`
  } else {
    const d = Math.floor(diffMin / 1440)
    relative = isEn ? `${d}d ago` : `${d} 天前`
  }

  const absolute = date.toLocaleString(isEn ? 'en-US' : 'zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  return { relative, absolute }
}

/**
 * 单条评论
 * @param {Object} props
 * @param {Object} props.comment - 评论数据
 * @param {Array} props.replies - 该评论的直接子回复（已排序）
 * @param {number} props.depth - 当前嵌套层级（从 1 开始）
 * @param {Function} props.onReply - 回复提交回调 (parentId, { authorName, content })
 * @param {string} props.language - 当前语言
 * @param {boolean} props.submitting - 是否正在提交回复
 */
function CommentItem({ comment, replies = [], depth = 1, onReply, language, submitting }) {
  const { t } = useLanguage()
  const [replying, setReplying] = useState(false)
  const { relative, absolute } = formatTime(comment.created_at, language)

  /**
   * 提交回复：向上层传递 parent_id
   * @param {{ authorName: string, content: string }} payload
   */
  const handleReplySubmit = (payload) => {
    onReply(comment.id, payload)
    setReplying(false)
  }

  return (
    <div
      className="comment-item"
      style={{ marginLeft: depth > 1 ? `${Math.min(depth, MAX_INDENT_DEPTH) * 16}px` : 0 }}
    >
      <div className="comment-item__avatar" aria-hidden="true">
        {comment.author_name.slice(0, 1).toUpperCase()}
      </div>

      <div className="comment-item__body">
        <div className="comment-item__meta">
          <span className="comment-item__name">{comment.author_name}</span>
          <time className="comment-item__time" title={absolute} dateTime={comment.created_at}>
            {relative}
          </time>
        </div>

        <p className="comment-item__content">{comment.content}</p>

        <div className="comment-item__actions">
          {!replying && (
            <button
              type="button"
              className="comment-item__reply-btn"
              onClick={() => setReplying(true)}
            >
              {t('comments.form.reply')}
            </button>
          )}
        </div>

        {replying && (
          <CommentForm
            compact
            replyToName={comment.author_name}
            submitting={submitting}
            onCancel={() => setReplying(false)}
            onSubmit={handleReplySubmit}
          />
        )}

        {/* 递归渲染子回复（支持多级嵌套，至少二级） */}
        {replies.length > 0 && (
          <div className="comment-item__children">
            {replies.map((child) => (
              <CommentItem
                key={child.comment.id}
                comment={child.comment}
                replies={child.replies}
                depth={depth + 1}
                onReply={onReply}
                language={language}
                submitting={submitting}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentItem
