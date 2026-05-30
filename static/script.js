/**
 * Quantarion AI - Frontend JavaScript
 * Handles UI interactions, API calls, and animations
 */

// ==================== STATE MANAGEMENT ====================

const state = {
    currentLanguage: localStorage.getItem('language') || 'en',
    isLoading: false,
    currentQuery: null,
    currentResult: null
};

const i18n = {
    en: {
        'ask-question': 'Ask a question',
        'process-query': 'Process Query',
        'processing': 'Processing quantum computation...',
        'quantum-results': 'Quantum Results',
        'quantum-state': 'Quantum State',
        'success-probability': 'Success Probability',
        'accuracy': 'Accuracy',
        'numbers-processed': 'Numbers Processed',
        'timestamp': 'Timestamp',
        'explanation': 'Explanation',
        'copy-results': 'Copy results',
        'share-results': 'Share Results',
        'new-query': 'New Query',
        'error-occurred': 'An error occurred',
        'copied-success': 'Results copied to clipboard!',
        'copy-failed': 'Failed to copy results',
        'query-required': 'Please enter a question',
        'optimization': 'Optimization',
        'calculation': 'Calculation',
        'pattern': 'Pattern',
        'decision': 'Decision',
        'quick-examples': 'Quick Examples:',
        'binary-notation': 'Binary notation',
        'measurement-likelihood': 'Measurement likelihood',
        'error-mitigation': 'Error mitigation applied',
        'powered-by': '🚀 Quantarion AI v1.0 | Powered by Quantum Computing + Google Gemini AI'
    },
    hi: {
        'ask-question': 'एक प्रश्न पूछें',
        'process-query': 'क्वेरी प्रोसेस करें',
        'processing': 'क्वांटम गणना प्रसंस्करण...',
        'quantum-results': 'क्वांटम परिणाम',
        'quantum-state': 'क्वांटम स्थिति',
        'success-probability': 'सफलता की संभावना',
        'accuracy': 'सटीकता',
        'numbers-processed': 'प्रसंस्कृत संख्याएं',
        'timestamp': 'टाइमस्टैम्प',
        'explanation': 'व्याख्या',
        'copy-results': 'परिणाम कॉपी करें',
        'share-results': 'परिणाम साझा करें',
        'new-query': 'नई क्वेरी',
        'error-occurred': 'एक त्रुटि हुई',
        'copied-success': 'परिणाम क्लिपबोर्ड में कॉपी किया गया!',
        'copy-failed': 'परिणाम कॉपी करने में विफल',
        'query-required': 'कृपया एक प्रश्न दर्ज करें',
        'optimization': 'अनुकूलन',
        'calculation': 'गणना',
        'pattern': 'पैटर्न',
        'decision': 'निर्णय',
        'quick-examples': 'त्वरित उदाहरण:',
        'binary-notation': 'बाइनरी संकेतन',
        'measurement-likelihood': 'माप की संभावना',
        'error-mitigation': 'त्रुटि शमन लागू',
        'powered-by': '🚀 क्वांटरियन एआई v1.0 | क्वांटम कंप्यूटिंग + गूगल जेमिनी एआई द्वारा संचालित'
    }
};

// ==================== DOM ELEMENTS ====================

const elements = {
    questionInput: document.getElementById('question'),
    solveBtn: document.getElementById('solveBtn'),
    langToggle: document.getElementById('langToggle'),
    resultsSection: document.getElementById('resultsSection'),
    loadingContainer: document.getElementById('loadingContainer'),
    resultsContent: document.getElementById('resultsContent'),
    resultsCard: document.getElementById('resultsCard'),
    copyBtn: document.getElementById('copyBtn'),
    shareBtn: document.getElementById('shareBtn'),
    newQueryBtn: document.getElementById('newQueryBtn'),
    toastContainer: document.getElementById('toastContainer'),
    exampleBtns: document.querySelectorAll('.example-btn')
};

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    attachEventListeners();
    registerServiceWorker();
});

// ==================== EVENT LISTENERS ====================

