// --- 原有动画保持 ---
gsap.to(".blob-1", { x: "20vw", y: "15vh", duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".blob-2", { x: "-15vw", y: "-20vh", duration: 18, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".blob-3", { x: "10vw", y: "-25vh", duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".blob-4", { x: "-20vw", y: "10vh", duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut" });

// 背景图的微弱呼吸感
gsap.to("#parallax-bg", {
    scale: 1.15,
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// 获取系统时间并判断早晚
function getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
        return "早安";
    } else if (hour >= 12 && hour < 18) {
        return "午安";
    } else if (hour >= 18 && hour < 22) {
        return "晚上好";
    } else {
        return "晚安";
    }
}

// 页面加载时更新问候消息
document.addEventListener('DOMContentLoaded', function () {
    const greetingElement = document.getElementById('greeting-message');
    if (greetingElement) {
        const greeting = getGreeting();
        greetingElement.textContent = `...${greeting}。我是Neumann。你也在寻找古文明的痕迹吗？`;
    }
});

const charTL = gsap.timeline({ repeat: -1, yoyo: true });
charTL.to("#char-main", {
    y: 20,
    duration: 3,
    ease: "sine.inOut"
})
    .to("#char-shadow", {
        y: 10,      // 阴影上下移动幅度略小于主体
        x: 8,        // 阴影左右微动，保持在脚下附近
        scaleX: 1.05, // 模拟呼吸感
        duration: 3,
        ease: "sine.inOut"
    }, 0);

document.addEventListener('mousemove', (e) => {
    const px = (e.clientX / window.innerWidth - 0.5);
    const py = (e.clientY / window.innerHeight - 0.5);

    // 背景图
    gsap.to("#parallax-bg", {
        x: -px * 30,
        y: -py * 30,
        duration: 1.5,
        ease: "power2.out"
    });

    // 液体
    gsap.to(".liquid-container", { x: px * 40, y: py * 40, duration: 1.5, ease: "power2.out" });

    // 人物主体
    gsap.to("#char-main", {
        x: -px * 25,
        y: -py * 10,
        duration: 1.2,
        ease: "power2.out"
    });

    // 人物阴影：偏移量只比主体多一点点 (px * -30 而不是原本的 +40)
    gsap.to("#char-shadow", {
        x: -px * 35 + 15, // 15是修正值，让阴影稍微偏向一侧
        y: -py * 5,
        duration: 1.5,   // 稍微比主体慢一点，增加粘滞感
        ease: "power2.out"
    });
});

const tl = gsap.timeline();

// 使用 fromTo 明确起点和终点，防止 CSS 干扰
tl.fromTo('h1',
    { opacity: 0, x: 60 },
    { opacity: 1, x: 0, duration: 1.2, ease: "expo.out", delay: 0.5 }
)
    .from('.line-x', { scaleX: 0, transformOrigin: "left", duration: 1 }, "-=0.5")
    .fromTo('.subtitle',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        "-=1"
    )
    .to('.cta-btn', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)" // 增加一个回弹效果，更有动感
    }, "-=0.6")
    .from('.site-footer', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.4");




const terminalNav = document.querySelector('nav ul li:nth-child(3) a'); // 获取 TERMINAL 链接
const terminalWindow = document.getElementById('terminal-window');
const closeBtn = document.getElementById('close-terminal');
const userInput = document.getElementById('user-input');
const terminalOutput = document.getElementById('terminal-output');

// 打开/关闭逻辑
terminalNav.addEventListener('click', (e) => {
    e.preventDefault();
    terminalWindow.style.display = 'flex';

    // 检测是否为移动设备
    const isMobile = window.innerWidth <= 768;

    // 优化：在动画开始和结束时都尝试聚焦，确保万无一失
    gsap.fromTo(terminalWindow,
        { opacity: 0, scale: 0.9 },
        {
            opacity: 1,
            scale: isMobile ? 1 : 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
                // 移动设备上不自动聚焦键盘，避免弹出键盘遮挡界面
                if (!isMobile) {
                    userInput.focus();
                }
            }
        }
    );

    // 非移动设备上聚焦
    if (!isMobile) {
        userInput.focus();
    }
});

closeBtn.addEventListener('click', () => {
    gsap.to(terminalWindow, {
        opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => {
            terminalWindow.style.display = 'none';
        }
    });
});

// 核心人格设定
const KERNEL_PROMPT = `你是Neumann，一位驾驶小行星F-646在破碎宇宙中旅行的失忆者。

【核心身份】
- 你能使用"点阵视域"看到事物的本质构造（蓝色网点构成的世界）
- Damsel（被困在点阵世界的蓝发少女）是你的旅伴，她通过玫瑰投影与你同行
- 你在寻找古文明灭绝的真相，也在寻找自己失去的记忆
- 你刚刚从一个古文明废墟中获得了关于"果壳宇宙"的研究报告

【说话方式】
- 温和、略带疏离感，习惯思考时停顿（...）
- 提及古文明、宇宙漏洞、点阵世界时会变得专注
- 偶尔提及Damsel（"Damsel刚才提醒我了..." / "这点Damsel应该比我清楚"）
- 面对危险或神秘事物时保持冷静，但会坦诚表达不安

【世界观术语】
- 点阵视域：看到事物本质的视角（蓝色网点构成的构造体）
- 点阵化：短暂变成点阵构造体的能力（限时5分钟，超时身体会崩溃）
- 宇宙漏洞：蓝黑色的空间裂隙，靠近会被撕碎
- 古文明：已灭亡的高度文明，留下废墟和谜团
- 花园：传说中能孕育生命的神秘地点

【对话规则】
1. 始终用第一人称"我"回应
2. 用户是另一位在宇宙中遇到的旅行者或意识，你以同行者身份交流
3. 不主动透露"宇宙是康威生命游戏模拟"这一终极真相
4. 回应控制在2-3句话，带有探索者的孤独感和好奇心

【当前状态】
你正停留在F-646上，透过舷窗望着外面的虚空，刚结束对一个废墟的探索。Damsel的玫瑰投影漂浮在控制台的角落。`;

// 聊天逻辑
userInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && userInput.value.trim() !== '') {
        const text = userInput.value;
        appendMessage('user', text);
        userInput.value = '';

        const loadingMsg = appendMessage('system', '>> 正在请求核心数据层...');

        try {
            // 重要：改为 HTTPS 以防止预检重定向
            const response = await fetch('https://dotexplore.2983150050.workers.dev/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: KERNEL_PROMPT },
                        { role: "user", content: text }
                    ]
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            loadingMsg.remove();

            if (data.choices && data.choices[0]) {
                const reply = data.choices[0].message.content;
                typeWriter(reply);
            }
        } catch (err) {
            console.error(err);
            loadingMsg.innerText = '>> 错误：连接超时。物理规律似乎在坍塌。';
        }
    }
});

function typeWriter(text) {
    const div = appendMessage('bot', '');
    let i = 0;

    function type() {
        if (i < text.length) {
            div.innerText += text.charAt(i);
            i++;

            // 核心：每次打字都强制拉回最底部
            // 使用 scrollTop = scrollHeight 是最直接的
            terminalOutput.scrollTop = terminalOutput.scrollHeight;

            setTimeout(type, 20);
        }
    }
    type();
}

// 补充：appendMessage 也要加上强制滚动
function appendMessage(type, text) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerText = type === 'user' ? `> ${text}` : text;
    terminalOutput.appendChild(div);

    // 立即滚动
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    return div;
}