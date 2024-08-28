const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBsFsNhazXKYAzJnMw1jC0Pmw867G25Ksk");

const model = genAI.getGenerativeModel({ model: "gemini-pro"});

async function run() {
  const prompt = "docflow"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();

