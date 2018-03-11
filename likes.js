function likes(names) {
    if(names[0] === undefined){
        return("no one likes this");
    }else if(names.length==1){
        return(appendEnd(names[0],1));
    }else{
        var likesStatement = names.join(' and ');
        var commentorCount = likesStatement.match(/ and /g).length;
        
        switch(commentorCount){
            case 1:    
				      return(appendEnd(likesStatement,2));
            break;
            case 2:
                return(appendEnd(format(likesStatement),3));
              
            default:
				      var count = commentorCount-1;
              var freshLikeStatement = likesStatement.split(/ and /,2).join(', ');
				      freshLikeStatement += " and " + (count).toString() + " others";
              return(appendEnd(freshLikeStatement,4));
				    break;   
        }
    }
    
    function appendEnd(str,likeCount){
        if(likeCount<2){
          return str+" likes this";
        }else{
          return str+" like this";
        }
    }
    
    function format(str){
        return(str.replace(/ and /,', '));
    }
}


    
likes(['test','bill','james','paul','mike']);

//str.match(/and /g).length);