# Etytech Studio 官方网站

Tech-Studio工作室网站，展示工作室过往作品，创始理念。

写在前面：我创业的第一个项目，采用的朴实无华的vanilla web interface架构，我后面有想过换成next.js以让自己看起来专业一点，不过转念一想，当一个old school的人也未尝不好...

## 🌟 特性

- ✨ **单页应用架构** - 无刷新页面切换，流畅体验
- 🎨 **精美动画** - 精心设计的页面过渡和交互效果
- 📱 **完全响应式** - 完美适配桌面、平板和移动设备
- 🚀 **极速加载** - 优化的资源加载和缓存策略
- 🎯 **SEO 友好** - 支持干净的 URL 结构

## 🌐 URL 结构

```
主页：   etytech.com/
产品：   etytech.com/product
服务：   etytech.com/service
关于：   etytech.com/about
```

## 📁 项目结构

```
EtytechCOM/
├── index.html              # 主HTML文件（单页应用）
├── css/
│   └── style.css          # 全局样式和动画
├── js/
│   └── script.js          # 路由、动画和交互逻辑
├── images/                # 图片资源
├── fonts/                 # 字体文件（D-DIN）
├── .htaccess             # Apache 服务器配置
├── _redirects            # Netlify 重定向配置
├── netlify.toml          # Netlify 构建配置
├── vercel.json           # Vercel 配置
├── nginx.conf.example    # Nginx 配置示例
├── DEPLOYMENT.md         # 详细部署指南
└── README.md            # 本文件
```

## 🚀 快速开始

### 本地开发

#### 方法 1: 使用 Live Server（推荐）
```bash
npm install -g live-server
live-server --entry-file=index.html
```

#### 方法 2: 使用 Python
```bash
python -m http.server 8000
```

#### 方法 3: VS Code Live Server
1. 安装 "Live Server" 扩展
2. 右键 `index.html` → "Open with Live Server"

### 部署到生产环境

查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取详细的部署指南。

#### 快速部署到 Netlify
```bash
# 1. 推送代码到 GitHub
git add .
git commit -m "Deploy to Netlify"
git push

# 2. 在 Netlify 中连接 GitHub 仓库
# 3. 点击部署！
```

#### 快速部署到 Vercel
```bash
npm i -g vercel
vercel
```

## 🛠 技术栈

- **HTML5** - 语义化标签和现代化结构
- **CSS3** - Flexbox、Grid、动画和过渡
- **JavaScript (ES6+)** - 原生 JS，无框架依赖
- **History API** - 实现 SPA 路由
- **Intersection Observer** - 滚动动画效果

## 📋 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动浏览器（iOS Safari、Chrome Mobile）

## 🎨 设计特色

### 颜色主题
- 主色：`#f4e900` (黄色) - 品牌色
- 背景：`#000000` (黑色) - 深色主题
- 文字：`#ffffff` (白色) - 高对比度

### 字体
- D-DIN Bold - 标题和重点文字
- D-DIN Regular - 正文内容

### 动画效果
- 页面切换：淡入淡出 + 滑动
- 滚动触发：元素依次显现
- 悬停效果：平滑的颜色和大小变化
- 导航：高亮当前页面

## 📝 页面说明

### 主页 (/)
- 三个全屏主营业务区块
- 展示核心业务：AI、教育、定制开发
- 响应式背景图片

### 产品页 (/product)
包含三个模块：
1. **AI 模块** - Cherry Studio、SE Agent
2. **网站开发** - SCIID、SCNU、Capstone
3. **其他小项目** - WeChat Bot、AR游戏、健身平台

### 服务页 (/service)
三个全屏服务介绍：
- 网站定制服务
- 软件定制服务
- 硬件定制服务

### 关于页 (/about)
- 创始人介绍
- 公司故事
- 创始人签名

## 🔧 自定义修改

### 修改颜色
编辑 `css/style.css`，搜索 `#f4e900` 替换为你的品牌色。

### 添加新页面
1. 在 `index.html` 中添加新的 `.page-content` 区块
2. 在 `js/script.js` 的 `validPages` 数组中添加页面名称
3. 更新导航链接

### 修改动画
在 `css/style.css` 中调整：
- `pageTransitionDuration` - 页面切换时长
- `@keyframes` - 动画关键帧
- `transition` - 过渡效果

## 🐛 问题排查

### 页面刷新后显示 404
→ 服务器配置问题，查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

### CSS/JS 未加载
→ 检查文件路径和浏览器控制台错误

### 动画卡顿
→ 减少动画元素数量或简化动画效果

### 移动端布局问题
→ 检查 CSS 的媒体查询断点

## 📄 许可证

© 2024 ETYTECH. All rights reserved.

## 👥 团队

- **Ethan Miao** - Co-Founder & CMO
- **Eric Guo** - Co-Founder & CTO

## 📞 联系方式

- 网站：[etytech.com](https://etytech.com)
- Ethan: [yijunmiao.tech](https://yijunmiao.tech)
- Eric: [ericguo1019.com](http://ericguo1019.com)

---

**Built with ❤️ by ETYTECH**

**开源万岁~**


