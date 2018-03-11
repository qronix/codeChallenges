function rgb(r, g, b){
var hexRep = "";
cleanValuesAndConvert([r,g,b]);

function cleanValuesAndConvert(vals){
vals.forEach(function (val){

  if(val>255){
    val=255;
  }
  if(val<=0){
    hexRep+="00";
    return;
  }
  console.log("after check");
  hexRep+=val.toString(16);
});
}
return(hexRep.toUpperCase());
}