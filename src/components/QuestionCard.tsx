import React from 'react';

//type
import { AnswerObject } from "../context/QuestionCardProvider"

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }) => {
    return (
        <div>
            <p>Questions{questionNr} / {totalQuestions}</p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            {answers.map(answer => (
                <button key={answer} disabled={!!userAnswer} onClick={callback} >
                    <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
            ))}
        </div>
    );
};

export default QuestionCard;