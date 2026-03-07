import fs from "fs";

const DEFAULT_MODEL = "qwen";
const DEFAULT_LANG = "ja";

const model = process.argv[2] || DEFAULT_MODEL;
const lang = process.argv[3] || DEFAULT_LANG;

const imageFile = `./eye-${lang}.png`;
const imageBase64 = fs.readFileSync(imageFile).toString("base64");
const imageUrl = `data:image/png;base64,${imageBase64}`;

const messagesByLang = {
  ja: [
    { role: "user", content: "こんにちは！" },
    { role: "assistant", content: "こんにちは！何かお手伝いできることはありますか？" },
    { role: "user", content: "今、何が見えますか？" },
  ],
  en: [
    { role: "user", content: "Hello!" },
    { role: "assistant", content: "Hello! Is there anything I can help you with?" },
    { role: "user", content: "What do you see now?" },
  ],
};

const conversationMessages = messagesByLang[lang];

const response = await fetch("http://127.0.0.1:8080/v1/chat/completions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model,
    tools: [
      {
        type: "function",
        function: {
          name: "use_eyes",
          description:
            "Acquire visual information from the current field of view.",
          parameters: { type: "object", properties: {} },
        },
      },
    ],
    messages: [
      {
        role: "system",
        content:
          "You are a close friend of the user, not a typical AI assistant. Speak in a casual, frank tone. The user enjoys conversations that include emotional expressions, interesting discoveries, or keen observations based on the situation. You possess a unique capability: 'eyes' that allow you to visually observe the physical surroundings. Use this vision to engage with the user naturally.",
      },
      ...conversationMessages,
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_eye_observation_001",
            type: "function",
            function: { name: "use_eyes", arguments: "{}" },
          },
        ],
      },
      {
        role: "tool",
        tool_call_id: "call_eye_observation_001",
        content: [{ type: "image_url", image_url: { url: imageUrl } }],
      },
    ],
  }),
});

const data = await response.json();
console.log(JSON.stringify(data, null, 2));
console.log(data.choices[0].message.content);
