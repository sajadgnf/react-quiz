import React from 'react';

type Props = {
    score: number;
    questions: [];
    reset: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Modal: React.FC<Props> = ({ score, questions, reset }) => {

    return (
        <div className='modalContainer'>
            <div className='modalContent'>
                <h2>Congrats!</h2>
                <p>You answerd {((score / questions.length) * 100).toFixed(0)}% of questions correctly</p>
                <button onClick={reset}>Play Again</button>
            </div>
        </div>
    );
};

export default Modal;