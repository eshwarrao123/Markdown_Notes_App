import ReactMarkdown from 'react-markdown';

function Preview({ content }) {
    return (
        <div>
            <h3>Preview</h3>
            <br />
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}

export default Preview;
