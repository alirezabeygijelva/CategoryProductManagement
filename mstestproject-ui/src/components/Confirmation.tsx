import React from 'react';
import './Confirmation.css'

interface ConfirmationProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmation-container">
            <p className="confirmation-message">{message}</p>
            <div className="confirmation-actions">
                <button className="btn-confirm" onClick={onConfirm}>
                    OK
                </button>
                <button className="btn-cancel" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Confirmation;
