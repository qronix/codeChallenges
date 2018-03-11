function spinWords(myStrang){
    var words = myStrang.split(" ");
    if(words.length==1 && words[0].split("").length>=5){
        var temp = words[0].split("");
        words[0] = temp.reverse().join("");
    }
    else{
        for(i=0;i<words.length;i++){
            if(words[i].split("").length>=5){
                var temp = words[i].split("");
                words[i] = temp.reverse().join("");
            }
        }
    }

    return words.join(" ");
}

//REFACTOR
function spinWords(myStrang){
    var words = myStrang.split(" ");
    work(words.length);
    function work(len){
        for(i=0;i<len;i++){
            if(words[i].split("").length>=5){
                var temp = words[i].split("");
                words[i] = temp.reverse().join("");
            }
        }
    }
    return words.join(" ");
}
