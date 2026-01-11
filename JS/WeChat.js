// 第一步：全局功能开关（核心！一键控制留言功能）
const COMMENT_ENABLE = false; // true=开启留言，false=关闭留言

// 第二步：自动加载Font Awesome图标库
function loadFontAwesome() {
  return new Promise((resolve, reject) => {
    if (document.querySelector('link[href*="font-awesome"]')) {
      resolve();
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.onload = resolve;
    link.onerror = () => reject(new Error('Font Awesome加载失败'));
    document.head.appendChild(link);
  });
}

// 第三步：配置社交平台（根据开关自动适配）
const socialPlatforms = [
  {
    name: "我的FaceBook",
    iconClass: "fa-brands fa-facebook-f",
    url: "https://www.facebook.com/你的脸书ID",
    show: false    
  },
  {
    name: "我的推特",
    iconClass: "fa-brands fa-twitter",
    url: "https://twitter.com/BTC2054",
    show: true
  },
  {
    name: "点击查看微信二维码",
    iconClass: "fa-brands fa-weixin",
    qrCodeUrl: "https:微信二维码图片链接.jpg",
    show: false
  },
  {
    name: "我的QQ",
    iconClass: "fa-brands fa-qq",
    url: "tencent://message/?uin=你的QQ号",
    show: false
  },
  {
    name: "给我发邮件",
    iconClass: "fa-solid fa-envelope",
    url: "mailto:2054@btc2054.com", // 替换为你的邮箱
    show: true
  },
  {
    name: "我的Discord",
    iconClass: "fa-brands fa-discord",
    url: "https://discord.gg/你的Discord链接",
    show: false
  },
  // 留言功能配置（根据开关自动显示/隐藏）
  {
    name: COMMENT_ENABLE ? "点击留言" : "临时关闭中",
    iconClass: COMMENT_ENABLE ? "fa-solid fa-comment" : "fa-solid fa-comment-dots",
    show: true
  }
];

// 第四步：创建微信二维码弹窗
function createWechatQrModal(qrCodeUrl) {
  if (document.getElementById('wechat-qr-modal')) {
    document.getElementById('wechat-qr-modal').style.display = 'flex';
    return;
  }
  const modal = document.createElement('div');
  modal.id = 'wechat-qr-modal';
  Object.assign(modal.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '99999',
    cursor: 'pointer'
  });
  const qrContainer = document.createElement('div');
  Object.assign(qrContainer.style, {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center'
  });
  const qrImg = document.createElement('img');
  qrImg.src = qrCodeUrl;
  Object.assign(qrImg.style, {
    width: '250px',
    height: '250px',
    border: 'none'
  });
  const tipText = document.createElement('p');
  tipText.textContent = '扫码添加我的微信';
  tipText.style.marginTop = '10px';
  tipText.style.color = '#333';
  tipText.style.fontSize = '16px';
  const closeBtn = document.createElement('span');
  closeBtn.textContent = '×';
  Object.assign(closeBtn.style, {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: '#fff',
    fontSize: '30px',
    cursor: 'pointer',
    fontWeight: 'bold'
  });
  qrContainer.appendChild(qrImg);
  qrContainer.appendChild(tipText);
  modal.appendChild(qrContainer);
  modal.appendChild(closeBtn);
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === closeBtn) {
      modal.style.display = 'none';
    }
  });
}

// 第五步：创建Utterances留言弹窗（保留完整代码）
function createUtterancesModal() {
  if (document.getElementById('utterances-modal')) {
    document.getElementById('utterances-modal').style.display = 'flex';
    return;
  }

  const modal = document.createElement('div');
  modal.id = 'utterances-modal';
  Object.assign(modal.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '99999',
    padding: '20px'
  });

  const utterancesContainer = document.createElement('div');
  utterancesContainer.id = 'utterances-container';
  Object.assign(utterancesContainer.style, {
    backgroundColor: '#fff',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '80vh',
    overflow: 'auto'
  });

  const closeBtn = document.createElement('span');
  closeBtn.textContent = '×';
  Object.assign(closeBtn.style, {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: '#fff',
    fontSize: '30px',
    cursor: 'pointer',
    fontWeight: 'bold',
    zIndex: '100000'
  });

  modal.appendChild(utterancesContainer);
  modal.appendChild(closeBtn);
  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === closeBtn) {
      modal.style.display = 'none';
    }
  });

  const script = document.createElement('script');
  script.src = 'https://utteranc.es/client.js';
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.setAttribute('repo', 'BTC2054/BTC2054.github.io');
  script.setAttribute('issue-term', 'title');
  script.setAttribute('theme', 'github-light');
  script.setAttribute('label', '博客留言');
  utterancesContainer.appendChild(script);
}

