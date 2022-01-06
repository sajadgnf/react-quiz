import React, { useContext } from 'react';

//context
import { QuestionCardContext } from '../context/QuestionCardProvider';

//components
import QuestionCard from './QuestionCard';
import SetupForm from './SetupForm';
import Modal from './Modal';

const ShowCase = () => {

    const {
        questions,
        number,
        score,
        userAnswer,
        endGame,
        loading,
        totalQuestions,
        checkAnswer,
        nextQuestion,
        reset,
        modal,
        error
    } = useContext(QuestionCardContext)

    //check if user chosed an answer
    const userAnswerHandler = userAnswer.length && userAnswer[userAnswer.length - 1].question === questions[number].question

    return (
        <div className='container'>
            {endGame && !modal && <SetupForm />}

            {
                loading && !endGame ?
                    <p className='loading'></p> :
                    <div>
                        {
                            !endGame &&
                            <div className='questionContainer'>
                                <QuestionCard
                                    questionNr={number +1}
                                    totalQuestions={totalQuestions}
                                    question={questions[number].question}
                                    correctAnswer={questions[number].correct_answer}
                                    answers={questions[number].answers}
                                    userAnswer={userAnswerHandler ? userAnswer[userAnswer.length - 1] : undefined}
                                    callback={checkAnswer}
                                    score={score}
                                    number={number}
                                />

                                <button className='nextButton' onClick={nextQuestion}>Next Question</button>
                            </div>
                        }
                    </div>
            }

            {modal && <Modal score={score} questions={questions} reset={reset} />}
        </div>
    );
};

export default ShowCase;