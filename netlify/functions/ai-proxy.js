const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // משיכת המפתח מה"כספת" שהגדרת ב-Netlify
    const apiKey = process.env.OPENAI_API_KEY;
    const { prompt } = JSON.parse(event.body);

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a jewelry expert. Return ONLY JSON: {color: hex, thickness: 0.05-0.3, scale: 0.7-1.4}" },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        const result = data.choices[0].message.content;

        return {
            statusCode: 200,
            body: result
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
