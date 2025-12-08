const generateBtn = document.getElementById('generateBtn');
const topicInput = document.getElementById('topic');
const outputContent = document.getElementById('outputContent');
const resultsArea = document.getElementById('resultsArea');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');

generateBtn.addEventListener('click', async () => {
    const prompt = topicInput.value.trim();
    if (!prompt) {
        alert('Please enter a topic or instructions.');
        return;
    }

    setLoading(true);
    resultsArea.classList.add('hidden');
    outputContent.textContent = '';

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: `Generate training data/examples for the following topic. Format the output clearly. Topic: ${prompt}` })
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMsg = data.error || 'Failed to generate content';
            const details = data.details ? `\nDetails: ${data.details}` : '';
            throw new Error(errorMsg + details);
        }

        // Gemini API response structure: candidates[0].content.parts[0].text
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (generatedText) {
            outputContent.textContent = generatedText;
            resultsArea.classList.remove('hidden');
            // Smooth scroll to results
            resultsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            throw new Error('No content generated from API');
        }

    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    } finally {
        setLoading(false);
    }
});

function setLoading(isLoading) {
    generateBtn.disabled = isLoading;
    if (isLoading) {
        btnText.textContent = 'Generating...';
        btnLoader.classList.remove('hidden');
    } else {
        btnText.textContent = 'Generate Training Data';
        btnLoader.classList.add('hidden');
    }
}

copyBtn.addEventListener('click', () => {
    const text = outputContent.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const originalIcon = copyBtn.textContent;
        copyBtn.textContent = '✅';
        setTimeout(() => copyBtn.textContent = originalIcon, 2000);
    });
});

downloadBtn.addEventListener('click', () => {
    const text = outputContent.textContent;
    if (!text) {
        alert('No content to download');
        return;
    }

    // Get current time in HH-MM-SS format
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${hours}-${minutes}-${seconds}`;

    // Smart format detection based on prompt
    const prompt = topicInput.value.toLowerCase();
    let extension = 'txt';
    let mimeType = 'text/plain';

    // Detect format from prompt
    if (prompt.includes('json')) {
        extension = 'json';
        mimeType = 'application/json';
    } else if (prompt.includes('csv')) {
        extension = 'csv';
        mimeType = 'text/csv';
    } else if (prompt.includes('xml')) {
        extension = 'xml';
        mimeType = 'application/xml';
    } else if (prompt.includes('html')) {
        extension = 'html';
        mimeType = 'text/html';
    } else if (prompt.includes('python') || prompt.includes('.py')) {
        extension = 'py';
        mimeType = 'text/x-python';
    } else if (prompt.includes('javascript') || prompt.includes('.js')) {
        extension = 'js';
        mimeType = 'text/javascript';
    } else if (prompt.includes('markdown') || prompt.includes('.md')) {
        extension = 'md';
        mimeType = 'text/markdown';
    } else if (prompt.includes('yaml') || prompt.includes('yml')) {
        extension = 'yaml';
        mimeType = 'text/yaml';
    } else if (prompt.includes('sql')) {
        extension = 'sql';
        mimeType = 'application/sql';
    } else if (prompt.includes('code') || prompt.includes('function')) {
        // Try to detect code blocks in output
        if (text.includes('def ') || text.includes('import ')) {
            extension = 'py';
            mimeType = 'text/x-python';
        } else if (text.includes('function ') || text.includes('const ') || text.includes('let ')) {
            extension = 'js';
            mimeType = 'text/javascript';
        }
    }

    // Create filename with timestamp and detected extension
    const filename = `neurodata_${timestamp}.${extension}`;

    // Create blob and download
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Visual feedback with format info
    const originalIcon = downloadBtn.textContent;
    downloadBtn.textContent = `✅`;
    downloadBtn.title = `Downloaded as .${extension}`;
    setTimeout(() => {
        downloadBtn.textContent = originalIcon;
        downloadBtn.title = 'Download';
    }, 2000);
});

clearBtn.addEventListener('click', () => {
    topicInput.value = '';
    resultsArea.classList.add('hidden');
    outputContent.textContent = '';
});
