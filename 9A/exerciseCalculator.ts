interface TargetExercise {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const input = [3, 0, 2, 4.5, 0, 3, 1]

const calculateExercises = (input: number[], target: number): TargetExercise => {
    // calc training days
    let trainingDays = input.reduce((acc, curr) => {
        if (curr > 0){
            acc += 1
        }
        return acc
    }, 0)

    //  calc total exercise hours
    const totalHours = input.reduce((acc,curr) => acc + curr)

    //  calc average
    let averageHours = (totalHours / input.length)

    // calc rating and define descriptions
    let rating = 1
    let ratingDescription = ''
    if(averageHours < (target / 2)){
        ratingDescription = 'need to do better'
    } else if((averageHours > target / 2) && (averageHours < target)){
        rating = 2
        ratingDescription = 'not too bad but could be better'
    } else {
        rating = 3
        ratingDescription = 'Well done, you\'ve hit your target'
    }

    
    return {
        periodLength: input.length,
        trainingDays: trainingDays,
        success: (totalHours / input.length) >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: averageHours
    }
}

console.log(calculateExercises(input, 2))