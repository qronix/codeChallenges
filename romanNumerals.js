
function toRoman(num){
	var romNums = {
		'I':1,
		'V':5,
		'X':10,
		'L':50,
		'C':100,
		'D':500,
		'M':1000
	}

	var strNum = num.toString();
	var numVals = strNum.split('');
	numVals = numVals.reverse();
	var sepNums = [];

	for(var i=numVals.length-1; i>=0; i--){
		var tmpNum = numVals[i];
		getLetters(tmpNum*Math.pow(10,i),i);
	}

}

function getLetters(num, power){
	var amt = num/(Math.pow(10,power));
	console.log("Amount: " + amt+" power: " + power);
	var testStr = " ";

	if(amt>0&&amt<4){
		for(var i=0; i<amt; i++){
			testStr+=Math.pow(10,power);
			if(i<amt-1){
				testStr+=",";
			}
		}
	}
	if(amt===4){
		testStr+=4*Math.pow(10,power);
	}
	if(amt===5){
		testStr+=5*Math.pow(10,power);
	}
	
	console.log("Test string is: " + testStr);
}

toRoman(2347); //MMCCCXLVII