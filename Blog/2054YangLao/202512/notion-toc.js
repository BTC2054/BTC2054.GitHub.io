(function() {
    // 1. 打印日志方便在 F12 控制台确认脚本是否加载
    console.log("Notion-TOC 脚本已启动...");

    function createSideTOC() {
        // 如果已经存在目录，就不重复创建
        if (document.getElementById("custom-side-toc")) return;

        // 2. 这里的选择器增加了对 Notion 结构的兼容
        // 抓取所有标题，排除掉页面大标题
        const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
                              .filter(h => h.innerText.trim() !== "" && !h.classList.contains('page-title'));
        
        console.log("扫描到的标题数量:", headings.length);
        if (headings.length === 0) return;

        // 3. 创建目录容器
        const tocSideBar = document.createElement("div");
        tocSideBar.id = "custom-side-toc";
        
        // 4. 样式注入
        const style = document.createElement("style");
        style.innerHTML = `
            #custom-side-toc {
                position: fixed;
                top: 100px;
                left: calc(50% + 480px); /* 在 900px 正文右侧 */
                width: 240px;
                max-height: 80vh;
                overflow-y: auto;
                padding: 15px;
                background: white;
                border-left: 1px solid #eee;
                font-family: sans-serif;
                z-index: 9999;
                text-align: left;
            }
            .toc-item {
                display: block;
                color: #555;
                text-decoration: none;
                font-size: 14px;
                padding: 4px 0;
                line-height: 1.4;
                border-bottom: 1px solid #f9f9f9;
            }
            .toc-item:hover { color: #2eaadc; background: #fcfcfc; }
            .toc-h2 { padding-left: 15px; font-size: 13px; }
            .toc-h3 { padding-left: 30px; font-size: 12px; }
            
            @media (max-width: 1400px) {
                #custom-side-toc { display: none; }
            }
        `;
        document.head.appendChild(style);

        // 5. 组装 HTML
        let html = '<div style="font-weight:bold;margin-bottom:10px;color:#888;">目录</div>';
        headings.forEach(h => {
            // 如果标题没 ID，随机给一个
            if (!h.id) h.id = "h-" + Math.random().toString(36).substring(2, 7);
            const level = h.tagName.toLowerCase();
            html += `<a href="#${h.id}" class="toc-item toc-${level}">${h.innerText.trim()}</a>`;
        });
        
        tocSideBar.innerHTML = html;
        document.body.appendChild(tocSideBar);
        console.log("目录渲染完成！");
    }

    // 6. 执行时机：尝试多次执行，防止因加载慢导致抓不到标题
    if (document.readyState === "complete") {
        createSideTOC();
    } else {
        window.addEventListener("load", createSideTOC);
    }
    
    // 兜底方案：2秒后再运行一次（应对部分异步内容）
    setTimeout(createSideTOC, 2000);
})();