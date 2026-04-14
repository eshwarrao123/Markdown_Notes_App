const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/notes', (req, res) => {
    try {
        const notes = db.prepare('SELECT * FROM notes ORDER BY created_at DESC').all();
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/notes', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const result = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)').run(title, content);
        res.status(201).json({ id: result.lastInsertRowid, title, content });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const result = db.prepare('UPDATE notes SET title = ?, content = ? WHERE id = ?').run(title, content, id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;

    try {
        const result = db.prepare('DELETE FROM notes WHERE id = ?').run(id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
