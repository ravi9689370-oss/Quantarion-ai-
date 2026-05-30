// Language settings
const translations = {
    en: {
        inputLabel: 'Ask a Quantum Question',
        submitBtn: 'Process',
        examplesLabel: 'Example Questions:',
        exOptimization: 'Optimization',
        exCalculation: 'Calculation',
        exPattern: 'Pattern',
        exDecision: 'Decision',
        resultTitle: 'Quantum Computation Result',
        questionLabel: 'Your Question:',
        answerLabel: 'Answer:',
        stateLabel: 'Quantum State',
        probabilityLabel: 'Probability',
        numbersLabel: 'Numbers Used',
        accuracyLabel: 'Accuracy',
        copyText: 'Copy',
        copiedText: 'Copied!',
        exampleQuestions: {
            optimization: 'Can you optimize the portfolio with values 10, 20, 30?',
            calculation: 'What is the sum of 15 and 25 using quantum computing?',
            pattern: 'Find the pattern in the sequence 2, 4, 8, 16',
            decision: 'Which option is best between choices 5, 7, 9?'
        },
        error: 'An error occurred. Please try again.',
        loading: 'Processing...'
    },
    hi: {
        inputLabel: 'क्वांटम प्रश्न पूछें',
        submitBtn: 'प्रोसेस करें',
        examplesLabel: 'उदाहरण प्रश्न:',
        exOptimization: 'अनुकूलन',
        exCalculation: 'गणना',
        exPattern: 'पैटर्न',
        exDecision: 'निर्णय',
        resultTitle: 'क्वांटम गणना परिणाम',
        questionLabel: 'आपका प्रश्न:',
        answerLabel: 'उत्तर:',
        stateLabel: 'क्वांटम स्थिति',
        probabilityLabel: 'संभावना',
        numbersLabel: 'उपयोग किए गए नंबर',
        accuracyLabel: 'सटीकता',
        copyText: 'कॉपी',
        copiedText: 'कॉपी हुआ!',
        exampleQuestions: {
            optimization: 'क्या आप मानों 10, 20, 30 के साथ पोर्टफोलियो को अनुकूलित कर सकते हैं?',
            calculation: 'क्वांटम कंप्यूटिंग का उपयोग करके 15 और 25 का योग क्या है?',
            pattern: 'अनुक्रम 2, 4, 8, 16 में पैटर्न खोजें',
            decision: 'विकल्पों 5, 7, 9 के बीच कौन सा विकल्प सबसे अच्छा है?'
        },
        error: 'एक त्रुटि हुई। कृपया फिर से प्रयास करें।',
        loading: 'प्रोसेस हो रहा है...'
    }
};

// Global state
let currentLanguage = 'en';
let isProcessing = false;

// DOM Elements
const questionInput = document.getElementById('questionInput');
const submitBtn = document.getElementById('submitBtn');
const languageToggle = document.getElementById('languageToggle');
const resultsSection = document.getElementById('resultsSection');
const resultCard = document.getElementById('resultCard');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');
const particlesContainer = document.getElementById('particles');

// Initialize
function init() {
    setupEventListeners();
    createParticles();
    updateUILanguage();
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/static/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
}

// Event Listeners
function setupEventListeners() {
    submitBtn.addEventListener('click', handleSubmit);
    languageToggle.addEventListener('click', toggleLanguage);
    copyBtn.addEventListener('click', copyResultToClipboard);
    questionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isProcessing) {
            handleSubmit();
        }
    });

    // Example buttons
    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const questionType = e.currentTarget.dataset.question;
            const question = translations[currentLanguage].exampleQuestions[questionType];
            questionInput.value = question;
            handleSubmit();
        });
    });
}

