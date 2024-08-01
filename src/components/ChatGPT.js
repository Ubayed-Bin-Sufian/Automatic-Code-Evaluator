import axios from 'axios';

const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

const ChatGPT = async (question) => {
    const prompt = `Question: ${question}\nProvide a hint:`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini-2024-07-18',
                messages: [
                    { role: 'system', content: 'You are a laconic assistant. You provide brief, to-the-point hints instead of direct answers.' }, 
                    { role: 'user', content: prompt }
                ],
                temperature: 0,
                max_tokens: 50
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const hint = response.data.choices[0].message.content;
        console.log(response)
        console.log(response.choices[0])
        console.log(json.dumps(json.loads(response.model_dump_json()), indent=4))
        return hint;

    } catch (error) {
        console.error('Error fetching hint:', error);
        return 'Failed to fetch hint. Please try again later.';
    }
};

export default ChatGPT;
