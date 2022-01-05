import React, { createContext, useEffect, useState } from 'react';

//api
import { getData } from '../services/api';

//types
import { Difficulty, Question } from "../services/api"

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
    const [number, setNumber] = useState(0)
    const [score, setScore] = useState(0)
    const [questions, setQuestions] = useState<Question[]>([])
    const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
    const TOTAL_QUESTIONS = 10

    //starting the game
    const startQuiz = async () => {
        setEndGame(false)
        setLoading(true)
        setNumber(0)
        setScore(0)
        setUserAnswer([])

        try {
            setQuestions(await getData(TOTAL_QUESTIONS, Difficulty.EASY))
            setLoading(false)
        } catch (error) {
            console.log(error)
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

    //enf of the game
    const nextQuestion = () => {
        let nextQ = number + 1
        if (nextQ === TOTAL_QUESTIONS) {
            setEndGame(true)
        }
        setNumber(nextQ)
    }


    useEffect(() => {
        const fetchAPI = async () => {
            try {
                setQuestions(await getData(TOTAL_QUESTIONS, Difficulty.EASY))
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAPI()
    }, [])

    return (
        <QuestionCardContext.Provider value={{
            questions, number, score, userAnswer, endGame, TOTAL_QUESTIONS, loading, startQuiz, checkAnswer, nextQuestion
        }}>
            {children}
        </ QuestionCardContext.Provider>
    )

};



export default QuestionCardProvider