(function() {
    const scripts = [
        '/JS/TOC-and-Home.js',
        '/JS/Fuzhi-Daima.js',
    ];

    scripts.forEach(src => {
        const s = document.createElement('script');
        s.src = src;
        s.async = true; 
        document.body.appendChild(s);
    });

})();