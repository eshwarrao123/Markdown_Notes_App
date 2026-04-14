function Editor({ title, content, onTitleChange, onContentChange, onSave, onDelete, isEditing }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            <input
                type="text"
                placeholder="Note title..."
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                style={{ marginBottom: '8px', padding: '8px', fontSize: '16px' }}
            />

            <textarea
                placeholder="Write markdown here..."
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                style={{ flex: 1, padding: '8px', fontSize: '14px', resize: 'none' }}
            />

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button onClick={onSave} style={{ flex: 1, padding: '8px' }}>
                    {isEditing ? 'Update Note' : 'Save Note'}
                </button>

                {isEditing && (
                    <button onClick={onDelete} style={{ padding: '8px', color: 'red' }}>
                        Delete
                    </button>
                )}
            </div>

        </div>
    );
}

export default Editor;
