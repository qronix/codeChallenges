function solution(digits){

	var sequences = digits.match(/.{5}/g);
	var numericals = [];

	sequences.forEach(function(sequence){
		numericals.push(parseInt(sequence));
	});
	//console.log(numericals);
	
return(Math.max.apply(this,numericals));

}

var myDigs = "123456789010";
solution(myDigs);