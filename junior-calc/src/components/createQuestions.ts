let createQuestions = (): object => {
    let plusOne: string[] = []
    let plusTwo: string[] = []
    let minusOne: string[] = []
    let minusTwo: string[] = []

    for(let i=0; i<20; i++){
        for(let j=1; j<10; j++){
            if(i>=11){
                if((i-j) < 10){
                    minusTwo.push(i + "-" + j)
                }
            }else if(i=10){
                continue
            }else{
                if((i+j) > 10){
                    plusTwo.push(i + "+" + j)
                } else {
                    plusOne.push(i + "+" + j)
                    if(i>=j){
                        minusOne.push(i + "-" + j)
                    }
                }
            }
        }
    }

    return {
        'plusOne': plusOne,
        'plusTwo': plusTwo,
        'minusOne': minusOne,
        'minusTwo': minusTwo,
    }
}

export default createQuestions
