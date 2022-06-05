import {getTotalScore,getTotalQuest} from "../getTotal";

describe("Get Total Methods",()=>{
    it("Total Questions in test",()=>{
      let res = getTotalQuest([
        {
          "_id": "61e4abc421cf238e774a8083",
          "userId": "61e4124159ad53ee6e9082f7",
          "theme": "q",
          "countOfQuestions": 2,
          "countOfCorrectQuestions": 1,
          "__v": 0
        },
        {
          "_id": "61e4abe921cf238e774a80f2",
          "userId": "61e4124159ad53ee6e9082f7",
          "theme": "q",
          "countOfQuestions": 1,
          "countOfCorrectQuestions": 1,
          "__v": 0
        }
      ])
      
      expect(res).toBe(3);
    })
    it("Total correct answers in test",()=>{
      let res = getTotalScore([
        {
          "_id": "61e4abc421cf238e774a8083",
          "userId": "61e4124159ad53ee6e9082f7",
          "theme": "q",
          "countOfQuestions": 2,
          "countOfCorrectQuestions": 1,
          "__v": 0
        },
        {
          "_id": "61e4abe921cf238e774a80f2",
          "userId": "61e4124159ad53ee6e9082f7",
          "theme": "q",
          "countOfQuestions": 1,
          "countOfCorrectQuestions": 1,
          "__v": 0
        }
      ])
  
      expect(res).toBe(2);
    })
  })