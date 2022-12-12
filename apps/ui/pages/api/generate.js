import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: generatePrompt(req.body.topic, req.body.mood, req.body.type),
    max_tokens: 200,
    temperature: 0.6,
  });

  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(topic, mood, type) {
  console.log({ topic, mood, type });
  const capitalizedTopic = topic?.length
    ? topic[0].toUpperCase() + topic.slice(1).toLowerCase()
    : '';
  const capitalizedMood = mood?.length
    ? mood[0].toUpperCase() + mood.slice(1).toLowerCase()
    : '';
  const capitalizedType = type[0].toUpperCase() + type.slice(1).toLowerCase();
  return `Write a ${capitalizedMood} ${capitalizedType} about ${capitalizedTopic}.`;
}
