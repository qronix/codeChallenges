// function findOdd(A) {
// 	var testString = A.toString();
// 	var testChars = testString.split(',');
// 	var badEgg = -0;

//   	testChars.forEach(function(testChar){
//   		console.log("Test Char is: " + testChar);
// 	  	var regex = new RegExp(testChar,'g');
// 		var occurrences = testString.match(regex).length;
// 	  	console.log("occurrences: " + occurrences);
// 	  	if(occurrences==1){
// 	  		badEgg = parseInt(testChar);
// 	  	}
// 		else if(occurrences>1&&(occurrences%2)!==0){
// 			badEgg = parseInt(testChar);
// 		}
//   	});
// 	return(badEgg);
// }

function findOdd(A) {
	var testString = A.toString();
	var testChars = testString.split(',');

	var badEgg = -0;

  	testChars.forEach(function(testChar){
  		var myRExp = "([^0-9,])"+testChar+"(?=,)";
	  	var regex = new RegExp(myRExp,'g');
	  	var occurrences = testString.match(regex).length;
	  	if(occurrences==1){
	  		console.log("Occurrences were: " + occurrences);
	  		badEgg = parseInt(testChar);
	  	}
		else if(occurrences>1&&(occurrences%2)!==0){
			console.log("Occurrences were: " + occurrences);
			badEgg = parseInt(testChar);
		}
  	});
	return(badEgg);
}



function findOdd(A) {
	var testString = A.toString();
	var testChars = testString.split(',');
	console.log("Test chars are: " +testChars);
	var badEgg = -0;

  	testChars.forEach(function(testChar){
  		var myRExp = "([^0-9,])"+testChar+"(?=,)";
  		console.log("Regex is: "+ myRExp);
	  	var regex = new RegExp(myRExp,'g');
	  	try{
	  		var occurrences = testString.match(regex).length;	
	  	}catch(exception){
	  		console.log(exception);
	  	}
	  	if(occurrences==1){
	  		console.log("Occurrences were: " + occurrences);
	  		badEgg = parseInt(testChar);
	  	}
		else if(occurrences>1&&(occurrences%2)!==0){
			console.log("Occurrences were: " + occurrences);
			badEgg = parseInt(testChar);
		}
  	});
	return(badEgg);
}

var myNums = [ 20, 1, -1, 2, -2, 3, 3, 5, 5, 1, 2, 4, 20, 4, -1, -2, 5 ];
console.log(findOdd(myNums));




var testString =  "20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5";
var myRExp = "([^0-9,])"+testChar+"(?=,)";
var regex = new RegExp(myRExp,'g');
var occurrences = testString.match(regex).length;










function findOdd(A){
	var myNums = A.sort().splice(',');
	console.log("Numbers obtained!");
	console.log("myNums are: " + myNums);
	var firstIteration = true;
	var prevNumber = -0;
	var numberCount = 0;
	var badEgg = -0;
	console.log("Starting forEach");

	myNums.forEach(function(testNumber){
		//if(badEgg == -0){
			console.log("Starting tests");
			if(firstIteration){
				prevNumber = testNumber;
				numberCount++;
				firstIteration = false;
				console.log("First iteration complete, prevNumber is: " + prevNumber);
				return;
			}else{
				if(testNumber==prevNumber){
					console.log("prevNumber is: " + prevNumber + " and numberCount is: "+numberCount);
					numberCount++;
				}else if(testNumber != prevNumber){
					console.log("testNumber is: "+testNumber+" and prevNumber is: "+prevNumber);
					console.log("Number count is: " + numberCount);
					if(numberCount%2!=0){
						badEgg = prevNumber;
						console.log("Badegg was found to be: "+badEgg);
						return(badEgg);
					}else{
						prevNumber=testNumber;
						numberCount=1;
						console.log("Not badEgg, prevNumber is now: " + prevNumber);
						return;
					}
				}
			}
		//}
	});
	if(numberCount%2!=0){
		badEgg=prevNumber;
	}
	return(badEgg);
}


var myNums = [ 20, 1, -1, 2, -2, 3, 3, 5, 5, 1, 2, 4, 20, 4, -1, -2, 5 ];

findOdd(myNums);


***************************REFACTOR*****************************

function findOdd(A){
	var myNums = A.sort().splice(',');
	var firstIteration = true;
	var prevNumber = -0;
	var numberCount = 0;
	var badEgg = -0;

	myNums.forEach(function(testNumber){
			if(firstIteration){
				prevNumber = testNumber;
				numberCount++;
				firstIteration = false;
				return;
			}else{
				if(testNumber==prevNumber){
					numberCount++;
				}else if(testNumber != prevNumber){
					if(numberCount%2!=0){
						badEgg = prevNumber;
						return(badEgg);
					}else{
						prevNumber=testNumber;
						numberCount=1;
						return;
					}
				}
			}
	});
	if(numberCount%2!=0){
		badEgg=prevNumber;
	}
	return(badEgg);
}