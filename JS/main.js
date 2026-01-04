(function() {
    // 这里列出你所有想要运行的功能文件路径
    const modules = [
        '/JS/notion-toc.js' // 目前只有这一个功能
    ];

    modules.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true; 
        document.body.appendChild(script);
    });
    console.log("loader: 所有功能模块已加载");
})();