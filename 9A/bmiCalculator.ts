//bmi calculated by weight divided by height squared

const calculateBmi = (height: number, weight: number): string => {
    const heightConverted = height / 100
    const bmi = weight / (heightConverted * heightConverted)
    switch(true){
        case (bmi < 18.5):
            return 'Low (under weight)'
        case (bmi >= 18.5 && bmi <= 24.9):
            return 'Normal (healthy weight)'
        case (bmi >= 25 && bmi <= 29.9):
            return 'High (over weight)'
        case (bmi < 29.9):
            return 'Very Hight (obese)'
        default:
            throw new Error('Input data invalid') 
    }
}

try {
    console.log(calculateBmi(180, 74))
} catch (error) {
    let errorMessage = 'Something went wrong.'
    if(error instanceof Error){
        errorMessage += ' Error ' + error.message
    }
    console.log(errorMessage)
}