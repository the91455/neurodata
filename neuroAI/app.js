/** 
 * NeuroData Pro Logic - FINAL STABLE
 * Fully restored features: History, Schema, SQL, Regex, Batch, Multi-Export, AI Insights
 */

let generationHistory = JSON.parse(localStorage.getItem('neuroAI_history') || '[]');
let currentLanguage = localStorage.getItem('language') || (navigator.language.startsWith('tr') ? 'tr' : 'en');
let currentTheme = localStorage.getItem('theme') || 'dark';

// DOM Elements
const topicInput = document.getElementById('topic');
const generateBtn = document.getElementById('generateBtn');
const resultsArea = document.getElementById('resultsArea');
const outputContent = document.getElementById('outputContent');
const modelSelect = document.getElementById('modelSelect');
const languageSelect = document.getElementById('languageSelect');
const themeToggle = document.getElementById('themeToggle');
const validationBadge = document.getElementById('validationBadge');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');

// Translations
const translations = {
    en: {
        subtitle: "Advanced AI Training Data Ecosystem",
        prompt_label: "Training Topic / Global Prompt",
        generate_btn: "Generate Dataset",
        generating: "Generating...",
        results_title: "Generated Dataset",
        history_title: "🕒 History",
        toast_success: "Dataset generated!",
        toast_copy: "Copied to clipboard!",
        toast_error: "API Error: ",
        placeholder: "Describe the data pattern, entity, or logic..."
    },
    tr: {
        subtitle: "Gelişmiş Yapay Zeka Veri Ekosistemi",
        prompt_label: "Eğitim Konusu / Global Prompt",
        generate_btn: "Veri Seti Üret",
        generating: "Üretiliyor...",
        results_title: "Üretilen Veri Seti",
        history_title: "🕒 Geçmiş",
        toast_success: "Veri seti üretildi!",
        toast_copy: "Panoya kopyalandı!",
        toast_error: "API Hatası: ",
        placeholder: "Veri kalıbını, nesneyi veya mantığı tarif edin..."
    }
};

function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
    if (topicInput) topicInput.placeholder = t.placeholder;
    if (btnText) btnText.textContent = t.generate_btn;
}

languageSelect.value = currentLanguage;
languageSelect.addEventListener('change', (e) => updateLanguage(e.target.value));
updateLanguage(currentLanguage);

// Helper: Toast
function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Tool Toggles
const panels = {
    sqlBtn: 'sqlArea',
    regexToggle: 'regexArea',
    schemaBtn: 'schemaArea'
};
Object.keys(panels).forEach(btnId => {
    const btn = document.getElementById(btnId);
    const panel = document.getElementById(panels[btnId]);
    btn?.addEventListener('click', () => {
        btn.classList.toggle('active');
        panel?.classList.toggle('hidden');
    });
});

// Validation
function validateJSON(text) {
    if (!validationBadge) return;
    try {
        JSON.parse(text);
        validationBadge.textContent = '✅ Valid JSON';
        validationBadge.className = 'badge success';
    } catch (e) {
        validationBadge.textContent = '❌ Custom Format';
        validationBadge.className = 'badge warning';
    }
}

// Main Generation
async function generateData() {
    let prompt = topicInput.value.trim();
    if (!prompt) return showToast(currentLanguage === 'tr' ? 'Prompt giriniz' : 'Enter prompt', 'warning');

    // Context Augmentation
    if (!document.getElementById('sqlArea').classList.contains('hidden')) {
        const dialect = document.getElementById('sqlDialect').value;
        const drop = document.getElementById('sqlDrop').checked ? 'Include DROP TABLE.' : '';
        const txn = document.getElementById('sqlTxn').checked ? 'Wrap in TRANSACTION.' : '';
        prompt += `\nOutput as ${dialect} SQL. ${drop} ${txn}`;
    }
    if (!document.getElementById('regexArea').classList.contains('hidden')) {
        const regex = document.getElementById('regexInput').value;
        if (regex) prompt += `\nStrictly adhere to this regex validation: ${regex}`;
    }
    if (!document.getElementById('schemaArea').classList.contains('hidden')) {
        const schema = document.getElementById('schemaInput').value;
        if (schema) prompt += `\nFormat result based on this JSON Schema: ${schema}`;
    }

    setLoading(true);
    resultsArea.classList.remove('hidden');
    outputContent.textContent = 'Contacting Neurosphere...';

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, model: modelSelect.value })
        });

        const data = await response.json();
        if (data.error) {
            if (data.error.includes('429')) throw new Error('Quota Exceeded (429). Please wait a minute.');
            throw new Error(data.error);
        }

        const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        outputContent.textContent = resultText;
        validateJSON(resultText);

        // History
        generationHistory.unshift({ prompt, result: resultText, date: new Date().toLocaleTimeString() });
        localStorage.setItem('neuroAI_history', JSON.stringify(generationHistory.slice(0, 50)));

        showToast(translations[currentLanguage].toast_success, 'success');
        resultsArea.scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
        showToast(err.message, 'error');
        outputContent.textContent = `[ERROR] ${err.message}`;
    } finally {
        setLoading(false);
    }
}

