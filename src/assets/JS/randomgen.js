genRandomNumbers = function(){
    let rNum = [];
    for (let i=0;i < 10; i++){
        let rnd = Math.floor((Math.random() * 999) + 1);
        rNum.push(rnd)
    }
    return rNum;
}