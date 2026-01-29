/**
 * 首页公告弹窗插件
 * 使用方法:在HTML的</body>前引入: <script src="notice-popup.js"></script>
 */
(function() {
    'use strict';
    
    // ==================== 配置区 ====================
    const CONFIG = {
        // 公告标题
        title: '📢公告',
        
        // 公告内容 (支持HTML)
        content: `
            <p style="line-height: 1.8; margin-bottom: 12px;">
                公告内容
            </p>
        `,
        
        // 按钮文字
        buttonText: '× 我知道了',
        
        // LocalStorage键名 (用于记录是否已显示过)
        storageKey: 'btc2054_notice_shown',
        
        // 遮罩层背景色
        overlayBg: 'rgba(0, 0, 0, 0.5)',
        
        // 弹窗最大宽度
        maxWidth: '520px',
        
        // 动画时长(ms)
        animationDuration: 300
    };
    
    // ==================== 核心功能 ====================
    
    /**
     * 检查是否已显示过公告
     */
    function hasShownNotice() {
        try {
            return localStorage.getItem(CONFIG.storageKey) === 'true';
        } catch (e) {
            console.warn('LocalStorage不可用,公告将每次显示');
            return false;
        }
    }
    
    /**
     * 标记公告已显示
     */
    function markNoticeAsShown() {
        try {
            localStorage.setItem(CONFIG.storageKey, 'true');
        } catch (e) {
            console.warn('无法保存公告状态');
        }
    }
    
    /**
     * 创建弹窗HTML
     */
    function createNoticeHTML() {
        return `
            <div id="notice-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: ${CONFIG.overlayBg};
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity ${CONFIG.animationDuration}ms ease;
            ">
                <div id="notice-popup" style="
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    max-width: ${CONFIG.maxWidth};
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    transform: scale(0.9) translateY(20px);
                    transition: all ${CONFIG.animationDuration}ms ease;
                    opacity: 0;
                ">
                    <!-- 标题区 -->
                    <div style="
                        padding: 24px 24px 16px;
                        border-bottom: 1px solid #e5e7eb;
                    ">
                        <h3 style="
                            margin: 0;
                            font-size: 20px;
                            font-weight: bold;
                            color: #1f2937;
                            text-align: center;
                        ">${CONFIG.title}</h3>
                    </div>
                    
                    <!-- 内容区 -->
                    <div style="
                        padding: 24px;
                        color: #374151;
                        font-size: 15px;
                    ">
                        ${CONFIG.content}
                    </div>
                    
                    <!-- 按钮区 -->
                    <div style="
                        padding: 16px 24px 24px;
                        text-align: center;
                    ">
                        <button id="notice-confirm-btn" style="
                            background: #dc2626;
                            color: white;
                            border: none;
                            padding: 12px 32px;
                            border-radius: 8px;
                            font-size: 15px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.2s;
                            box-shadow: 0 2px 8px rgba(220,38,38,0.3);
                        " onmouseover="this.style.background='#b91c1c'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(220,38,38,0.4)';" 
                           onmouseout="this.style.background='#dc2626'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(220,38,38,0.3)';">
                            ${CONFIG.buttonText}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * 关闭弹窗
     */
    function closeNotice() {
        const overlay = document.getElementById('notice-overlay');
        const popup = document.getElementById('notice-popup');
        
        if (!overlay || !popup) return;
        
        // 淡出动画
        overlay.style.opacity = '0';
        popup.style.transform = 'scale(0.9) translateY(20px)';
        popup.style.opacity = '0';
        
        // 动画结束后移除元素
        setTimeout(() => {
            overlay.remove();
        }, CONFIG.animationDuration);
        
        // 标记已显示
        markNoticeAsShown();
    }
    
    /**
     * 显示弹窗
     */
    function showNotice() {
        // 插入HTML
        document.body.insertAdjacentHTML('beforeend', createNoticeHTML());
        
        const overlay = document.getElementById('notice-overlay');
        const popup = document.getElementById('notice-popup');
        const confirmBtn = document.getElementById('notice-confirm-btn');
        
        // 绑定关闭事件
        confirmBtn.addEventListener('click', closeNotice);
        
        // 点击遮罩层关闭
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeNotice();
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeNotice();
                document.removeEventListener('keydown', escHandler);
            }
        });
        
        // 触发淡入动画
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            popup.style.transform = 'scale(1) translateY(0)';
            popup.style.opacity = '1';
        });
    }
    
    /**
     * 初始化
     */
    function init() {
        // 检查是否已显示过
        if (hasShownNotice()) {
            return;
        }
        
        // 页面加载完成后延迟显示
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(showNotice, 500); // 延迟500ms显示,避免页面加载时的突兀感
            });
        } else {
            setTimeout(showNotice, 500);
        }
    }
    
    // 执行初始化
    init();
    
    // 暴露API供外部调用(可选)
    window.NoticePopup = {
        show: showNotice,
        close: closeNotice,
        reset: function() {
            try {
                localStorage.removeItem(CONFIG.storageKey);
                console.log('✅ 公告状态已重置');
            } catch (e) {
                console.warn('无法重置公告状态');
            }
        }
    };
})();