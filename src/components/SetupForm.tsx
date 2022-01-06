import React, { useContext } from 'react';

//context
import { QuestionCardContext } from '../context/QuestionCardProvider';

//types
import { Difficulty, Category } from "../services/api"

const SetupForm = () => {
    const {
        error,
        startQuiz,
        totalQuestions,
        setTotalQuestions,
        category,
        difficulty,
        setCategory,
        setDifficulty
    } = useContext(QuestionCardContext)
    return (

        <form className='setupFrom' onSubmit={(e) => e.preventDefault()}>
            <h2> SETUP QUIZ</h2 >

            <label htmlFor="amount">Number Of Questions</label>
            <select name="amount" value={totalQuestions} onChange={(e) => setTotalQuestions(Number(e.target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>

            <label htmlFor="category">Category</label>
            <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value={Category.SCIENCE_NATURE}>science & nature</option>
                <option value={Category.HISTORY}>history</option>
                <option value={Category.GEOGRAPHY}>Geography</option>
            </select>

            <label htmlFor="difficulty">Select Difficulty</label>
            <select name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value={Difficulty.EASY}>easy</option>
                <option value={Difficulty.MEDIUM}>medium</option>
                <option value={Difficulty.HARD}>hard</option>
            </select>
            < button onClick={startQuiz}>start</button>
            <p>{error && "Can't Generate Questions, Please Try Different Options"}</p>
        </form >
    );
};

export default SetupForm;