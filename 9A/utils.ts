type Operation = 'calculateBmi' | 'calculateExercises'

interface ArgValues {
    value1: number
    value2: number | number[]
}


export const parseArgs = (args: string[], op:Operation ): ArgValues => {
    if(op === 'calculateBmi'){

        //  check #args
        if (args.length < 4) throw new Error('Not enough args')
        if (args.length > 4) throw new Error('Too many args')

        // check arg types
        if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
            return {
                value1: Number(args[2]),
                value2: Number(args[3])
            }
        } 
        else {
            throw new Error('Provided values were not numbers!')
        }
    }
    else{
        // check #args
        if (args.length < 3) throw new Error('Not enough args')

        // convert applicable args to array
        const argArray = args.slice(3).map(Number)

        // check if any args are NaN
        if(argArray.some(a => isNaN(a))) throw new Error('Invalid arguments given')
        
        return {
            value1: Number(args[2]),
            value2: argArray
        }
    }
}