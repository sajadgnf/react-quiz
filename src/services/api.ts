import axios from "axios";
import { useEffect } from "react";
import { shuffleArray } from "../helpers/utils";

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export enum Category {
    GEOGRAPHY = "22",
    SCIENCE_NATURE = "17",
    HISTORY = '23'

}

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}


const getData = async (amount: number, difficulty: Difficulty, category: Category) => {

    const BASE_URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`

    const response = await axios.get(BASE_URL)

    return response.data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([question.correct_answer, ...question.incorrect_answers])
    }))
}
export { getData }