function attachEventListeners() {
    elements.solveBtn.addEventListener('click', handleSolve);
    elements.langToggle.addEventListener('click', toggleLanguage);
    elements.copyBtn.addEventListener('click', copyResults);
    elements.shareBtn.addEventListener('click', shareResults);
    elements.newQueryBtn.addEventListener('click', resetQuery);
    
    elements.exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            elements.questionInput.value = question;
            elements.questionInput.focus();
        });
    });
    
    // Enter key to submit
    elements.questionInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSolve();
        }
    });
}

// ==================== MAIN HANDLERS ====================

async function handleSolve() {
    const question = elements.questionInput.value.trim();
    
    if (!question) {
        showToast(translate('query-required'), 'warning');
        return;
    }
    
    state.currentQuery = question;
    state.isLoading = true;
    
    // Show loading state
    elements.solveBtn.disabled = true;
    elements.loadingContainer.style.display = 'flex';
    elements.resultsContent.style.display = 'none';
    elements.resultsSection.style.display = 'block';
    
    try {
        const response = await fetch('/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: question,
                language: state.currentLanguage
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            state.currentResult = data;
            displayResults(data);
            showToast('✨ Quantum computation completed!', 'success');
        } else {
            throw new Error(data.error || 'Unknown error occurred');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast(`Error: ${error.message}`, 'error');
    } finally {
        state.isLoading = false;
        elements.solveBtn.disabled = false;
    }
}

function displayResults(result) {
    // Update result elements
    document.getElementById('quantumState').textContent = result.quantum_state;
    document.getElementById('probability').textContent = result.probability;
    document.getElementById('accuracy').textContent = result.accuracy;
    document.getElementById('numbersUsed').textContent = result.numbers_used.join(', ');
    document.getElementById('explanation').textContent = result.explanation;
    document.getElementById('timestamp').textContent = new Date(result.timestamp).toLocaleString();
    
    // Hide loading, show results
    elements.loadingContainer.style.display = 'none';
    elements.resultsContent.style.display = 'block';
    
    // Scroll to results
    setTimeout(() => {
        elements.resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

function copyResults() {
    if (!state.currentResult) return;
    
    const resultText = `
Quantum Results from Quantarion AI
================================
Question: ${state.currentQuery}
Quantum State: ${state.currentResult.quantum_state}
Success Probability: ${state.currentResult.probability}
Accuracy: ${state.currentResult.accuracy}
Numbers Used: ${state.currentResult.numbers_used.join(', ')}
Explanation: ${state.currentResult.explanation}
Timestamp: ${new Date(state.currentResult.timestamp).toLocaleString()}
    `;
    
    navigator.clipboard.writeText(resultText)
        .then(() => showToast(translate('copied-success'), 'success'))
        .catch(() => showToast(translate('copy-failed'), 'error'));
}

function shareResults() {
    if (!state.currentResult) return;
    
    const shareText = `🚀 Just computed quantum results with Quantarion AI!\n\nQuestion: ${state.currentQuery}\nQuantum State: ${state.currentResult.quantum_state}\nSuccess Rate: ${state.currentResult.probability}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Quantarion AI Results',
            text: shareText
        }).catch(err => console.log('Share failed:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText)
            .then(() => showToast('Shared to clipboard!', 'success'))
            .catch(() => showToast('Share failed', 'error'));
    }
}

function resetQuery() {
    elements.questionInput.value = '';
    elements.resultsSection.style.display = 'none';
    elements.questionInput.focus();
}

// ==================== LANGUAGE & i18n ====================

function toggleLanguage() {
    state.currentLanguage = state.currentLanguage === 'en' ? 'hi' : 'en';
    localStorage.setItem('language', state.currentLanguage);
    initializeLanguage();
}

function initializeLanguage() {
    document.body.classList.remove('lang-en', 'lang-hi');
    document.body.classList.add(`lang-${state.currentLanguage}`);
}

function translate(key) {
    return i18n[state.currentLanguage][key] || i18n['en'][key] || key;
}

// ==================== TOAST NOTIFICATIONS ====================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInUp 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== SERVICE WORKER (PWA) ====================

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/static/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed:', err));
    }
}

// ==================== UTILITY FUNCTIONS ====================

function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

function getRandomColor() {
    const colors = ['#818cf8', '#a78bfa', '#c4b5fd', '#ddd6fe'];
    return colors[Math.floor(Math.random() * colors.length)];
}
