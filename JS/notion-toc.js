document.addEventListener("DOMContentLoaded", function () {
    // 1. 抓取页面中所有的 h1, h2, h3 标题
    // 注意：排除掉页面最顶部的标题 .page-title
    const allHeadings = Array.from(document.querySelectorAll("h1, h2, h3"))
                             .filter(h => !h.classList.contains('page-title'));
    
    if (allHeadings.length === 0) return;

    // 2. 创建 TOC 容器（参考 Notion 的结构）
    const tocBlock = document.createElement("div");
    tocBlock.className = "notion-table_of_contents-block";
    tocBlock.style.margin = "20px 0";
    tocBlock.innerHTML = '<div style="font-weight:600; margin-bottom:8px; opacity:0.6;">目录</div>';

    // 3. 循环标题生成链接
    allHeadings.forEach((heading) => {
        // 如果标题没有 ID，动态生成一个（Notion 导出通常都有 ID）
        if (!heading.id) {
            heading.id = encodeURIComponent(heading.innerText);
        }

        const level = heading.tagName.toLowerCase(); // h1, h2, h3
        const indentLevel = level === 'h1' ? 0 : (level === 'h2' ? 1 : 2);
        
        // 创建 Notion 样式的目录项
        const item = document.createElement("div");
        item.className = `table_of_contents-item table_of_contents-indent-${indentLevel}`;
        
        const link = document.createElement("a");
        link.className = "table_of_contents-link";
        link.href = "#" + heading.id;
        link.innerText = heading.innerText;
        
        item.appendChild(link);
        tocBlock.appendChild(item);
    });

    // 4. 插入到页面合适的位置
    // 根据你的源码，插入在第一个 <hr> 分割线前面效果最好
    const firstHr = document.querySelector("hr");
    const header = document.querySelector("header");
    
    if (firstHr) {
        firstHr.parentNode.insertBefore(tocBlock, firstHr);
    } else if (header) {
        header.after(tocBlock);
    }
});