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

function fromRoman(input){
	var numerals = input.split('');
	console.dir(numerals);
	var tally = 0;
	var skip = false;
	// var numerals[i] = "";
	for(var i=0; i<numerals.length; i++){
		console.log("In loop");
		console.log("Numerals[i] is : " + numerals[i]);
		// if(i===0){
		// 	if(numerals[i]==="V"||numerals[i]==="L"||numerals[i]==="D"||numerals[i]==="M"){
		// 		tally+=romNums[numerals[i]];
		// 	}
		// 	continue;
		// }
		if(skip){
			skip = false;
			continue;
		}
		if(numerals[i]==="I" && numerals[i+1]==="V"){
			tally += 4;
			console.log("Adding 4 to tally");
			skip=true;
			continue;
		}
		else if(numerals[i] === "I" && numerals[i+1] === "X"){
			tally += 9;
			console.log("Adding 9 to tally");
			skip=true;
			continue;
		}
		else if(numerals[i] === "X" && numerals[i+1] === "L"){
			tally += 40;
			console.log("Adding 40 to tally");
			skip=true;
			continue;
		}
		else if(numerals[i] === "X" && numerals[i+1] === "C"){
			tally += 90;
			console.log("Adding 90 to tally");
			skip=true;
			continue;
		}
		else if(numerals[i] === "C" && numerals[i+1] === "D"){
			tally += 400;
			console.log("Adding 400 to tally");
			skip=true;
			continue;
		}
		else if(numerals[i] === "C" && numerals[i+1] === "M"){
			tally += 900;
			console.log("Adding 900 to tally");
			skip=true;
			continue;
		}
		else{
			tally += romNums[numerals[i]];
			console.log("Adding " + romNums[numerals[i]] + " to tally");
		}
	}
	if(tally===0){
		tally += romNums[numerals[i]];
	}

	console.log("Numeral tally is: " + tally);
	return tally;
}

fromRoman("MCMLXXXIX");


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