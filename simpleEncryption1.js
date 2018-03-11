function encrypt(text, n) {
    var encrypted = text.split('');
    var newEnc = "";
    //for(i=n;i>0;i--){
      for(j=0;j<encrypted.length;j++)
      {
        //if((j+1)%2==0){
        console.log(j);
        console.log(encrypted[j]);
        newEnc+=encrypted[j];
      //}
      encrypted = newEnc;
    }
  //}
  return(encrypted);
}

console.log(encrypt("This is a test!",1));



function encrypt(text,n){

if(text===null || n<=0){
  return(text);
}

var encrypted = text.split('');
var odds = "";
var newEnc = "";
var count = 1;
var completeEnc = "";


for(i=0;i<n;i++){
    encrypted.forEach(function(plainChar){
      if(count%2==0){
        newEnc += plainChar;
      }else{
        odds += plainChar;
      }
        count++;  
    });
    newEnc+= odds;
    //console.log("Encrypted: " + newEnc);
    completeEnc = newEnc;
    odds = "";
    encrypted=newEnc.split('');
    newEnc="";
    count=1;
  }
  return(completeEnc);
}
//encrypt("This is a test!",1);


function decrypt(encryptedText, n) {

if(encrypted===null || n<=0){
  return(encryptedText);
}
var encrypted = encryptedText.split('');
var odds = "";
var newEnc = "";
var count = 1;
var completeDec = "";



for(i=0;i<n;i++){
    encrypted.forEach(function(plainChar){
      if(count%2!=0){
        newEnc += plainChar;
      }else{
        odds += plainChar;
      }
        count++;  
    });
    //newEnc+= odds;
    newEnc=newEnc.replace(/^/,odds);
    completeDec = newEnc;
    console.log("Decrypted: " + newEnc);
    odds = "";
    encrypted=newEnc.split('');
    newEnc="";
    count=1;
  }
  return(completeDec);
}

decrypt("hsi  etTi sats!",1);