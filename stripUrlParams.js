// Complete the method so that it does the following:
// Removes any duplicate query string parameters from the url
// Removes any query string parameters specified within the 2nd argument (optional array)

// Examples:
// stripUrlParams('www.codewars.com?a=1&b=2&a=2') // returns 'www.codewars.com?a=1&b=2'
// stripUrlParams('www.codewars.com?a=1&b=2&a=2', ['b']) // returns 'www.codewars.com?a=1'
// stripUrlParams('www.codewars.com', ['b']) // returns 'www.codewars.com'

//My examples:
// stripUrlParams('www.codewars.com?cheese=melted&balls=sweaty&cheese=swiss') 
// 				returns www.codewars.com?cheese=melted&balls=sweaty

//regex pattern : (.)(?=\=)
//https://www.codewars.com/kata/51646de80fd67f442c000013/train/javascript
function stripUrlParams(url, paramsToStrip){
	// var paramMatches = url.match(/(.)(?=\=)/g);
	// checkDups(paramMatches);
	var newUrl = url.replace(url.substr(0,url.indexOf('?')+1),'');
	console.log(newUrl);
	var urlParams = newUrl.split('&');
	console.dir(urlParams);
	var cleanParams = checkDups(urlParams);
}

// function checkDups(matches){
// 	for(var i =0; i<matches.length-1; i++){
// 		console.log("Checking:" + matches[i]);
// 		if(matches[i+1]==matches[i]){
// 			console.log(matches[i]+ " is a duplicate");
// 		}
// 	}
// }

function checkDups(params){
	var dupeBucket = [];
	//start at index 0
	//for all remaining indices until the end of array
	//check for duplication
	//proceed to next index and repeat

	for(var i=0; i<params.length-1; i++){
		for(var j=i+1; j<params.length; j++){
			if(params[i].substr(0,1)===params[j].substr(0,1)){
				console.log("Found duplicate: " + params[j].substr(0,1));
				if(!dupeBucket.includes(params[j])){
					dupeBucket.push(params[j]);
				}
			}
		}
	}

	console.dir(dupeBucket);

}

stripUrlParams('www.codewars.com?a=1&b=2&a=2&b=3&b=4&a=6');