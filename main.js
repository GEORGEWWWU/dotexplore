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

const charTL = gsap.timeline({ repeat: -1, yoyo: true });
charTL.to("#char-main", {
    y: -15,
    duration: 3,
    ease: "sine.inOut"
})
    .to("#char-shadow", {
        y: -10,      // 阴影上下移动幅度略小于主体
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