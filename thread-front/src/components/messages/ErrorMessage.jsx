import "./ErrorMessage.css";

function ErrorMessage({message}) {
    return (
        <div className="error-message-container">
            <p className="error-text">{message}</p>
        </div>
    );
}

export default ErrorMessage;