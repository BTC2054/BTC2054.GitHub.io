(function() {
    const scripts = [
      //  '/JS/GongGao.js',
    ];

    scripts.forEach(src => {
        const s = document.createElement('script');
        s.src = src;
        s.async = true; 
        document.body.appendChild(s);
    });

})();