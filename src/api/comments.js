/**
 * 评论后端接口层（模块化封装）
 *
 * 职责：
 *   1. 定义与 Supabase 表结构一一对应的评论数据模型；
 *   2. 预留 Supabase 的「查询 / 插入 / 更新」方法（见 SupabaseCommentRepository）；
 *   3. 在未配置 Supabase 时，自动降级到基于 localStorage 的本地仓储，
 *      使整套评论 UI 在无后端环境下也能端到端跑通（演示 / 测试用）；
 *   4. 对外暴露稳定的高层函数：fetchComments / createComment / updateComment。
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Supabase 表结构（SQL）
 * ─────────────────────────────────────────────────────────────────────────────
 * create table comments (
 *   id          uuid        primary key default gen_random_uuid(),
 *   post_slug   text        not null,                 -- 关联文章 slug（URL 级，ASCII）
 *   parent_id   uuid        references comments(id)   -- 父评论 id；顶级评论为 null
 *                           on delete cascade,        -- 删除父评论时级联删除子回复
 *   author_name text        not null,                 -- 评论者昵称
 *   content     text        not null,                 -- 评论正文
 *   created_at  timestamptz not null default now(),   -- 提交时间
 *   updated_at  timestamptz not null default now()    -- 最近更新时间
 * );
 *
 * create index idx_comments_post_slug on comments (post_slug);
 * create index idx_comments_parent_id on comments (parent_id);
 *
 * -- 开启公开读写（示例 RLS 策略，正式上线请按需收紧）：
 * alter table comments enable row level security;
 * create policy "public read"  on comments for select using (true);
 * create policy "public insert" on comments for insert with check (true);
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * JS 数据模型（字段与上方列名完全一致，snake_case）：
 *   {
 *     id: string,
 *     post_slug: string,
 *     parent_id: string | null,
 *     author_name: string,
 *     content: string,
 *     created_at: string,   // ISO 8601
 *     updated_at: string,   // ISO 8601
 *   }
 */

/* 评论数据模型 */
/**
 * @typedef {Object} Comment
 * @property {string} id          评论唯一 id
 * @property {string} post_slug   关联文章 slug
 * @property {string|null} parent_id 父评论 id（顶级评论为 null）
 * @property {string} author_name 评论者昵称
 * @property {string} content     评论正文
 * @property {string} created_at  提交时间（ISO 8601）
 * @property {string} updated_at  最近更新时间（ISO 8601）
 */

/**
 * 新建评论入参
 * @typedef {Object} CreateCommentInput
 * @property {string} post_slug
 * @property {string|null} parent_id
 * @property {string} author_name
 * @property {string} content
 */

/* 配置：从环境变量读取 Supabase 连接信息（Vite 通过 import.meta.env 注入） */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * 是否已配置 Supabase（同时具备 URL 与 anon key 才视为启用）
 * @type {boolean}
 */
export const isSupabaseEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

/**
 * 评论仓储接口规范（契约）
 * 所有实现（本地 / Supabase）必须满足以下方法签名：
 *   - getByPostSlug(postSlug): Promise<Comment[]>
 *   - create(input: CreateCommentInput): Promise<Comment>
 *   - update(id: string, patch: { content: string }): Promise<Comment>
 */
class CommentRepository {
  /** @returns {Promise<Comment[]>} */
  // eslint-disable-next-line no-unused-vars
  getByPostSlug(postSlug) {
    throw new Error('Not implemented: getByPostSlug')
  }
  /** @returns {Promise<Comment>} */
  // eslint-disable-next-line no-unused-vars
  create(input) {
    throw new Error('Not implemented: create')
  }
  /** @returns {Promise<Comment>} */
  // eslint-disable-next-line no-unused-vars
  update(id, patch) {
    throw new Error('Not implemented: update')
  }
}

/**
 * Supabase 评论仓储
 * 预留完整的查询 / 插入 / 更新方法，字段与 Supabase 表结构一一对应。
 *
 * 注意：启用前需 `npm i @supabase/supabase-js`，并在 .env 中配置
 * VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY。
 */
class SupabaseCommentRepository extends CommentRepository {
  /**
   * @param {string} url - Supabase 项目 URL
   * @param {string} anonKey - Supabase anon public key
   */
  constructor(url, anonKey) {
    super()
    this.url = url
    this.anonKey = anonKey
    this._client = null
  }

  /**
   * 懒加载并缓存 Supabase 客户端。
   * 使用变量名 + @vite-ignore，确保构建期不强制解析 @supabase/supabase-js，
   * 只有真正启用 Supabase 时才在运行时动态加载该依赖。
   * @returns {Promise<object>} Supabase client
   */
  async _getClient() {
    if (this._client) return this._client
    const moduleName = '@supabase/supabase-js'
    const { createClient } = await import(/* @vite-ignore */ moduleName)
    this._client = createClient(this.url, this.anonKey)
    return this._client
  }

