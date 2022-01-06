import React from 'react';

//type
import { AnswerObject } from "../context/QuestionCardProvider"

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
    score: number;
    number: number;
    correctAnswer: string;
}

const QuestionCard: React.FC<Props> = ({ question, answers, userAnswer, callback, questionNr, totalQuestions, score, number, correctAnswer }) => {

    return (
        <>
            <div className='title'>
                <p>Questions: {questionNr} / {totalQuestions}</p>
                <p className='score'>Correct Answers: {score} / {number + 1}</p>
            </div>
            <p className='question' dangerouslySetInnerHTML={{ __html: question }} />

            {answers.map(answer => (
                <button
                    key={answer}
                    className={`answerButton ${userAnswer && (answer === correctAnswer ? 'correct' : 'incorrect')}`}
                    disabled={!!userAnswer}
                    onClick={callback}
                    dangerouslySetInnerHTML={{ __html: answer }}
                >
                </button>
            ))
            }
        </>
    );
};

export default QuestionCard;