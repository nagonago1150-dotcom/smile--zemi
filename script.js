let currentQuestion = 1;
const answers = {};
const redirectUrl = 'https://ac-ld.catsys.jp/35cdb41fDc62db0D/cl/?bId=d69VVc9e';

// カスタムカーソルの初期化
function initCursor() {
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    cursor.className = 'cursor';
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    // マウス位置を記録
    document.addEventListener('mousemove', (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });
    
    // カーソルのアニメーション
    function animateCursor() {
        // メインカーソル（遅延なし）
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // フォロワー（スムーズな追従）
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        followerX += dx * 0.15;
        followerY += dy * 0.15;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // ホバー時のカーソル変化
    const interactiveElements = '.option-button, button, a, .product-image, .product-link';
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches(interactiveElements)) {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.matches(interactiveElements)) {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        }
    });
    
    // マウスがウィンドウから出た時
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
}

function selectAnswer(questionNumber, answer) {
    answers[`question${questionNumber}`] = answer;
    
    const button = event.target.closest('.option-button');
    const allButtons = button.parentElement.querySelectorAll('.option-button');
    
    // 他のボタンをフェードアウト
    allButtons.forEach(btn => {
        if (btn !== button) {
            btn.style.opacity = '0.4';
            btn.style.transform = 'scale(0.98)';
            btn.style.pointerEvents = 'none';
            btn.style.filter = 'none';
        }
    });
    
    // 選択されたボタンにエフェクト
    button.classList.add('selected');
    button.style.background = 'var(--accent-gradient)';
    button.style.color = '#fff';
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 8px 20px rgba(245, 179, 192, 0.3)';
    
    // リップルエフェクトを追加
    createRipple(button, event);
    
    // 振動フィードバック（対応デバイスのみ）
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    setTimeout(() => {
        if (questionNumber < 3) {
            showNextQuestion();
        } else {
            showLoading();
        }
    }, 800);
}

function createRipple(button, event) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

function showNextQuestion() {
    const currentSection = document.querySelector('.section.active');
    const container = currentSection.querySelector('.container');
    
    // コンテナをフェードアウト
    container.style.transform = 'translateX(-20px)';
    container.style.opacity = '0';
    currentSection.classList.add('fade-out');
    
    setTimeout(() => {
        currentSection.classList.remove('active', 'fade-out');
        currentQuestion++;
        const nextSection = document.getElementById(`section${currentQuestion}`);
        
        // 質問番号を追加
        addQuestionNumber(nextSection, currentQuestion);
        
        // プログレスバーのアニメーション
        const progressFill = nextSection.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '0%';
            setTimeout(() => {
                progressFill.style.width = currentQuestion === 2 ? '66.67%' : '100%';
            }, 200);
        }
        
        nextSection.classList.add('active');
        
        // 新しいセクションのコンテナをフェードイン
        const newContainer = nextSection.querySelector('.container');
        newContainer.style.transform = 'translateX(20px)';
        newContainer.style.opacity = '0';
        
        setTimeout(() => {
            newContainer.style.transform = 'translateX(0)';
            newContainer.style.opacity = '1';
            newContainer.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 100);
        
        // ボタンのスタガーアニメーション
        const buttons = nextSection.querySelectorAll('.option-button');
        buttons.forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
                btn.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 200 + index * 100);
        });
        
        // カーソルイベントを再設定
        updateCursorEvents();
    }, 600);
}

function addQuestionNumber(section, number) {
    const existingNumber = section.querySelector('.question-number');
    if (!existingNumber) {
        const numberEl = document.createElement('div');
        numberEl.className = 'question-number';
        numberEl.textContent = number;
        section.appendChild(numberEl);
    }
}

function showLoading() {
    const currentSection = document.querySelector('.section.active');
    currentSection.classList.add('fade-out');
    
    setTimeout(() => {
        currentSection.classList.remove('active', 'fade-out');
        const loadingSection = document.getElementById('loading-section');
        loadingSection.classList.add('active');
        
        // ローディングテキストの段階的表示
        const elements = loadingSection.querySelectorAll('.thank-you, .leading-text, .loading-text');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 200 + index * 400);
        });
        
        // 波紋アニメーションの強化
        const ripples = loadingSection.querySelectorAll('.ripple');
        ripples.forEach((ripple, index) => {
            ripple.style.animationDelay = index * 1.5 + 's';
        });
        
        // リダイレクト
        setTimeout(() => {
            // フェードトゥホワイト
            const fadeOverlay = document.createElement('div');
            fadeOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                opacity: 0;
                z-index: 9999;
                transition: opacity 1s ease;
            `;
            document.body.appendChild(fadeOverlay);
            
            setTimeout(() => {
                fadeOverlay.style.opacity = '1';
                setTimeout(() => {
                    window.location.href = redirectUrl;
                }, 1000);
            }, 100);
        }, 3000);
    }, 600);
}

function updateCursorEvents() {
    // 新しい要素のホバーイベントは、既存のイベントリスナーで自動的に処理されるため、
    // この関数は不要になりました
}

document.addEventListener('DOMContentLoaded', function() {
    // カスタムカーソルの初期化
    if (window.matchMedia('(pointer: fine)').matches) {
        initCursor();
    } else {
        document.body.style.cursor = 'auto';
    }
    
    // 最初の質問番号を追加
    const firstSection = document.querySelector('.section.active');
    addQuestionNumber(firstSection, 1);
    
    // 初期アニメーション
    const elements = firstSection.querySelectorAll('.main-visual, .main-copy, .question-area');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.95)';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
            el.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 200 + index * 300);
    });
    
    // ボタンのマイクロインタラクション
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(button => {
        // マウスの動きに反応する微細な動き
        button.addEventListener('mousemove', function(e) {
            if (!this.classList.contains('selected')) {
                const rect = this.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
                this.style.transform = `translateY(-3px) translateX(${x}px)`;
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) translateX(0)';
            }
        });
    });
    
    // パララックスエフェクト
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        document.querySelectorAll('.particle').forEach((particle, index) => {
            const speed = (index + 1) * 0.5;
            particle.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
    
    // パーティクルエフェクト（背景）
    createParticles();
});

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 30 + 's';
        particle.style.animationDuration = (30 + Math.random() * 30) + 's';
        particle.style.width = particle.style.height = (2 + Math.random() * 4) + 'px';
        particlesContainer.appendChild(particle);
    }
}

// CSSスタイルを動的に追加
const style = document.createElement('style');
style.textContent = `
    .selected {
        animation: selectedPulse 0.8s ease-out;
    }
    
    @keyframes selectedPulse {
        0% {
            box-shadow: 0 0 0 0 rgba(245, 179, 192, 0.8);
        }
        70% {
            box-shadow: 0 0 0 30px rgba(245, 179, 192, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(245, 179, 192, 0);
        }
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
        transform: scale(0);
        animation: rippleSpread 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        pointer-events: none;
    }
    
    @keyframes rippleSpread {
        to {
            transform: scale(5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);