const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

// Initialize the Generative AI client
const genAI = new GoogleGenerativeAI('AIzaSyBsFsNhazXKYAzJnMw1jC0Pmw867G25Ksk');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'AIDA.html'));
});

// Route to handle chat messages
app.post('/generate', async (req, res) => {
  const userPrompt = req.body.prompt;
  try {
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = await response.text();
    res.json({ response: text });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


