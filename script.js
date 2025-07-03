let currentQuestion = 1;
const answers = {};
const redirectUrl = 'https://link-u-cosme.com/lp?u=t67010_002_cie_ad_fb_002&sid=DfQ1TZ_HgDFZ_i3q&ct_bM3ce882r12M5da5=4576.288.365.DfQ1TZ_HgDFZ_i3q.365.DfQ1TZ_HgDFZ_i3q.DfQ1TZ_HgDFZ_i3q';

function selectAnswer(questionNumber, answer) {
    answers[`question${questionNumber}`] = answer;
    
    const button = event.target.closest('.option-button');
    button.style.backgroundColor = 'var(--accent-color)';
    button.style.borderColor = 'var(--accent-dark)';
    
    setTimeout(() => {
        if (questionNumber < 3) {
            showNextQuestion();
        } else {
            showLoading();
        }
    }, 300);
}

function showNextQuestion() {
    const currentSection = document.querySelector('.section.active');
    currentSection.classList.add('fade-out');
    
    setTimeout(() => {
        currentSection.classList.remove('active', 'fade-out');
        currentQuestion++;
        const nextSection = document.getElementById(`section${currentQuestion}`);
        nextSection.classList.add('active');
    }, 300);
}

function showLoading() {
    const currentSection = document.querySelector('.section.active');
    currentSection.classList.add('fade-out');
    
    setTimeout(() => {
        currentSection.classList.remove('active', 'fade-out');
        const loadingSection = document.getElementById('loading-section');
        loadingSection.classList.add('active');
        
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 3000);
    }, 300);
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

const style = document.createElement('style');
style.textContent = `
    .fade-out {
        animation: fadeOut 0.3s ease-in-out;
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);