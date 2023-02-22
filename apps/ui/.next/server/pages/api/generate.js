"use strict";
(() => {
var exports = {};
exports.id = 565;
exports.ids = [565];
exports.modules = {

/***/ 7747:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ generate),
  "generatePrompt": () => (/* binding */ generatePrompt)
});

;// CONCATENATED MODULE: external "openai"
const external_openai_namespaceObject = require("openai");
;// CONCATENATED MODULE: ./pages/api/generate.js

const configuration = new external_openai_namespaceObject.Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});
const openai = new external_openai_namespaceObject.OpenAIApi(configuration);
/* harmony default export */ async function generate(req, res) {
    const bla = generatePrompt(req.body.topic, req.body.mood, req.body.type, req.body.words);
    try {
        const completion = await openai.createCompletion({
            model: 'text-davinci-002',
            prompt: generatePrompt(req.body.topic, req.body.mood, req.body.type, req.body.words),
            max_tokens: 200,
            temperature: 0.6
        });
        res.status(200).json({
            result: completion.data.choices[0].text
        });
    } catch (e) {
        res.status(400).json({
            result: 'Sorry, something went wrong while trying to talk to the AI. Refresh and try again. (1)'
        });
    }
};
function generatePrompt(topic, mood, type, words) {
    const capitalizedTopic = (topic === null || topic === void 0 ? void 0 : topic.length) ? `about ${topic[0].toUpperCase() + topic.slice(1).toLowerCase()}` : '';
    const capitalizedMood = (mood === null || mood === void 0 ? void 0 : mood.length) ? mood[0].toUpperCase() + mood.slice(1).toLowerCase() : '';
    const capitalizedType = (type === null || type === void 0 ? void 0 : type.length) ? type[0].toUpperCase() + type.slice(1).toLowerCase() : '';
    const listOfwords = (words === null || words === void 0 ? void 0 : words.length) ? words.split(',') : null;
    const listOfwordsFormatted = listOfwords === null || listOfwords === void 0 ? void 0 : listOfwords.join(', ').replace(/, ([^,]*)$/, ' and $1');
    const wordsContained = (listOfwords === null || listOfwords === void 0 ? void 0 : listOfwords.length) >= 1 ? `containing these words: ${listOfwordsFormatted}` : '';
    return `Write a ${capitalizedMood} ${capitalizedType} ${capitalizedTopic}${wordsContained}.`;
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7747));
module.exports = __webpack_exports__;

})();