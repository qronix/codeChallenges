// function duplicateCount(text){
//   var textSplit = text.split('');
//   var similarChars = [];

//   dupeTest(textSplit[0],textSplit);

//  function dupeTest(testChar,testString){
//  	if(testChar==testString[0]){
//  		similarChars.push(testChar);
//  	}
//  	testString.forEach(function(testStringChar){
// 		dupeTest.call(testStringChar,testString.shift(testStringChar));
//  	});
//  }
//  return(similarChars[0]);
// }

function duplicateCount(text){
	var text = text.toLowerCase();
	var textSplit = text.split('');
	var myDupes = [];

	textSplit.forEach(function(testChar){
		var regex = new RegExp(testChar,'ig');
		pushDupe(testChar,text.match(regex).length);
	});

	function pushDupe(dupeChar,count){
			if(count>1 && !myDupes.includes(dupeChar)){
					myDupes.push(dupeChar);
			}
		}
	return(myDupes.length);
}

***********************Refactor*******************************************

function duplicateCount(text){
	var text = text.toLowerCase();
	var textSplit = text.split('');
	var dupeCount = 0;
	//var myDupes = [];

	textSplit.forEach(function(testChar){
		var regex = new RegExp(testChar.toLowerCase(),'ig');
		if(testChar.toLowerCase(),text.match(regex).length>1){
			textSplit[testChar] = '';
			console.log(textSplit[testChar]);
			dupeCount++;
		}
	});

	// function pushDupe(dupeChar,count){
	// 		if(count>1 && !myDupes.includes(dupeChar)){
	// 			    console.log("Adding " + dupeChar + " to the list.");
	// 				myDupes.push(dupeChar.toLowerCase());
	// 		}
	// 	}
	return(dupeCount);
}