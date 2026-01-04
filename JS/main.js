(function() {
    const scripts = [
        '/JS/notion-toc.js',
        '/JS/back-to-home.js'  // 只需要加这一行！
    ];

    scripts.forEach(src => {
        const s = document.createElement('script');
        s.src = src;
        s.async = true; 
        document.body.appendChild(s);
    });
})();