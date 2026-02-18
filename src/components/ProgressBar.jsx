import React from 'react';

const ProgressBar = ({ progress }) => {
    return (
        <div className="progress-bar">
            <div
                className="progress-fill"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
        </div>
    );
};

export default ProgressBar;
