const fs = require('fs');

let html = fs.readFileSync('web/public/work/gemba.html', 'utf8');

// 1. Add back button to sidebar-footer
const footerTarget = '<div class="sidebar-footer">';
const footerReplacement = `<div class="sidebar-footer">
                <a href="/work" class="btn-back-sidebar" title="Quay về trang làm việc Skechers Miền Đông">
                    <i class="fas fa-arrow-left"></i>
                    <span>Về Skechers Miền Đông</span>
                </a>`;
if (html.includes(footerTarget) && !html.includes('btn-back-sidebar')) {
  html = html.replace(footerTarget, footerReplacement);
}

// 2. Add back button to topbar-actions
const topbarTarget = '<div class="topbar-actions">';
const topbarReplacement = `<div class="topbar-actions">
                    <a href="/work" class="btn-topbar-portal" title="Quay về trang làm việc Skechers Miền Đông">
                        <i class="fas fa-arrow-left"></i>
                        <span>Về Skechers Miền Đông</span>
                    </a>`;
if (html.includes(topbarTarget) && !html.includes('btn-topbar-portal')) {
  html = html.replace(topbarTarget, topbarReplacement);
}

// 3. Remove the floating backBtn from DOMContentLoaded
const backBtnRegex = /var backBtn = document\.createElement\('a'\);[\s\S]*?document\.body\.appendChild\(backBtn\);/m;
if (backBtnRegex.test(html)) {
  html = html.replace(backBtnRegex, '// Removed floating button in favor of topbar and sidebar buttons');
}

fs.writeFileSync('web/public/work/gemba.html', html, 'utf8');
console.log('web/public/work/gemba.html updated successfully!');