// Submit Handler
async function handleSubmit() {
    const question = questionInput.value.trim();

    if (!question) {
        showToast('Please enter a question', 'error');
        return;
    }

    if (isProcessing) return;

    isProcessing = true;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        const response = await fetch('/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: question,
                language: currentLanguage
            })
        });

        if (!response.ok) {
            throw new Error('Failed to process question');
        }

        const data = await response.json();

        if (data.success) {
            displayResult(data);
            showToast('Result processed successfully!', 'success');
        } else {
            throw new Error(data.error || 'Unknown error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast(translations[currentLanguage].error, 'error');
    } finally {
        isProcessing = false;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Display Result
function displayResult(data) {
    document.getElementById('resultQuestion').textContent = data.question;
    document.getElementById('resultAnswer').textContent = data.answer;
    document.getElementById('resultState').textContent = data.quantum_state;
    document.getElementById('resultProbability').textContent = (data.probability * 100).toFixed(1) + '%';
    document.getElementById('resultNumbers').textContent = data.numbers_extracted.join(', ');
    document.getElementById('resultAccuracy').textContent = data.accuracy + '%';

    resultsSection.classList.add('show');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Copy to Clipboard
function copyResultToClipboard() {
    const question = document.getElementById('resultQuestion').textContent;
    const answer = document.getElementById('resultAnswer').textContent;
    const state = document.getElementById('resultState').textContent;
    const probability = document.getElementById('resultProbability').textContent;
    const accuracy = document.getElementById('resultAccuracy').textContent;

    const text = `Question: ${question}\nAnswer: ${answer}\nQuantum State: ${state}\nProbability: ${probability}\nAccuracy: ${accuracy}`;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = translations[currentLanguage].copiedText;
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
}

// Toast Notification
function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.classList.remove('error', 'success');
    if (type !== 'info') {
        toast.classList.add(type);
    }
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Language Toggle
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    updateUILanguage();
    localStorage.setItem('preferredLanguage', currentLanguage);
}

// Update UI Language
function updateUILanguage() {
    const lang = translations[currentLanguage];

    document.getElementById('inputLabel').textContent = lang.inputLabel;
    document.getElementById('submitBtnText').textContent = lang.submitBtn;
    document.getElementById('examplesLabel').textContent = lang.examplesLabel;
    document.getElementById('exOptimization').querySelector('.text').textContent = lang.exOptimization;
    document.getElementById('exCalculation').querySelector('.text').textContent = lang.exCalculation;
    document.getElementById('exPattern').querySelector('.text').textContent = lang.exPattern;
    document.getElementById('exDecision').querySelector('.text').textContent = lang.exDecision;
    document.getElementById('resultTitle').textContent = lang.resultTitle;
    document.getElementById('questionLabel').textContent = lang.questionLabel;
    document.getElementById('answerLabel').textContent = lang.answerLabel;
    document.getElementById('stateLabel').textContent = lang.stateLabel;
    document.getElementById('probabilityLabel').textContent = lang.probabilityLabel;
    document.getElementById('numbersLabel').textContent = lang.numbersLabel;
    document.getElementById('accuracyLabel').textContent = lang.accuracyLabel;
    document.getElementById('copyText').textContent = lang.copyText;

    questionInput.placeholder = currentLanguage === 'en' 
        ? 'e.g., What is 42 + 8 using quantum computing?'
        : 'उदा. क्वांटम कंप्यूटिंग का उपयोग करके 42 + 8 क्या है?';
}

// Create Floating Particles
function createParticles() {
    const particleCount = window.innerWidth < 768 ? 30 : 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 100 + 20;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const tx = (Math.random() - 0.5) * window.innerWidth;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.bottom = '-100px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        particle.style.setProperty('--tx', tx + 'px');

        particlesContainer.appendChild(particle);
    }
}

// Load preferred language
function loadPreferredLanguage() {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved) {
        currentLanguage = saved;
        updateUILanguage();
    }
}

// Window resize handler
window.addEventListener('resize', () => {
    // Handle responsive changes
});

// Install PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    loadPreferredLanguage();
    init();
});