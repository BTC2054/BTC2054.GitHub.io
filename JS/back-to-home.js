(function() {
    function addHomeButton() {
        // 1. 创建按钮容器
        const homeBtn = document.createElement("a");
        homeBtn.href = "https://www.btc2054.com";
        homeBtn.id = "back-to-home-btn";
        homeBtn.innerHTML = "🏠 返回主页";

        // 2. 注入样式
        const style = document.createElement("style");
        style.innerHTML = `
            #back-to-home-btn {
                position: fixed;
                /* 放在 TOC 目录上方，TOC top 是 150px，我们放 100px */
                top: 100px;
                left: calc(50% + 480px);
                width: 220px;
                padding: 12px;
                background-color: #2eaadc;
                color: white !important;
                text-align: center;
                text-decoration: none !important;
                font-family: sans-serif;
                font-weight: bold;
                font-size: 14px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(46, 170, 220, 0.3);
                z-index: 10000;
                transition: transform 0.2s, background-color 0.2s;
            }
            #back-to-home-btn:hover {
                background-color: #1a8fb8;
                transform: translateY(-2px);
            }
            /* 同样在窄屏下隐藏，保持简洁 */
            @media (max-width: 1400px) {
                #back-to-home-btn { display: none; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(homeBtn);
    }

    if (document.readyState === "complete") {
        addHomeButton();
    } else {
        window.addEventListener("load", addHomeButton);
    }
})();