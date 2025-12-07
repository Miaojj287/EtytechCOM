#!/bin/bash
# 修复 favicon 路径的脚本

# 使用 sed 将相对路径改为绝对路径
sed -i '' 's|href="favicon.ico"|href="/favicon.ico"|g' index.html
sed -i '' 's|href="images/favicon|href="/images/favicon|g' index.html

# 在 favicon.ico 之前添加 shortcut icon 链接
sed -i '' '/<link rel="icon" type="image\/x-icon" href="\/favicon.ico">/i\
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
' index.html

echo "✅ Favicon 路径已修复！"
