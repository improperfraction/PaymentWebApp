import express from 'express';
import mainRouter from './routes/index.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000;
const app = express();

// Resolve __dirname in ES modules
//const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

// API routes
app.use('/api/v1', mainRouter);

// Serve static files
app.use(express.static(path.join(__dirname, '/Frontend/dist')));

// Wildcard route for SPA (Single Page Application)
app.get('/*splat', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Frontend', 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});