  /**
   * 查询某篇文章的全部评论（按提交时间升序，保证顶层与回复顺序一致）
   * Supabase 对应：select().eq().order()
   * @param {string} postSlug
   * @returns {Promise<Comment[]>}
   */
  async getByPostSlug(postSlug) {
    const supabase = await this._getClient()
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_slug', postSlug)
      .order('created_at', { ascending: true })

    if (error) throw new Error(error.message)
    return data || []
  }

  /**
   * 插入一条评论
   * Supabase 对应：insert().select().single()
   * @param {CreateCommentInput} input
   * @returns {Promise<Comment>}
   */
  async create(input) {
    const supabase = await this._getClient()
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_slug: input.post_slug,
        parent_id: input.parent_id ?? null,
        author_name: input.author_name,
        content: input.content,
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  /**
   * 更新评论内容（如编辑正文）。仅允许更新 content 与 updated_at。
   * Supabase 对应：update().eq().select().single()
   * @param {string} id
   * @param {{ content: string }} patch
   * @returns {Promise<Comment>}
   */
  async update(id, patch) {
    const supabase = await this._getClient()
    const { data, error } = await supabase
      .from('comments')
      .update({ content: patch.content, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }
}

/**
 * 本地评论仓储（localStorage 降级实现）
 * 不依赖任何后端，用于未配置 Supabase 时的演示与测试。
 * 数据结构与 Supabase 完全一致，切换后端时 UI 层无需改动。
 */
class LocalCommentRepository extends CommentRepository {
  /**
   * 读取某篇文章的评论数组
   * @param {string} postSlug
   * @returns {Comment[]}
   */
  _readAll(postSlug) {
    try {
      const raw = localStorage.getItem(`comments:${postSlug}`)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  /**
   * 写入某篇文章的评论数组
   * @param {string} postSlug
   * @param {Comment[]} list
   */
  _writeAll(postSlug, list) {
    try {
      localStorage.setItem(`comments:${postSlug}`, JSON.stringify(list))
    } catch (error) {
      console.warn('Failed to persist comments to localStorage:', error)
    }
  }

  /** @param {string} postSlug @returns {Promise<Comment[]>} */
  async getByPostSlug(postSlug) {
    return this._readAll(postSlug)
  }

  /** @param {CreateCommentInput} input @returns {Promise<Comment>} */
  async create(input) {
    const list = this._readAll(input.post_slug)
    const now = new Date().toISOString()
    /** @type {Comment} */
    const comment = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      post_slug: input.post_slug,
      parent_id: input.parent_id ?? null,
      author_name: input.author_name,
      content: input.content,
      created_at: now,
      updated_at: now,
    }
    list.push(comment)
    this._writeAll(input.post_slug, list)
    return comment
  }

  /** @param {string} id @param {{ content: string }} patch @returns {Promise<Comment>} */
  async update(id, patch) {
    const list = this._readAll(patch.post_slug)
    const idx = list.findIndex((c) => c.id === id)
    if (idx === -1) throw new Error('Comment not found')
    list[idx] = {
      ...list[idx],
      content: patch.content,
      updated_at: new Date().toISOString(),
    }
    this._writeAll(patch.post_slug, list)
    return list[idx]
  }
}

/**
 * 仓储工厂：根据环境变量决定使用 Supabase 或本地降级实现
 * @returns {CommentRepository}
 */
export function getCommentRepository() {
  if (isSupabaseEnabled) {
    return new SupabaseCommentRepository(SUPABASE_URL, SUPABASE_ANON_KEY)
  }
  return new LocalCommentRepository()
}

/* ───────────────────────── 对外高层函数（UI 层只依赖这些） ───────────────────────── */

/**
 * 获取某篇文章的评论列表（扁平结构，UI 层自行组装为树）
 * @param {string} postSlug
 * @returns {Promise<Comment[]>}
 */
export async function fetchComments(postSlug) {
  const repo = getCommentRepository()
  return repo.getByPostSlug(postSlug)
}

/**
 * 创建一条评论（顶级或回复）
 * @param {CreateCommentInput} input
 * @returns {Promise<Comment>}
 */
export async function createComment(input) {
  const repo = getCommentRepository()
  return repo.create(input)
}

/**
 * 更新评论正文
 * @param {string} id
 * @param {{ content: string, post_slug: string }} patch
 * @returns {Promise<Comment>}
 */
export async function updateComment(id, patch) {
  const repo = getCommentRepository()
  return repo.update(id, patch)
}
