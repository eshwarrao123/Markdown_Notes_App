import { useState, useEffect } from 'react';
import axios from 'axios';
import NotesList from './components/NotesList';
import Editor from './components/Editor';
import Preview from './components/Preview';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/notes')
      .then((res) => setNotes(res.data))
      .catch((err) => console.error('Error fetching notes:', err));
  }, []);

  // debounced auto-save — waits 800ms after user stops typing
  useEffect(() => {
    if (!selectedNote || !title || !content) return;

    const timer = setTimeout(() => {
      axios.put(`http://localhost:5000/notes/${selectedNote.id}`, { title, content })
        .then(() => {
          setNotes((prev) =>
            prev.map((n) => n.id === selectedNote.id ? { ...n, title, content } : n)
          );
          console.log('Auto-saved ✓');
        })
        .catch((err) => console.error('Auto-save failed:', err));
    }, 800);

    return () => clearTimeout(timer);
  }, [title, content, selectedNote]);

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleSave = () => {
    if (!title || !content) return;

    if (selectedNote) {
      axios.put(`http://localhost:5000/notes/${selectedNote.id}`, { title, content })
        .then(() => {
          setNotes(notes.map((n) =>
            n.id === selectedNote.id ? { ...n, title, content } : n
          ));
        })
        .catch((err) => console.error('Error updating note:', err));
    } else {
      axios.post('http://localhost:5000/notes', { title, content })
        .then((res) => {
          setNotes([res.data, ...notes]);
          setSelectedNote(res.data);
        })
        .catch((err) => console.error('Error creating note:', err));
    }
  };

  const handleNew = () => {
    setSelectedNote(null);
    setTitle('');
    setContent('');
  };

  const handleDelete = () => {
    if (!selectedNote) return;

    axios.delete(`http://localhost:5000/notes/${selectedNote.id}`)
      .then(() => {
        setNotes(notes.filter((n) => n.id !== selectedNote.id));
        handleNew();
      })
      .catch((err) => console.error('Error deleting note:', err));
  };

  return (
    <div className="app-container">

      <div className="sidebar">
        <button onClick={handleNew} style={{ width: '100%', marginBottom: '8px', padding: '8px' }}>
          + New Note
        </button>
        <NotesList notes={notes} onSelect={handleSelectNote} selectedId={selectedNote?.id} />
      </div>

      <div className="editor-pane">
        <Editor
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSave={handleSave}
          onDelete={handleDelete}
          isEditing={!!selectedNote}
        />
      </div>

      <div className="preview-pane">
        <Preview content={content} />
      </div>

    </div>
  );
}

export default App;
