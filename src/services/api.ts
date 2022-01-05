import axios from "axios";
import { shuffleArray } from "../helpers/utils";

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}


const getData = async (amount: number, difficulty: Difficulty) => {

    const BASE_URL = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const response = await axios.get(BASE_URL)

    return response.data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([question.correct_answer, ...question.incorrect_answers])
    }))
};

export { getData };