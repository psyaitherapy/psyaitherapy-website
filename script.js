document.getElementById('submitBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');

    if (!userInput) {
        responseDiv.textContent = 'Lütfen bir soru girin.';
        return;
    }

    responseDiv.textContent = 'Cevap bekleniyor...';

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, //
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `Psikolojik bir danışman olarak şu soruya cevap ver: ${userInput}`,
                max_tokens: 150,
            }),
        });

        const data = await response.json();
        responseDiv.innerHTML = `<strong>Yanıt:</strong><br>${data.choices[0].text.trim()}`;
    } catch (error) {
        responseDiv.textContent = 'Hata: ' + error.message;
    }
});