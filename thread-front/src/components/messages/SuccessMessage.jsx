import "./SuccessMessage.css";

function SuccessMessage({message}) {
    return (
        <div className="success-message-container">
            <p className="success-text">{message}</p>
        </div>
    );
}

export default SuccessMessage;