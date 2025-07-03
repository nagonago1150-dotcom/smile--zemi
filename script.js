let currentQuestion = 1;
const answers = {};
const redirectUrl = 'https://link-u-cosme.com/lp?u=t67010_002_cie_ad_fb_002&sid=DfQ1TZ_HgDFZ_i3q&ct_bM3ce882r12M5da5=4576.288.365.DfQ1TZ_HgDFZ_i3q.365.DfQ1TZ_HgDFZ_i3q.DfQ1TZ_HgDFZ_i3q';

function selectAnswer(questionNumber, answer) {
    answers[`question${questionNumber}`] = answer;
    
    const button = event.target.closest('.option-button');
    const allButtons = button.parentElement.querySelectorAll('.option-button');
    
    // 他のボタンをフェードアウト
    allButtons.forEach(btn => {
        if (btn !== button) {
            btn.style.opacity = '0.5';
            btn.style.transform = 'scale(0.95)';
            btn.style.pointerEvents = 'none';
        }
    });
    
    // 選択されたボタンにエフェクト
    button.classList.add('selected');
    button.style.background = 'var(--accent-gradient)';
    button.style.color = '#fff';
    button.style.transform = 'scale(1.05)';
    
    // リップルエフェクトを追加
    createRipple(button, event);
    
    setTimeout(() => {
        if (questionNumber < 3) {
            showNextQuestion();
        } else {
            showLoading();
        }
    }, 600);
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
    currentSection.classList.add('fade-out');
    
    setTimeout(() => {
        currentSection.classList.remove('active', 'fade-out');
        currentQuestion++;
        const nextSection = document.getElementById(`section${currentQuestion}`);
        
        // プログレスバーのアニメーション
        const progressFill = nextSection.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '0%';
            setTimeout(() => {
                progressFill.style.width = currentQuestion === 2 ? '66.67%' : '100%';
            }, 100);
        }
        
        nextSection.classList.add('active');
        
        // ボタンのスタガーアニメーション
        const buttons = nextSection.querySelectorAll('.option-button');
        buttons.forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
    }, 500);
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
            setTimeout(() => {
                el.style.opacity = '1';
            }, 200 + index * 300);
        });
        
        // リダイレクト
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 3500);
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    // 初期アニメーション
    const firstSection = document.querySelector('.section.active');
    const elements = firstSection.querySelectorAll('.main-visual, .main-copy, .question-area');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 100 + index * 200);
    });
    
    // ボタンのマイクロインタラクション
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
        
        // タッチデバイス対応
        button.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px) scale(1.01)';
        });
        
        button.addEventListener('touchend', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // パーティクルエフェクト（背景）
    createParticles();
});

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (20 + Math.random() * 20) + 's';
        particlesContainer.appendChild(particle);
    }
}

// CSSスタイルを動的に追加
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        animation: fadeOut 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    .selected {
        animation: selectedPulse 0.6s ease-out;
    }
    
    @keyframes selectedPulse {
        0% {
            box-shadow: 0 0 0 0 rgba(245, 179, 192, 0.7);
        }
        70% {
            box-shadow: 0 0 0 20px rgba(245, 179, 192, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(245, 179, 192, 0);
        }
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleSpread 1s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleSpread {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }
    
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--accent-color);
        border-radius: 50%;
        opacity: 0.3;
        animation: float linear infinite;
    }
    
    @keyframes float {
        from {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);