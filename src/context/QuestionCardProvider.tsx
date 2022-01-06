import React, { createContext, useEffect, useState } from 'react';

//api
import { getData } from '../services/api';

//types
import { Question, Difficulty, Category } from "../services/api"

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

export const QuestionCardContext = createContext<any>([])

const QuestionCardProvider = ({ children }: any) => {

    const [loading, setLoading] = useState(true)
    const [endGame, setEndGame] = useState(true)
    const [modal, setModal] = useState(false)
    const [number, setNumber] = useState(0)
    const [score, setScore] = useState(0)
    const [questions, setQuestions] = useState<Question[]>([])
    const [error, setError] = useState(false)
    const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
    const [totalQuestions, setTotalQuestions] = useState(10)
    const [category, setCategory] = useState<Category>(Category.SCIENCE_NATURE)
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY)

    //starting the game
    const startQuiz = async () => {
        setNumber(0)
        setScore(0)
        setUserAnswer([])
        setEndGame(false)

        try {
            setQuestions(await getData(totalQuestions, difficulty, category))
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    //check the userAnswer
    const checkAnswer = (e: any) => {
        if (!endGame) {
            const answer = e.target.innerText
            const correct = questions[number].correct_answer === answer
            if (correct) setScore((prev) => prev + 1)

            const AnswerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer
            }
            setUserAnswer((prev) => [...prev, AnswerObject])
        }
    }

    const reset = () => {
        setEndGame(true)
        setNumber(0)
        setScore(0)
        setUserAnswer([])
        setModal(false)
    }

    //enf of the game
    const nextQuestion = () => {
        let nextQ = number + 1

        if (nextQ === totalQuestions) {
            setModal(true)
        } else {
            setNumber(nextQ)
        }
    }

    return (
        <QuestionCardContext.Provider value={{
            questions,
            number,
            score, userAnswer,
            endGame,
            totalQuestions,
            loading,
            category,
            difficulty,
            modal,
            error,
            startQuiz,
            checkAnswer,
            nextQuestion,
            setTotalQuestions,
            setCategory,
            setDifficulty,
            reset
        }}>
            {children}
        </ QuestionCardContext.Provider>
    )

};



export default QuestionCardProvider