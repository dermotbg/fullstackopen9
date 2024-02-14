import { parseArgs } from "./utils";

interface ExerciseStats {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}


export const calculateExercises = (input: number[], target: number): ExerciseStats => {
    // calc training days
    const trainingDays = input.reduce((acc, curr) => {
        if (curr > 0){
            acc += 1;
        }
        return acc;
    }, 0);

    //  calc total exercise hours
    const totalHours = input.reduce((acc,curr) => acc + curr);

    //  calc average
    const averageHours = (totalHours / input.length);

    // calc rating and define descriptions
    let rating = 1;
    let ratingDescription = '';
    if(averageHours < (target / 2)){
        ratingDescription = 'need to do better';
    } else if((averageHours > target / 2) && (averageHours < target)){
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'Well done, you\'ve hit your target';
    }

    
    return {
        periodLength: input.length,
        trainingDays: trainingDays,
        success: (totalHours / input.length) >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: averageHours
    };
};

try {
    const { value1, value2 } = parseArgs(process.argv, 'calculateExercises');
    console.log(calculateExercises(value2 as number[], value1));
} catch (error) {
    let errorMessage = 'Something went wrong.';

    // narrow type of error
    if(error instanceof Error){
        errorMessage += ' Error ' + error.message;
    }

    //log error
    console.log(errorMessage);
}