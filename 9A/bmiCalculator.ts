import { parseArgs } from "./utils"

export const calculateBmi = (height: number, weight: number): string => {

    // calc bmi
    const heightConverted = height / 100
    const bmi = weight / (heightConverted * heightConverted)

    // return result
    switch(true){
        case (bmi < 18.5):
            return 'Low (underweight)'
        case (bmi >= 18.5 && bmi <= 24.9):
            return 'Normal (healthy weight)'
        case (bmi >= 25 && bmi <= 29.9):
            return 'High (overweight)'
        case (bmi < 29.9):
            return 'Very High (obese)'
        default:
            throw new Error('Input data invalid') 
    }
}

try {
    const { value1, value2 } = parseArgs(process.argv, 'calculateBmi')
    console.log(calculateBmi(value1, value2 as number))
} catch (error) {
    let errorMessage = 'Something went wrong.'

    // narrow type of error
    if(error instanceof Error){
        errorMessage += ' Error ' + error.message
    }

    //log error
    console.log(errorMessage)
}