function pascalsTriangle(degree){

	var triangleObjectCollection=[];
	generateNumbers(degree,triangleObjectCollection);
	console.log(triangleObjectCollection);
}

function generateNumbers(degree,triangleObjectCollection){
	var indexGenStart = degree-(degree-1);
	var indexGenStop = degree;
	var numbersToGenerateQuant = (degree-2);
	var numberToPush = -99;

	var triangleRowObject = {};
	//use recursion
	if(degree===1){
		triangleRowObject['degree']=degree;
		triangleRowObject[degree] = '1';
		triangleObjectCollection.push(triangleRowObject);
		generateNumbers((degree-1),triangleObjectCollection);
	}else{
		if(numbersToGenerateQuant===0){
			triangleRowObject['degree']=degree;
			triangleRowObject[indexGenStart] = '1';
			triangleRowObject[indexGenStop] = '1';
			triangleObjectCollection.push(triangleObject);
			generateNumbers((degree-1),triangleObjectCollection);
		}
		if(numbersToGenerateQuant>0){
			//dry this up
			triangleRowObject['degree']=degree;
			triangleRowObject[indexGenStart] = '1';
			triangleRowObject[indexGenStop] = '1';
			var previousRowObject = triangleObjectCollection[triangleObjectCollection.length];
			var previousRowNumbers = [];
					Object.keys(previousRowObject).map(function(key){
						previousRowNumbers.push(previousRowObject[key]);
					});

			for(i=(indexGenStart+1);i<indexGenStop;i++){
				triangleRowObject[i]=previousRowNumbers[i-2]+previousRowNumbers[i-1];
			}
			triangleObjectCollection.push(triangleObject);
			generateNumbers((degree-1),triangleObjectCollection);
		}
	}
}

// function createTriangleRowBoundary(degree,startIndex,stopIndex,triangleObjectCollection){

// }