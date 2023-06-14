const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

async function getChatResponse(prompt) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 50  // Adjust as per your requirement
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}