// 第六步：创建并渲染社交图标区域（自动适配开关状态）
function createSocialLinks() {
  const socialContainer = document.createElement("div");
  Object.assign(socialContainer.style, {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: "9999"
  });

  socialPlatforms.forEach(platform => {
    if (!platform.show) return;

    const iconWrapper = document.createElement("div");
    Object.assign(iconWrapper.style, {
      position: "relative",
      display: "flex",
      justifyContent: "center"
    });

    const link = document.createElement("a");
    link.rel = "noopener noreferrer";
    Object.assign(link.style, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      color: "#fff",
      fontSize: "20px",
      transition: "all 0.3s ease",
      textDecoration: "none",
      cursor: "pointer"
    });

    // 功能适配（根据开关自动切换行为）
    if (platform.iconClass.includes("weixin")) {
      link.href = "javascript:void(0)";
      link.style.backgroundColor = "#07c160";
      link.addEventListener('click', () => {
        createWechatQrModal(platform.qrCodeUrl);
      });
    } else if (platform.iconClass.includes("envelope")) {
      // 邮件功能
      link.href = platform.url;
      link.style.backgroundColor = "#ea4335";
    } else if (platform.iconClass.includes("comment") || platform.iconClass.includes("comment-dots")) {
      // 留言功能：根据开关自动切换状态
      link.href = "javascript:void(0)";
      if (COMMENT_ENABLE) {
        // 开启状态：正常颜色+打开留言弹窗
        link.style.backgroundColor = "#4299e1";
        link.addEventListener('click', () => {
          createUtterancesModal();
        });
      } else {
        // 关闭状态：灰色+提示弹窗
        link.style.backgroundColor = "#999";
        link.addEventListener('click', () => {
          alert("留言功能暂时关闭，可通过邮件  2054@btc2054.com  联系我~");
        });
      }
    } else {
      // 其他社交平台
      link.href = platform.url;
      link.target = "_blank";
      if (platform.iconClass.includes("facebook")) link.style.backgroundColor = "#1877f2";
      else if (platform.iconClass.includes("twitter")) link.style.backgroundColor = "#1da1f2";
      else if (platform.iconClass.includes("qq")) link.style.backgroundColor = "#12b7f5";
      else if (platform.iconClass.includes("discord")) link.style.backgroundColor = "#5865f2";
    }

    // 图标元素
    const icon = document.createElement("i");
    icon.className = platform.iconClass;

    // 提示文字
    const tooltip = document.createElement("span");
    tooltip.textContent = platform.name;
    Object.assign(tooltip.style, {
      position: "absolute",
      right: "50px",
      top: "50%",
      transform: "translateY(-50%)",
      padding: "4px 8px",
      backgroundColor: "#333",
      color: "#fff",
      borderRadius: "4px",
      fontSize: "12px",
      opacity: "0",
      transition: "opacity 0.3s ease",
      pointerEvents: "none",
      whiteSpace: "nowrap",
      zIndex: "10000"
    });

    // hover动画
    link.addEventListener("mouseenter", () => {
      tooltip.style.opacity = "1";
      link.style.transform = "scale(1.1)";
    });
    link.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
      link.style.transform = "scale(1)";
    });

    // 组装元素
    link.appendChild(icon);
    iconWrapper.appendChild(link);
    iconWrapper.appendChild(tooltip);
    socialContainer.appendChild(iconWrapper);
  });

  document.body.appendChild(socialContainer);
}

// 第七步：初始化
async function initSocialLinks() {
  try {
    await loadFontAwesome();
    createSocialLinks();
  } catch (error) {
    console.error("社交图标初始化失败：", error);
  }
}

// 页面加载执行
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSocialLinks);
} else {
  initSocialLinks();
}