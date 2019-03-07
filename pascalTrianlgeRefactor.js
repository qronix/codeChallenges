function pascalsTriangle(degree){
	var pascalTriangleObjectCollection=[];
	var flatArray = [];
	var results = generateNumbers((degree-(degree-1)),pascalTriangleObjectCollection,degree,flatArray);
	var flatArray = generateFlatArray(pascalTriangleObjectCollection);
	return(flatArray);
}

function generateNumbers(currentDegree,triangleObjectCollection,degreeDepth,flatArray){
	var numbersToGenerateQuant = (currentDegree-2);
	var generateCount = 0;
	var triangleRowObject = {};

	if(numbersToGenerateQuant<0){
		triangleRowObject['1']=1;
	}else if(numbersToGenerateQuant===0){
		triangleRowObject['1']=1;
		triangleRowObject['2']=1;
	}else{
			for(var j=1;j<=numbersToGenerateQuant+1;j++){
			if(generateCount===0){
				triangleRowObject[j]=1;	
			}else if(generateCount>0 && generateCount<=currentDegree-1){
				if(triangleObjectCollection.length!==undefined){
					var previousRowObject = triangleObjectCollection[triangleObjectCollection.length-1];
					var previousRowNumbers = [];
					Object.keys(previousRowObject).map(function(key){
						previousRowNumbers.push(previousRowObject[key]);
					});
					 triangleRowObject[j] = previousRowNumbers[j-2]+previousRowNumbers[j-1];
				}
			}
			generateCount++;
		}
	}
		triangleRowObject[currentDegree]=1;
		triangleObjectCollection.push(triangleRowObject);
		if((currentDegree+1)<=degreeDepth){
			generateNumbers((currentDegree+1),triangleObjectCollection,degreeDepth,flatArray);
		}
}

function generateFlatArray(triangleObjectCollection){
	var flatArray = [];

	triangleObjectCollection.forEach(function(obj){
		Object.keys(obj).map(function(key){
			flatArray.push(obj[key]);
		});
	});

	return(flatArray);
}