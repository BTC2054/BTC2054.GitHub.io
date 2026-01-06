/**
 * Notion 风格代码块复制插件 - 全设备常驻高质感版
 */
(function() {
    function initCopyFeature() {
        // 查找 Notion 导出的标准代码容器 (带有 .code 类名)
        const codeBlocks = document.querySelectorAll('.code');
        
        if (codeBlocks.length === 0) return;

        codeBlocks.forEach(function(block) {
            // 防止重复初始化
            if (block.parentElement.classList.contains('code-copy-wrapper')) return;

            // 1. 创建包裹容器
            const wrapper = document.createElement('div');
            wrapper.className = 'code-copy-wrapper';
            wrapper.style.position = 'relative';
            wrapper.style.width = '100%';
            
            block.parentNode.insertBefore(wrapper, block);
            wrapper.appendChild(block);

            // 2. 创建复制按钮
            const btn = document.createElement('button');
            btn.textContent = '拷贝代码';
            btn.className = 'notion-copy-btn';

            // 3. 注入高质感 Notion 样式
            const btnStyle = {
                position: 'absolute',
                top: '12px', // 稍微向下偏移
                right: '12px', // 稍微向左偏移
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: '500',
                color: 'rgba(55, 53, 47, 0.6)', // Notion 标准字体色
                backgroundColor: '#ffffff',
                border: '1px solid rgba(55, 53, 47, 0.12)', // 极细边框
                borderRadius: '5px', // 圆润圆角
                cursor: 'pointer',
                opacity: '1', // 1 代表常驻显示
                boxShadow: '0 1px 2px rgba(15, 15, 15, 0.1)', // 增加微弱阴影提升质感
                transition: 'all 0.2s ease',
                zIndex: '99',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
            };
            Object.assign(btn.style, btnStyle);

            // 4. 交互效果（虽然常驻，但点击时可以有反馈）
            btn.addEventListener('mouseenter', () => {
                btn.style.backgroundColor = '#f2f1ee'; // 悬停底色
                btn.style.color = 'rgba(55, 53, 47, 0.8)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.backgroundColor = '#ffffff';
                btn.style.color = 'rgba(55, 53, 47, 0.6)';
            });

            // 5. 核心复制逻辑
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // 自动过滤 Notion 导出时可能存在的空行，只获取代码内容
                const codeElement = block.querySelector('code');
                const rawCode = codeElement ? codeElement.innerText : block.innerText;

                navigator.clipboard.writeText(rawCode).then(() => {
                    // 点击后的视觉反馈
                    btn.textContent = '已复制!';
                    btn.style.color = '#008000'; // 成功的绿色
                    btn.style.borderColor = 'rgba(0, 128, 0, 0.3)';
                    
                    setTimeout(() => {
                        btn.textContent = '拷贝代码';
                        btn.style.color = 'rgba(55, 53, 47, 0.6)';
                        btn.style.borderColor = 'rgba(55, 53, 47, 0.12)';
                    }, 1500);
                });
            });

            wrapper.appendChild(btn);
        });
    }

    // 执行初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCopyFeature);
    } else {
        initCopyFeature();
    }
})();