import fs from "fs";

const imagePath = process.argv[2];

if (!imagePath) {
  console.error("Usage: node image-describe.js <image-path>");
  process.exit(1);
}

const imageBase64 = fs.readFileSync(imagePath).toString("base64");
const imageUrl = `data:image/jpeg;base64,${imageBase64}`;

const response = await fetch("http://localhost:8080/v1/chat/completions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "qwen",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Describe this image in detail and factually so that an AI image generator can accurately recreate it. Please write the description as a single, continuous paragraph in clear, plain English, and strictly DO NOT use any bullet points, lists, or line breaks. Your description must include the scene (such as camera viewpoint, location, time, background, lighting, shadows, and atmosphere), the objects (including their spatial layout, appearance, texture, actions or states, relationships between objects, and any visible text), and any other information necessary to recreate the image.`,
          },
          {
            type: "image_url",
            image_url: { url: imageUrl },
          },
        ],
      },
    ],
  }),
});

const data = await response.json();
console.log(JSON.stringify(data, null, 2));
console.log(data.choices[0].message.content);
