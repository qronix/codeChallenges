var romNums = {
	'I':1,
	'V':5,
	'X':10,
	'L':50,
	'C':100,
	'D':500,
	'M':1000
}

var outputStr = " ";


function toRoman(num){
  	outputStr = " ";
	var strNum = num.toString();
	var numVals = strNum.split('');
	numVals = numVals.reverse();
	var sepNums = [];

	for(var i=numVals.length-1; i>=0; i--){
		var tmpNum = numVals[i];
		getLetters(tmpNum*Math.pow(10,i),i);
	}

	//console.log("Output string is: " + outputStr);
	
	return(outputStr.trim());
}

function getLetters(num, power){
	var amt = num/(Math.pow(10,power));

	if(power===3){
		for(var i=0; i<amt; i++){
			outputStr+= Object.keys(romNums).find(key => romNums[key] === Math.pow(10,power));
		}
		return 0;
	}

	if(amt>0&&amt<4){
		for(var i=0; i<amt; i++){
			outputStr+= Object.keys(romNums).find(key => romNums[key] === Math.pow(10,power));
		}
	}
	if(amt===4){
		outputStr+= Object.keys(romNums).find(key => romNums[key] === Math.pow(10,power));
		outputStr+= Object.keys(romNums).find(key => romNums[key] === 5*Math.pow(10,power));
	}
	if(amt===5){
		outputStr+= Object.keys(romNums).find(key => romNums[key] === 5*Math.pow(10,power));
	}
	if(amt>5 && amt<9){
		outputStr += Object.keys(romNums).find(key => romNums[key] === 5*Math.pow(10,power));
		for (var i=(amt-5); i>0; i--){
			outputStr += Object.keys(romNums).find(key => romNums[key] === Math.pow(10,power));
		}
	}
	if(amt===9){
		outputStr+= Object.keys(romNums).find(key=> romNums[key] === Math.pow(10,power));
		outputStr+= Object.keys(romNums).find(key=> romNums[key] === 10*Math.pow(10,power));
	}
}

// toRoman(3999); //MMCCCXLVII

// toRoman(1);
// toRoman(2);
// toRoman(3);
// toRoman(4);
// toRoman(5);
// toRoman(6);
// toRoman(7);
// toRoman(8);
// toRoman(9);
// toRoman(10);
// toRoman(11);