import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const bla = generatePrompt(
    req.body.topic,
    req.body.mood,
    req.body.type,
    req.body.words
  );

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: generatePrompt(
        req.body.topic,
        req.body.mood,
        req.body.type,
        req.body.words
      ),
      max_tokens: 200,
      temperature: 0.6,
    });

    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (e) {
    res.status(400).json({
      result:
        'Sorry, something went wrong while trying to talk to the AI. Refresh and try again. (1)',
    });
  }
}

export function generatePrompt(topic, mood, type, words) {
  const capitalizedTopic = topic?.length
    ? `about ${topic[0].toUpperCase() + topic.slice(1).toLowerCase()}`
    : '';
  const capitalizedMood = mood?.length
    ? mood[0].toUpperCase() + mood.slice(1).toLowerCase()
    : '';
  const capitalizedType = type?.length
    ? type[0].toUpperCase() + type.slice(1).toLowerCase()
    : '';
  const listOfwords = words?.length ? words.split(',') : null;
  const listOfwordsFormatted = listOfwords
    ?.join(', ')
    .replace(/, ([^,]*)$/, ' and $1');
  const wordsContained =
    listOfwords?.length >= 1
      ? `containing these words: ${listOfwordsFormatted}`
      : '';
  return `Write a ${capitalizedMood} ${capitalizedType} ${capitalizedTopic}${wordsContained}.`;
}
