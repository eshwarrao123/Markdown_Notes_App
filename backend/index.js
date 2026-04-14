const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/notes', (req, res) => {
    const sql = 'SELECT * FROM notes ORDER BY created_at DESC';

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

app.post('/notes', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)';

    db.run(sql, [title, content], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            id: this.lastID,
            title,
            content
        });
    });
});

app.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const sql = 'UPDATE notes SET title = ?, content = ? WHERE id = ?';

    db.run(sql, [title, content, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note updated successfully' });
    });
});

app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM notes WHERE id = ?';

    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
