import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/search', async (req, res) => {
  try {
    const { query, includeDomains } = req.body;
    const response = await axios.post('https://api.tavily.com/search', {
      api_key: process.env.TAVILY_API_KEY,
      query,
      search_depth: "basic",
      include_images: false,
      include_image_descriptions: true,
      include_raw_content: false,
      max_results: 10,
      include_domains: includeDomains || [],
      exclude_domains: []
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});