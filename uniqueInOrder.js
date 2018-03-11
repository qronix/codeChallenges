var uniqueInOrder=function(iterable){
	let chars = [];
	if(typeof(iterable)==='string'){
		chars=iterable.split('');
	}
	if(chars.length!=0){
		removeDupes(chars);
	}else{
		removeDupes(iterable);
	}

	function removeDupes(dupedArr){
		var testString = ['a','a','a','b','b','b','b','a','b'];
		var newArr = [];
		var prevChar = '';
		const result994 = testString.filter(myChar => myChar==prevChar ? null: (prevChar=myChar, newArr.push(myChar)));
		return(newArr);
	}
}

var testString = ['a','a','a','b','b','b','b','a','b'];
uniqueInOrder(testString);


var newArr = [];
const reducer4 = (accumulator,currentValue) => console.log(currentValue);
var testString = ['a','a','a','b','b','b','b','a','b'];
newArr.push(testString.reduce(reducer4));


var testString = ['a','a','a','b','b','b','b','a','b'];
var newArr = [];
var prevChar = '';
const result994 = testString.filter(myChar => myChar==prevChar ? null: (prevChar=myChar, newArr.push(myChar)));
console.log(result994);




***************************REFACTOR************************************

var uniqueInOrder=function(iterable){
	let chars = [];
   if(typeof iterable[0]==='undefined'){
     return(chars);
   }
	if(typeof(iterable)==='string'){
		chars=iterable.split('');
	}
	if(chars.length!=0){
		return(removeDupes(chars));
	}else{
		return(removeDupes(iterable));
	}
	function removeDupes(dupedArr){
		var newArr = [];
		var prevChar = '';
		const result = dupedArr.filter(myChar => myChar==prevChar ? null: (prevChar=myChar, newArr.push(myChar)));
		return(newArr);
	}
}