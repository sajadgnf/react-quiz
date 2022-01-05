import React, { useContext } from 'react';

//context
import { QuestionCardContext } from '../context/QuestionCardProvider';

//components
import QuestionCard from './QuestionCard';

const ShowCase = () => {

    const {
        questions,
        number,
        score,
        userAnswer,
        endGame,
        loading,
        TOTAL_QUESTIONS,
        startQuiz,
        checkAnswer,
        nextQuestion
    } = useContext(QuestionCardContext)

    return (
        <div>
            <h1>REACT QUIZ</h1>
            {endGame || userAnswer.length === TOTAL_QUESTIONS ? < button onClick={startQuiz}>start</button> : null}
            {
                loading && !endGame ?
                    <p> Loading Questions...</p> :
                    <div>
                        {
                            !endGame &&

                            <div>
                                <p>Score:{score}</p>
                                <QuestionCard
                                    questionNr={number + 1}
                                    totalQuestions={TOTAL_QUESTIONS}
                                    question={questions[number].question}
                                    answers={questions[number].answers}
                                    userAnswer={userAnswer.length > number ? userAnswer : undefined}
                                    callback={checkAnswer}
                                />

                                {
                                    !endGame &&
                                    userAnswer.length > number &&
                                    number + 1 !== TOTAL_QUESTIONS &&
                                    <button onClick={nextQuestion}>Next Question</button>
                                }
                            </div>
                        }
                    </div>
            }
        </div >

    );
};

export default ShowCase;