function NotesList({ notes, onSelect, selectedId }) {
    return (
        <div>
            <h3>Notes</h3>
            {notes.length === 0 && <p style={{ color: '#999', fontSize: '14px' }}>No notes yet.</p>}
            {notes.map((note) => (
                <div
                    key={note.id}
                    onClick={() => onSelect(note)}
                    style={{
                        cursor: 'pointer',
                        padding: '8px',
                        borderBottom: '1px solid #ccc',
                        backgroundColor: note.id === selectedId ? '#dce9ff' : 'transparent',
                        fontWeight: note.id === selectedId ? 'bold' : 'normal',
                    }}
                >
                    {note.title}
                </div>
            ))}
        </div>
    );
}

export default NotesList;