function setLoading(loading) {
    generateBtn.disabled = loading;
    btnLoader?.classList.toggle('hidden', !loading);
    btnText.textContent = loading ? translations[currentLanguage].generating : translations[currentLanguage].generate_btn;
}

// Event Listeners
generateBtn?.addEventListener('click', generateData);

// Batch
document.getElementById('batchBtn')?.addEventListener('click', async () => {
    showToast('Starting Batch (5x)...');
    for (let i = 0; i < 5; i++) {
        await generateData();
        await new Promise(r => setTimeout(r, 1000));
    }
});

// Optimize
document.getElementById('optimizeBtn')?.addEventListener('click', async () => {
    const p = topicInput.value.trim();
    if (!p) return;
    setLoading(true);
    try {
        const res = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: `Refine and optimize this AI training prompt to be more descriptive and effective: "${p}". Return ONLY the optimized text.`, model: modelSelect.value })
        });
        const d = await res.json();
        const optimized = d.candidates?.[0]?.content?.parts?.[0]?.text;
        if (optimized) topicInput.value = optimized.trim();
        showToast('Prompt Optimized! ✨', 'success');
    } catch (e) { showToast('Optimization failed', 'error'); }
    finally { setLoading(false); }
});

// Exports
document.getElementById('copyBtn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(outputContent.textContent).then(() => showToast(translations[currentLanguage].toast_copy));
});

document.getElementById('downloadBtn')?.addEventListener('click', () => {
    const blob = new Blob([outputContent.textContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `data_${Date.now()}.json`; a.click();
});

document.getElementById('jsonlBtn')?.addEventListener('click', () => {
    try {
        const data = JSON.parse(outputContent.textContent);
        const dataArray = Array.isArray(data) ? data : [data];
        const jsonl = dataArray.map(item => JSON.stringify(item)).join('\n');
        const blob = new Blob([jsonl], { type: 'application/x-jsonlines' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'data.jsonl'; a.click();
    } catch (e) { showToast('Invalid JSON for JSONL', 'warning'); }
});

document.getElementById('xmlBtn')?.addEventListener('click', () => {
    try {
        const data = JSON.parse(outputContent.textContent);
        let xml = '<?xml version="1.0" encoding="UTF-8"?><root>';
        (Array.isArray(data) ? data : [data]).forEach(obj => {
            xml += '<item>';
            for (let k in obj) xml += `<${k}>${obj[k]}</${k}>`;
            xml += '</item>';
        });
        xml += '</root>';
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'data.xml'; a.click();
    } catch (e) { showToast('Export failed', 'warning'); }
});

// History Modal
const histModal = document.getElementById('historyModal');
document.getElementById('navHistory')?.addEventListener('click', () => {
    const list = document.getElementById('historyList');
    list.innerHTML = generationHistory.map((h, i) => `
        <div class="history-item" onclick="loadHist(${i})">
            <div><strong>${h.prompt.substring(0, 40)}...</strong></div>
            <div style="font-size:0.75rem; color:var(--text-dim)">${h.date} | ${h.result.length} chars</div>
        </div>
    `).join('') || 'No history yet.';
    histModal.classList.remove('hidden');
});

window.loadHist = (i) => {
    const h = generationHistory[i];
    topicInput.value = h.prompt;
    outputContent.textContent = h.result;
    validateJSON(h.result);
    resultsArea.classList.remove('hidden');
    histModal.classList.add('hidden');
};

// Wizard
const wizModal = document.getElementById('wizardModal');
document.getElementById('wizardBtn')?.addEventListener('click', () => wizModal.classList.remove('hidden'));

document.querySelectorAll('.w-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const format = btn.dataset.format;
        showToast(`Converting result to ${format}...`);
        // Basic mapping logic
        const data = outputContent.textContent;
        const blob = new Blob([`{"format": "${format}", "data": ${data}}`], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `ft_${format}.json`; a.click();
        wizModal.classList.add('hidden');
    });
});

// Close Modals
document.querySelectorAll('.close-modal').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
}));

// Color Picker
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
        document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        document.documentElement.style.setProperty('--accent-primary', dot.dataset.color);
    });
});

// Chips
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => topicInput.value = chip.dataset.prompt);
});

// Clear
document.getElementById('clearBtn')?.addEventListener('click', () => {
    resultsArea.classList.add('hidden');
    outputContent.textContent = '';
});

// Theme
themeToggle?.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-mode', currentTheme === 'light');
    localStorage.setItem('theme', currentTheme);
});
if (currentTheme === 'light') document.body.classList.add('light-mode');
