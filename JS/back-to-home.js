(function() {
    function addHomeLink() {
        // 1. 查找目录容器（确保目录加载后再执行）
        const tocContainer = document.getElementById("custom-side-toc");
        
        // 如果目录还没加载好，稍微等一下再试
        if (!tocContainer) {
            setTimeout(addHomeLink, 100);
            return;
        }

        // 2. 检查是否已经加过了
        if (document.getElementById("side-home-link")) return;

        // 3. 创建一个精致的链接项，放在目录最上方
        const homeLink = document.createElement("a");
        homeLink.id = "side-home-link";
        homeLink.href = "https://www.btc2054.com";
        homeLink.innerHTML = `
            <span style="margin-right:8px;">←</span>首页
        `;

        // 4. 注入样式：去掉大背景，改用文字链接风格
        const style = document.createElement("style");
        style.innerHTML = `
            #side-home-link {
                display: block;
                padding-bottom: 12px;
                margin-bottom: 12px;
                border-bottom: 1px solid rgba(55, 53, 47, 0.08);
                color: rgba(55, 53, 47, 0.45) !important;
                text-decoration: none !important;
                font-size: 14px;
                font-weight: 500;
                transition: color 0.2s;
            }
            #side-home-link:hover {
                color: #2eaadc !important;
            }
        `;

        document.head.appendChild(style);
        // 将首页链接插入到目录内容的最前面
        tocContainer.insertBefore(homeLink, tocContainer.firstChild);
    }

    // 启动检测
    if (document.readyState === "complete") {
        addHomeLink();
    } else {
        window.addEventListener("load", addHomeLink);
    }

})();
