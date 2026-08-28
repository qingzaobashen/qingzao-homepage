"""
为所有文章添加 coverImage 字段
"""
import json, os

# 读取文章数据
with open('src/data/posts/posts-zh.json', 'r', encoding='utf-8') as f:
    posts_zh = json.load(f)
with open('src/data/posts/posts-en.json', 'r', encoding='utf-8') as f:
    posts_en = json.load(f)

# 有图片目录的文章slug列表
image_dirs = {
    'planning-stage', 'renovation-method-choice', 'whole-house-customization',
    'floor-heating-online-selection', 'window-sealing-online-checklist',
    'wall-demolition-new-wall', 'plumbing-electrical-acceptance',
    'tile-installation-acceptance', 'central-ac-selection-install',
    'design-details-reference', 'bathroom-backfill-waterproofing',
    'ducted-ac-selection-install'
}

# 分类封面图映射
category_covers = {
    '装修指南': '/images/covers/renovation-guide.jpg',
    '图片处理': '/images/covers/image-processing.jpg',
    '机制生活': '/images/covers/smart-home.jpg',
    '工具评测': '/images/covers/tool-review.jpg',
    '家居生活': '/images/covers/home-living.jpg',
    '产品教程': '/images/covers/product-tutorial.jpg'
}

def find_first_image(slug):
    base = f'public/images/articles/{slug}'
    if not os.path.isdir(base):
        return None
    for f in sorted(os.listdir(base)):
        if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            return f'/images/articles/{slug}/{f}'
    return None

# 更新两个JSON文件
for posts in [posts_zh, posts_en]:
    for post in posts:
        slug = post['slug']
        img = find_first_image(slug)
        if img:
            post['coverImage'] = img
        else:
            cat = post.get('category', '装修指南')
            post['coverImage'] = category_covers.get(cat, '/images/covers/renovation-guide.jpg')

# 保存
with open('src/data/posts/posts-zh.json', 'w', encoding='utf-8') as f:
    json.dump(posts_zh, f, ensure_ascii=False, indent=2)
with open('src/data/posts/posts-en.json', 'w', encoding='utf-8') as f:
    json.dump(posts_en, f, ensure_ascii=False, indent=2)

print('Done! Updated posts with coverImage fields.')
