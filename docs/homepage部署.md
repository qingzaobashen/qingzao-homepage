现在我为你提供完整的部署方案和代码修改建议。
## 📋 部署方案概览

我推荐使用 **Vercel** 或 **Netlify** 进行部署，因为它们提供：
- 自动 SSL 证书
- 简单的域名配置
- 自动 CI/CD
- 免费额度充足

---

## 📋 完整部署方案

### 一、项目架构规划

```
qingzao.site (主域名 - 个人主页)
├── 个人介绍
├── 产品列表
│   ├── 装修导图 → decoration.qingzao.site
│   └── 其他产品...
└── 联系方式

decoration.qingzao.site (子域名 - 装修导图)
└── 装修导图应用
```

---

### 二、推荐方案：Vercel 部署

#### ✅ 优势
- 免费 SSL 证书
- 自动 CI/CD
- 简单的域名配置
- 全球 CDN 加速
- 免费额度充足

---

### 三、详细部署步骤

#### 步骤 1：创建个人主页项目

我已经为你创建了完整的个人主页项目模板，包含以下文件：

**项目结构：**
```
qingzao-homepage/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Hero.jsx
│   │   ├── Hero.css
│   │   ├── Products.jsx
│   │   ├── Products.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

**请按照上面提供的代码创建这些文件。**

---

#### 步骤 2：修改装修导图项目，添加返回主页链接

我建议在 Sidebar 组件的顶部添加一个"返回主页"按钮。以下是修改建议：
        
            
toolName: show_diff
            
status: success
          
            
filePath: d:\workT\wx_smallPrograms\Decorations\DecorationMindMap_github\src\components\Sidebar.jsx
          
changes: 
              
newStr:       {/* 只在非移动设备上显示折叠按钮 */}
      {!isMobile && (
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <FaProjectDiagram />
            {!isCollapsed && <span className="logo-text">装修导图</span>}
          </div>
          <Button 
            className="toggle-btn"
            onClick={() => onToggleCollapse(!isCollapsed)}
            icon={isCollapsed ? <FaBars /> : <FaTimes />}
            type="text"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggleCollapse(!isCollapsed);
              }
            }}
            aria-label={isCollapsed ? "展开侧边栏" : "折叠侧边栏"}
          />
        </div>
      )}
      
      {/* 返回主页按钮 */}
      <div className="home-link-container">
        <Tooltip
          title={isCollapsed ? "返回主页" : ""}
          placement="right"
        >
          <Button
            className="nav-btn_col home-btn"
            type="text"
            onClick={() => window.open('https://qingzao.site', '_blank')}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.open('https://qingzao.site', '_blank');
              }
            }}
            aria-label="返回主页"
          >
            <FaHome />
            <span>返回主页</span>
          </Button>
        </Tooltip>
      </div>
              
oldStr:       {/* 只在非移动设备上显示折叠按钮 */}
      {!isMobile && (
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <FaProjectDiagram />
            {!isCollapsed && <span className="logo-text">装修导图</span>}
          </div>
          <Button 
            className="toggle-btn"
            onClick={() => onToggleCollapse(!isCollapsed)}
            icon={isCollapsed ? <FaBars /> : <FaTimes />}
            type="text"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggleCollapse(!isCollapsed);
              }
            }}
            aria-label={isCollapsed ? "展开侧边栏" : "折叠侧边栏"}
          />
        </div>
      )}
            
          
现在还需要在 Sidebar 组件中导入 FaHome 图标：
        
            
toolName: show_diff
            
status: success
          
            
filePath: d:\workT\wx_smallPrograms\Decorations\DecorationMindMap_github\src\components\Sidebar.jsx
          
changes: 
              
newStr: import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser, FaCrown, FaHome } from 'react-icons/fa';
              
oldStr: import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser, FaCrown } from 'react-icons/fa';
            
          
现在让我为你提供完整的部署步骤文档：

---

## 📚 完整部署指南

### 四、DNS 解析配置

#### 4.1 在域名服务商处配置 DNS

**登录你的域名服务商（如阿里云、腾讯云、Cloudflare 等）**

添加以下 DNS 记录：

| 记录类型 | 主机记录 | 记录值 | TTL | 说明 |
|---------|---------|--------|-----|------|
| A | @ | 76.76.21.21 | 600 | 主域名指向 Vercel |
| A | www | 76.76.21.21 | 600 | www 子域名指向 Vercel |
| CNAME | decoration | cname.vercel-dns.com | 600 | 装修导图子域名 |
| CNAME | www.decoration | cname.vercel-dns.com | 600 | www.decoration 子域名 |

**注意：**
- `76.76.21.21` 是 Vercel 的 IP 地址
- 如果你使用其他平台（如 Netlify），需要使用对应的 IP 或 CNAME

---

### 五、Vercel 部署步骤

#### 5.1 部署个人主页项目

**步骤 1：安装 Vercel CLI**

```bash
npm install -g vercel
```

**步骤 2：登录 Vercel**

```bash
vercel login
```

**步骤 3：部署个人主页项目**

```bash
cd d:\workT\wx_smallPrograms\qingzao-homepage
vercel
```

按照提示操作：
- 选择项目范围
- 确认项目名称
- 确认部署

**步骤 4：配置域名**

```bash
vercel domains add qingzao.site
vercel domains add www.qingzao.site
```

**步骤 5：验证域名**

Vercel 会自动为你配置 SSL 证书。验证域名所有权后，SSL 证书会在几分钟内自动配置完成。

---

#### 5.2 部署装修导图项目

**步骤 1：修改 CNAME 文件**

修改装修导图项目的 CNAME 文件：

```
decoration.qingzao.site
```

**步骤 2：部署项目**

```bash
cd d:\workT\wx_smallPrograms\Decorations\DecorationMindMap_github
vercel
```

**步骤 3：配置域名**

```bash
vercel domains add decoration.qingzao.site
vercel domains add www.decoration.qingzao.site
```

**步骤 4：验证域名**

同样，Vercel 会自动配置 SSL 证书。

---

### 六、GitHub 自动部署（推荐）

#### 6.1 将项目推送到 GitHub

**个人主页项目：**

```bash
cd d:\workT\wx_smallPrograms\qingzao-homepage
git init
git add .
git commit -m "Initial commit: 个人主页"
git branch -M main
git remote add origin https://github.com/你的用户名/qingzao-homepage.git
git push -u origin main
```

**装修导图项目：**

```bash
cd d:\workT\wx_smallPrograms\Decorations\DecorationMindMap_github
git add .
git commit -m "Update: 添加返回主页链接"
git push
```

#### 6.2 在 Vercel 中导入项目

1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择你的 GitHub 仓库
5. 配置项目设置
6. 点击 "Deploy"

#### 6.3 配置域名

在 Vercel 项目设置中：
1. 进入 "Domains" 设置
2. 添加你的域名
3. 等待 DNS 验证和 SSL 证书配置

---

### 七、方案B：自有服务器部署

如果你有自己的服务器，可以使用 Nginx 部署。

#### 7.1 服务器准备

**购买服务器：**
- 推荐配置：2核 4G 内存
- 操作系统：Ubuntu 20.04 或 CentOS 7+

**安装必要软件：**

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Nginx
sudo apt install nginx -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# 安装 Certbot（用于 SSL 证书）
sudo apt install certbot python3-certbot-nginx -y
```

