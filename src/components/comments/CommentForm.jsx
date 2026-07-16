/**
 * 评论提交表单组件
 * 支持昵称、评论内容的输入，内置字数限制与空值校验。
 * 既可作为顶级评论表单，也可作为内联回复表单（compact 模式）。
 */

import React, { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

/**
 * 字数限制常量（与后台校验、Supabase 字段长度保持一致）
 */
const NICKNAME_MAX = 20
const CONTENT_MAX = 500

/**
 * 评论提交表单
 * @param {Object} props
 * @param {Function} props.onSubmit - 提交回调，入参 { authorName, content }
 * @param {boolean} [props.submitting] - 是否处于提交中（禁用表单）
 * @param {Function} [props.onCancel] - 取消回调（回复表单显示取消按钮）
 * @param {string} [props.replyToName] - 被回复者昵称（用于占位符与标题）
 * @param {boolean} [props.compact] - 紧凑模式（用于嵌套回复）
 */
function CommentForm({ onSubmit, submitting = false, onCancel, replyToName, compact = false }) {
  const { t } = useLanguage()
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})

  /**
   * 校验并触发表单提交
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}

    const name = authorName.trim()
    const text = content.trim()

    if (!name) {
      nextErrors.authorName = t('comments.form.nicknameRequired')
    } else if (name.length > NICKNAME_MAX) {
      nextErrors.authorName = t('comments.form.nicknameTooLong', { max: NICKNAME_MAX })
    }

    if (!text) {
      nextErrors.content = t('comments.form.contentRequired')
    } else if (text.length > CONTENT_MAX) {
      nextErrors.content = t('comments.form.contentTooLong', { max: CONTENT_MAX })
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({ authorName: name, content: text })
    // 提交成功后清空（回复表单由父级控制卸载，无需手动重置）
    if (!compact) {
      setAuthorName('')
      setContent('')
    }
    setErrors({})
  }

  const placeholder = replyToName
    ? t('comments.form.replyPlaceholder', { name: replyToName })
    : t('comments.form.contentPlaceholder')

  return (
    <form
      className={`comment-form${compact ? ' comment-form--compact' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="comment-form__row">
          <input
            type="text"
            name="nickname"
            className={`comment-form__input${errors.authorName ? ' is-error' : ''}`}
            value={authorName}
            maxLength={NICKNAME_MAX + 10}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder={t('comments.form.nicknamePlaceholder')}
          aria-label={t('comments.form.nickname')}
          disabled={submitting}
        />
        <span className="comment-form__counter">
          {authorName.trim().length}/{NICKNAME_MAX}
        </span>
      </div>


      <div className="comment-form__row">
          <textarea
            name="content"
            className={`comment-form__textarea${errors.content ? ' is-error' : ''}`}
            value={content}
            maxLength={CONTENT_MAX + 50}
          rows={compact ? 3 : 4}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          aria-label={t('comments.form.content')}
          disabled={submitting}
        />
        <span className="comment-form__counter comment-form__counter--bottom">
          {content.trim().length}/{CONTENT_MAX}
        </span>
      </div>

      {errors.authorName && <p className="comment-form__error">{errors.authorName}</p>}
      {errors.content && <p className="comment-form__error">{errors.content}</p>}

      <div className="comment-form__actions">
        {onCancel && (
          <button
            type="button"
            className="comment-form__btn comment-form__btn--ghost"
            onClick={onCancel}
            disabled={submitting}
          >
            {t('comments.form.cancel')}
          </button>
        )}
        <button
          type="submit"
          className="comment-form__btn comment-form__btn--primary"
          disabled={submitting}
        >
          {submitting
            ? t('comments.form.submitting')
            : replyToName
              ? t('comments.form.reply')
              : t('comments.form.submit')}
        </button>
      </div>
    </form>
  )
}

export default CommentForm
