var romNums = {
	'I': 1,
	'V': 5,
	'X': 10,
	'L': 50,
	'C': 100,
	'D': 500,
	'M': 1000
};
var outputStr = " ";

class RomanNumerals {
	static toRoman(num) {
		outputStr = " ";
		var strNum = num.toString();
		var numVals = strNum.split('');
		numVals = numVals.reverse();
		var sepNums = [];

		for (var i = numVals.length - 1; i >= 0; i--) {
			var tmpNum = numVals[i];
			this.getLetters(tmpNum * Math.pow(10, i), i);
		}

		return (outputStr.trim());
	}

	static getLetters(num, power) {
		var amt = num / (Math.pow(10, power));
		if (power === 3) {
			for (var i = 0; i < amt; i++) {
				outputStr += Object.keys(romNums).find(key => romNums[key] === Math.pow(10, power));
			}
			return 0;
		}

		if (amt > 0 && amt < 4) {
			for (var i = 0; i < amt; i++) {
				outputStr += Object.keys(romNums).find(key => romNums[key] === Math.pow(10, power));
			}
		}
		if (amt === 4) {
			outputStr += Object.keys(romNums).find(key => romNums[key] === Math.pow(10, power));
			outputStr += Object.keys(romNums).find(key => romNums[key] === 5 * Math.pow(10, power));
		}
		if (amt === 5) {
			outputStr += Object.keys(romNums).find(key => romNums[key] === 5 * Math.pow(10, power));
		}
		if (amt > 5 && amt < 9) {
			outputStr += Object.keys(romNums).find(key => romNums[key] === 5 * Math.pow(10, power));
			for (var i = (amt - 5); i > 0; i--) {
				outputStr += Object.keys(romNums).find(key => romNums[key] === Math.pow(10, power));
			}
		}
		if (amt === 9) {
			outputStr += Object.keys(romNums).find(key => romNums[key] === Math.pow(10, power));
			outputStr += Object.keys(romNums).find(key => romNums[key] === 10 * Math.pow(10, power));
		}
	}

	static fromRoman(input) {
		var numerals = input.split('');
		var tally = 0;
		var skip = false;
		for (var i = 0; i < numerals.length; i++) {
			if (skip) {
				skip = false;
				continue;
			}
			if (numerals[i] === "I" && numerals[i + 1] === "V") {
				tally += 4;
				skip = true;
				continue;
			} else if (numerals[i] === "I" && numerals[i + 1] === "X") {
				tally += 9;
				skip = true;
				continue;
			} else if (numerals[i] === "X" && numerals[i + 1] === "L") {
				tally += 40;
				skip = true;
				continue;
			} else if (numerals[i] === "X" && numerals[i + 1] === "C") {
				tally += 90;
				skip = true;
				continue;
			} else if (numerals[i] === "C" && numerals[i + 1] === "D") {
				tally += 400;
				skip = true;
				continue;
			} else if (numerals[i] === "C" && numerals[i + 1] === "M") {
				tally += 900;
				skip = true;
				continue;
			} else {
				tally += romNums[numerals[i]];
			}
		}
		if (tally === 0) {
			tally += romNums[numerals[i]];
		}
		return tally;
	}
}

let romanClass = new RomanNumerals();
romanClass.toRoman(3999); //MMMCMXCIX