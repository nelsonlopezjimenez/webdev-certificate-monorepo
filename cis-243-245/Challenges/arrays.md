1. **E1.6** Write a program that counts the number of letter occurrences in a string. Return an array that contains all letters and their count, like this for the string `cbb`: `[['c', 1],['b', 2]]`.
    
    - Implementation of  the solution
        
        ```jsx
        const phrase = "this is the test name".toLocaleLowerCase()
        const abc = 'abcdefghijklmnopqrstuvwxyz'.split('')
        const result = []
        
        for (const letter of phrase){
          let found = false
          if (!abc.includes(letter)) continue
          for(const entry of result){
            if (entry[0] === letter){
              entry[1]++
              found = true
            }
            console.log(result)
          }
          if(!found){
            result.push([letter, 1])
          }
        }
        console.log(result)
        ```
        