# 部署指南 - Etytech Studio 网站

本文档说明如何部署此单页应用（SPA）网站，以实现干净的URL结构。

## 🎯 URL 结构

部署后，网站将具有以下URL结构：
- 主页：`etytech.com/`
- 产品页：`etytech.com/product`
- 服务页：`etytech.com/service`
- 关于页：`etytech.com/about`

## 📋 重要说明

由于这是一个单页应用（SPA），所有路由都需要指向 `index.html`。这需要服务器配置支持。

---

## 🚀 部署方案

### 方案 1: Netlify（推荐 - 最简单）

Netlify 会自动识别 `_redirects` 或 `netlify.toml` 文件。

#### 步骤：
1. 将项目推送到 GitHub
2. 登录 [Netlify](https://netlify.com)
3. 点击 "New site from Git"
4. 选择你的 GitHub 仓库
5. 点击 "Deploy site"

✅ **无需额外配置**！`_redirects` 和 `netlify.toml` 文件已包含在项目中。

#### 自定义域名：
- 在 Netlify Dashboard → Domain settings → Add custom domain
- 添加 `etytech.com`
- 按照提示配置 DNS

---

### 方案 2: Vercel

Vercel 会自动识别 `vercel.json` 配置文件。

#### 步骤：
1. 安装 Vercel CLI：`npm i -g vercel`
2. 在项目目录运行：`vercel`
3. 按照提示完成部署

或者使用网页界面：
1. 登录 [Vercel](https://vercel.com)
2. Import Git Repository
3. 选择你的仓库并部署

✅ **无需额外配置**！`vercel.json` 文件已包含在项目中。

---

### 方案 3: GitHub Pages

GitHub Pages 默认不支持 SPA 路由，需要一些技巧。

#### 步骤：
1. 在 GitHub 仓库设置中启用 GitHub Pages
2. 选择分支（通常是 `main` 或 `gh-pages`）
3. 确保仓库包含 `index.html` 在根目录

⚠️ **注意**：GitHub Pages 的 SPA 路由支持有限。刷新页面会导致 404 错误。

**解决方案**：
- 使用 hash 路由（`#/product` 而不是 `/product`）
- 或使用 Netlify/Vercel 等更适合 SPA 的平台

---

### 方案 4: Apache 服务器

如果使用 Apache 服务器，`.htaccess` 文件已包含在项目中。

#### 步骤：
1. 确保 Apache 启用了 `mod_rewrite` 模块
2. 上传所有文件到服务器
3. 确保 `.htaccess` 文件在根目录

#### 启用 mod_rewrite（如果未启用）：
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

#### Apache 配置检查：
确保你的虚拟主机配置允许 `.htaccess` 覆盖：
```apache
<Directory /var/www/html>
    AllowOverride All
</Directory>
```

---

### 方案 5: Nginx 服务器

使用提供的 `nginx.conf.example` 作为参考。

#### 步骤：
1. 编辑 Nginx 配置文件（通常在 `/etc/nginx/sites-available/`）
2. 添加 `nginx.conf.example` 中的配置
3. 测试配置：`sudo nginx -t`
4. 重启 Nginx：`sudo systemctl restart nginx`

---

## 🧪 本地测试

### 方法 1: 使用 Python 简单服务器
```bash
# Python 3
python -m http.server 8000
```
然后访问 `http://localhost:8000`

⚠️ **注意**：简单的 HTTP 服务器不支持 SPA 路由，刷新子页面会404。

### 方法 2: 使用 live-server（推荐）
```bash
# 安装
npm install -g live-server

# 运行（支持 SPA）
live-server --entry-file=index.html
```

### 方法 3: 使用 VS Code Live Server
1. 安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

---

## 🔧 域名配置

### 配置 DNS 记录

#### 对于 Netlify/Vercel：
添加以下 DNS 记录：

**A Record**（如果使用 A 记录）：
```
Type: A
Name: @
Value: [服务商提供的IP地址]
```

**CNAME Record**（推荐）：
```
Type: CNAME
Name: www
Value: [your-site].netlify.app 或 [your-site].vercel.app
```

**根域名重定向**：
```
Type: A
Name: @
Value: [服务商提供的IP]
```

---

## ✅ 部署检查清单

部署后，测试以下内容：

- [ ] 访问 `etytech.com/` 显示主页
- [ ] 访问 `etytech.com/product` 显示产品页
- [ ] 访问 `etytech.com/service` 显示服务页
- [ ] 访问 `etytech.com/about` 显示关于页
- [ ] 在子页面刷新浏览器，页面正常显示（不是404）
- [ ] 浏览器前进/后退按钮正常工作
- [ ] 导航链接点击流畅无刷新
- [ ] 移动端显示正常
- [ ] 所有图片和资源正常加载

---

## 🐛 常见问题

### Q: 刷新页面出现 404 错误
**A**: 这说明服务器配置不正确。确保：
- Apache 用户：`.htaccess` 文件存在且 `mod_rewrite` 已启用
- Nginx 用户：配置了 `try_files` 指令
- Netlify/Vercel 用户：检查配置文件是否正确

### Q: CSS/JS 文件无法加载
**A**: 检查：
- 文件路径是否正确（使用相对路径）
- 服务器是否正确设置了 MIME 类型
- 浏览器控制台是否有错误信息

### Q: 主页显示 index.html 在URL中
**A**: 这通常是本地测试或服务器配置问题：
- 本地测试：使用 live-server 而不是简单的 HTTP 服务器
- 服务器：确保配置了目录索引为 `index.html`

### Q: 移动端导航不工作
**A**: 检查：
- JavaScript 是否正确加载
- 控制台是否有错误
- 触摸事件是否被正确处理

---

## 📞 支持

如有部署问题，请检查：
1. 浏览器控制台的错误信息
2. 服务器日志
3. 网络请求是否成功（F12 → Network 标签）

---

## 🎉 推荐部署平台

按推荐顺序：
1. **Netlify** - 最简单，自动配置，免费 SSL
2. **Vercel** - 性能优秀，部署快速
3. **Cloudflare Pages** - CDN 性能好
4. **自己的服务器** - 完全控制，需要配置

---

祝部署顺利！🚀


