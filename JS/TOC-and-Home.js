(function() {
    console.log("Notion 导航系统：高质感中心偏上滚动版启动...");

    const style = document.createElement('style');
    style.innerHTML = `
        #custom-side-nav {
            position: fixed !important;
            top: 80px !important;
            right: 30px !important;
            width: 180px !important;
            max-height: 80vh !important;
            background: #ffffff !important;
            border: 1px solid rgba(0,0,0,0.06) !important;
            border-radius: 12px !important;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08) !important;
            padding: 12px !important;
            z-index: 99999 !important;
            overflow-y: auto !important;
            font-family: "PingFang SC", "Microsoft YaHei", sans-serif !important;
        }

        #nav-home-link {
            display: block !important;
            text-align: center !important;
            padding: 8px !important;
            margin-bottom: 12px !important;
            background: rgba(46, 170, 220, 0.08) !important;
            color: #2eaadc !important;
            text-decoration: none !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            border-radius: 6px !important;
            transition: all 0.2s ease !important;
        }

        #custom-side-nav .toc-title {
            text-align: center !important;
            margin: 0 0 10px 0 !important;
            font-size: 14px !important;
            color: #333 !important;
            font-weight: bold !important;
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 8px;
        }

        #custom-side-nav ul {
            list-style: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        #custom-side-nav li {
            list-style: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        #custom-side-nav a.toc-link {
            color: #37352f !important;
            text-decoration: none !important;
            font-size: 13px !important;
            display: block !important;
            padding: 5px 8px !important;
            border-radius: 4px !important;
            transition: all 0.2s ease !important;
            opacity: 0.8;
            line-height: 1.4 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
        }

        #custom-side-nav a.toc-link:hover { 
            background: #f5f5f5 !important; 
            opacity: 1; 
            color: #2eaadc !important;
        }

        #custom-side-nav li.toc-h1 { margin-left: 0px !important; font-weight: 600 !important; }
        #custom-side-nav li.toc-h2 { margin-left: 14px !important; }
        #custom-side-nav li.toc-h3 { margin-left: 28px !important; font-size: 12px !important; }

        #custom-side-nav::-webkit-scrollbar { width: 0px; }
        @media (max-width: 1200px) { #custom-side-nav { display: none !important; } }
    `;
    document.head.appendChild(style);

    function buildNavigation() {
        if (document.getElementById('custom-side-nav')) return;

        const rawHeadings = Array.from(document.querySelectorAll("h1, h2, h3"));
        const headings = rawHeadings.filter(h => {
            const txt = h.innerText.trim();
            return txt !== "" && !h.classList.contains('page-title');
        });

        if (headings.length === 0) return false;

        const nav = document.createElement('div');
        nav.id = 'custom-side-nav';

        const homeLink = document.createElement('a');
        homeLink.id = 'nav-home-link';
        homeLink.href = 'https://www.btc2054.com';
        homeLink.innerText = '返回首页';
        nav.appendChild(homeLink);

        const list = document.createElement('ul');
        headings.forEach((h, i) => {
            if (!h.id) h.id = 'notion-toc-id-' + i;
            
            const li = document.createElement('li');
            li.className = `toc-${h.tagName.toLowerCase()}`;
            
            const a = document.createElement('a');
            a.className = 'toc-link';
            a.href = `#${h.id}`;
            a.innerText = h.innerText.trim();
            
            // --- 核心修改：平滑滚动到屏幕上方 30% 处 ---
            a.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById(h.id);
                if (target) {
                    const rect = target.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    // 计算目标位置：元素距离页面顶部的距离 - 屏幕高度的 30%
                    const offset = rect.top + scrollTop - (window.innerHeight * 0.3);
                    
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                    
                    history.pushState(null, null, `#${h.id}`);
                }
            });
            
            li.appendChild(a);
            list.appendChild(li);
        });
        nav.appendChild(list);
        document.body.appendChild(nav);
        return true;
    }

    let attempts = 0;
    const checkExist = setInterval(() => {
        const success = buildNavigation();
        attempts++;
        if (success || attempts > 15) clearInterval(checkExist);
    }, 500);

})();