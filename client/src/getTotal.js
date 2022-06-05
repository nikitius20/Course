function getTotalQuest(list){
    let totalQues = 0 
    list.forEach(element => {
        totalQues += element.countOfQuestions
    });
    return(totalQues)
}
function getTotalScore(list){
    let totalAns = 0
    list.forEach(element => {
        totalAns += element.countOfCorrectQuestions
    });
    return(totalAns)
}
function getTotalPoints(list){
    let points = 0 
    list.forEach(element => {
        points += element.countOfPoints
    });
    return(points)
}
function getTotalCorrectPoints(list){
    let corPoints = 0
    list.forEach(element => {
        corPoints += element.countOfCorrectPoints
    });
    return(corPoints)
}
module.exports = {getTotalScore,getTotalQuest,getTotalPoints,getTotalCorrectPoints}