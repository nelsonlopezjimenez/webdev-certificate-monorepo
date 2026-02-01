# Claude quiz test

## Procedure

1. Using animal-express-mongo-schema-1.1.3.html
1. Edit it by adding array with mongo questions in json format
1. Change title in 
```js
  const completeQuizData = {
      title: "MERN Stack Backend Express and Mongo: Best Practices",
      description: "Comprehensive assessment covering Express and Mongo Best Practices",
      timeLimit: 120,
      attempts: 3,
      // #####################################################
      questions: [ 
  {
    id: 3000,....},{},{},{},]
```
1. Add the new set of questions 
1. Click on download:
![html interface to download zip QTI package](image.png)
1. The name of the downloaded file is: mern-quiz-100-questions.txt
```
it contain imsmanifest.xml and mern-quiz.xml files to be extracted
```
1. Create a folder with animal-package name
1. copy/paste twice the mern-quiz-100-questions.txt file
1. Edit both copies: delete mern-quiz.xml in the imsmanifest.xml file, and
1. Delete the imsmanifest.xml in the mern-quis.xml file
1. Send the folder to commpression
1. Upload to canvas
1. The questions are saved in both question_bank and as a quiz
1. In the question_bank move the question by group
1. Label appropriaely
1. Possibly export the course with the question_banks to initialize unique identifiers for each questions and bank.
1. The question numbers reflect the index in the array.
1. Moving the questions by group needs to be done manually since the sorting is not numerically 1, 100, 19, 2, 20, etc. 


1. cat and cat-dog uploads correctly
1. Elephant and fox are failing.
1. cat-dog was exported and all the unique id's changed.
1. mern_quiz_canvas.html contains all the questions (100) as an array of objects but it malformed, it does not export correct zip file
1. claude_quiz_data-react-100-claude-gen-questions.js contains all hundred questons.
1. copied cat-dog to cat-gator and start from fresh: delete zip packed, delete xml files, do not change the name to see what happen when importing into canvas.
1. elephant and fox not sure if edited the file downloaded from fox-mern-schema-1.1.3.html with the correct questions
1. so far react fundamentals 16 questions exported.
1. React state and api integration 20 questions exported
1. Quiz title: completeQuizData.title