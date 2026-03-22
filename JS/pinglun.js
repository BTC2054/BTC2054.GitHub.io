/**
 * 博客评论插件加载脚本 - Giscus (高度修复版)
 */
(function() {
    // 1. 注入 CSS 确保容器高度自适应
    const style = document.createElement('style');
    style.innerHTML = `
        .giscus, .giscus-frame { 
            width: 100%;
            max-width: 900px; 
            margin: 0 auto;
            min-height: 500px; /* 给一个较大的最小高度，防止加载时塌陷 */
        }
        .giscus {
            margin-top: 60px;
            margin-bottom: 100px;
            padding: 0 20px;
            display: block !important; /* 强制显示 */
            visibility: visible !important;
        }
        /* 移除可能限制高度的父级样式影响 */
        #giscus-container {
            overflow: visible !important;
            height: auto !important;
        }
    `;
    document.head.appendChild(style);

    // 2. 创建一个专属包裹容器
    const wrapper = document.createElement('div');
    wrapper.id = 'giscus-container';
    
    const container = document.createElement('div');
    container.className = 'giscus';
    
    wrapper.appendChild(container);
    document.body.appendChild(wrapper);

    // 3. 加载 Giscus
    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    
    const config = {
        "data-repo": "BTC2054/BTC2054.GitHub.io",
        "data-repo-id": "R_kgDOQxpyDw",
        "data-category": "Announcements",
        "data-category-id": "DIC_kwDOQxpyD84C3dty",
        "data-mapping": "pathname",
        "data-strict": "0",
        "data-reactions-enabled": "1",
        "data-emit-metadata": "0",
        "data-input-position": "bottom",
        "data-theme": "noborder_light",
        "data-lang": "zh-CN",
        "crossorigin": "anonymous"
    };

    Object.keys(config).forEach(key => {
        script.setAttribute(key, config[key]);
    });
    script.async = true;

    document.body.appendChild(script);
})();