#### 7.2 构建项目

**个人主页项目：**

```bash
cd d:\workT\wx_smallPrograms\qingzao-homepage
npm install
npm run build
```

**装修导图项目：**

```bash
cd d:\workT\wx_smallPrograms\Decorations\DecorationMindMap_github
npm install
npm run build
```

#### 7.3 上传构建文件到服务器

使用 FTP 或 SCP 上传 `dist` 目录到服务器：

```bash
# 个人主页
scp -r dist/* user@your-server:/var/www/qingzao-homepage/

# 装修导图
scp -r dist/* user@your-server:/var/www/decoration-mindmap/
```

#### 7.4 配置 Nginx

**创建个人主页配置：**

```nginx
# /etc/nginx/sites-available/qingzao.site

server {
    listen 80;
    server_name qingzao.site www.qingzao.site;

    root /var/www/qingzao-homepage;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss image/svg+xml;

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # React Router 配置
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全响应头
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

**创建装修导图配置：**

```nginx
# /etc/nginx/sites-available/decoration.qingzao.site

server {
    listen 80;
    server_name decoration.qingzao.site www.decoration.qingzao.site;

    root /var/www/decoration-mindmap;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss image/svg+xml;

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # React Router 配置
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全响应头
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

**启用配置：**

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/qingzao.site /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/decoration.qingzao.site /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

#### 7.5 配置 SSL 证书

使用 Certbot 自动配置 Let's Encrypt SSL 证书：

```bash
# 为个人主页配置 SSL
sudo certbot --nginx -d qingzao.site -d www.qingzao.site

# 为装修导图配置 SSL
sudo certbot --nginx -d decoration.qingzao.site -d www.decoration.qingzao.site
```

Certbot 会自动修改 Nginx 配置，添加 SSL 相关设置。

**自动续期：**

```bash
# 测试自动续期
sudo certbot renew --dry-run

# Certbot 会自动添加定时任务，证书会在到期前自动续期
```

---

### 八、DNS 解析配置（自有服务器）

在域名服务商处配置 DNS：

| 记录类型 | 主机记录 | 记录值 | TTL | 说明 |
|---------|---------|--------|-----|------|
| A | @ | 你的服务器IP | 600 | 主域名 |
| A | www | 你的服务器IP | 600 | www 子域名 |
| A | decoration | 你的服务器IP | 600 | 装修导图子域名 |
| A | www.decoration | 你的服务器IP | 600 | www.decoration 子域名 |

---

### 九、验证部署

#### 9.1 检查域名解析

```bash
# 检查主域名解析
nslookup qingzao.site

# 检查子域名解析
nslookup decoration.qingzao.site
```

#### 9.2 检查 SSL 证书

在浏览器中访问：
- https://qingzao.site
- https://decoration.qingzao.site

确认地址栏显示锁图标，表示 SSL 证书配置成功。

#### 9.3 检查功能

- ✅ 主域名访问正常
- ✅ 子域名访问正常
- ✅ 主页到产品的导航链接正常
- ✅ 产品页返回主页的链接正常
- ✅ SSL 证书有效
- ✅ 页面加载速度正常

---

### 十、常见问题与解决方案

#### 10.1 DNS 解析不生效

**问题：** 域名解析后无法访问

**解决方案：**
1. 等待 DNS 传播（最多 48 小时，通常几分钟到几小时）
2. 使用 `nslookup` 或 `dig` 命令检查解析
3. 清除本地 DNS 缓存：`ipconfig /flushdns`（Windows）

#### 10.2 SSL 证书配置失败

**问题：** Certbot 无法获取证书

**解决方案：**
1. 确保 Nginx 正在运行
2. 确保 80 端口可访问
3. 检查防火墙设置
4. 确保 DNS 解析已生效

#### 10.3 页面 404 错误

**问题：** 刷新页面后显示 404

**解决方案：**
确保 Nginx 配置中有：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

#### 10.4 跨域问题

**问题：** API 请求跨域错误

**解决方案：**
在 Nginx 配置中添加：
```nginx
location /api/ {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

---

### 十一、性能优化建议

#### 11.1 启用 HTTP/2

在 Nginx 配置中：
```nginx
listen 443 ssl http2;
```

#### 11.2 启用 Gzip 压缩

已在配置中启用，确保压缩以下类型：
- text/html
- text/css
- application/javascript
- application/json
- image/svg+xml

#### 11.3 配置浏览器缓存

已在配置中启用静态资源缓存：
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

#### 11.4 使用 CDN（可选）

可以考虑使用 Cloudflare CDN：
1. 在 Cloudflare 添加你的域名
2. 更新域名 DNS 服务器为 Cloudflare 提供的服务器
3. 启用 CDN 加速

---

### 十二、监控与维护

#### 12.1 设置监控

**推荐工具：**
- Uptime Robot（免费，监控网站可用性）
- Google Analytics（网站流量分析）
- Sentry（错误监控）

#### 12.2 定期备份

**备份内容：**
- 代码仓库
- 数据库（如果有）
- 配置文件

#### 12.3 更新维护

**定期更新：**
- 依赖包版本
- SSL 证书（Certbot 自动续期）
- 服务器系统补丁

---

## 🎉 总结

我已经为你提供了完整的域名配置和部署方案，包括：

1. ✅ **个人主页项目模板** - 完整的 React + Vite 项目
2. ✅ **装修导图项目修改** - 添加返回主页链接
3. ✅ **DNS 解析配置** - 详细的 DNS 记录设置
4. ✅ **Vercel 部署方案** - 推荐的部署方式
5. ✅ **自有服务器部署方案** - Nginx + SSL 配置
6. ✅ **常见问题解决方案** - 问题排查指南
7. ✅ **性能优化建议** - 提升网站性能
8. ✅ **监控与维护** - 长期运维建议

**推荐部署流程：**
1. 先按照上面的代码创建个人主页项目
2. 接受装修导图项目的修改（添加返回主页链接）
3. 选择 Vercel 部署（更简单）
4. 配置 DNS 解析
5. 验证部署结果