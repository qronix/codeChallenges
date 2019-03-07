function findAll(n,k){
    //n is sum of digits value
    //k is length of number
    let values = [];
    for(let i=100; i<999; i++){
        let prevValue = 0;
        let numString = i.toString().split('').map((digit)=>Number.parseInt(digit)).reduce((acc,next,prevValue)=>{if (next>prevValue){prevValue=next; return acc+=next; }else{return false;}});
        console.log(`I is ${i} and Numstring: ${numString}`);
        if(numString === n && i.toString().length === k){
            values.push[i];
        }
    }
    let returnData = [];
    returnData.push(Math.max(values));
    returnData.push(Math.min(values));
    returnData.push(values.length);
    return returnData;
    
    // return numString.reduce((acc,next)=>(next>prevValue)?acc+next:null);
    console.log(numString);
}

findAll(10,3);