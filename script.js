
// Part 1: Refactoring Old Code

const CSV_STRING = 'ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26';

let stringArray = [];
let wordString = '';
for(let charIndex in CSV_STRING){
    // Logic for handling changing cells
    if(CSV_STRING[charIndex] === ','){
        stringArray.push(wordString);
        wordString = '';
    // Logic for handling new lines, word is appended to stringArray, stringArray is logged and cleared
    } else if(CSV_STRING[charIndex] === '\n'){
        stringArray.push(wordString);
        wordString = '';
        console.log(stringArray);
        stringArray = [];
    // Logic for handling end of CSV string, last character is appended to word, word is appended to stringArray, stringArray is logged
    } else if (charIndex == CSV_STRING.length - 1) {
        wordString += CSV_STRING[charIndex];
        stringArray.push(wordString);
        console.log(stringArray);
    // Logic for appending regular characters to word string
    } else{
        wordString += CSV_STRING[charIndex];
    }
}

// Part 2: Expanding Functionality
// Part 2: Expanding Functionality
// Now that you are familiar with your code, and perhaps have improved it, it is time to expand upon its functionality.
// Begin with the following task:
// Declare a variable that stores the number of columns in each row of data within the CSV.
// Instead of hard-coding four columns per row, expand your code to accept any number of columns. This should be calculated dynamically based on the first row of data.
// For example, if the first row of data (the headings) has eight entries, your program should create eight entries per row. You can safely assume that all rows that follow will contain the same number of entries per row.
// After you have implemented the above:
// Store your results in a two-dimensional array.
// Each row should be its own array, with individual entries for each column.
// Each row should be stored in a parent array, with the heading row located at index 0.
// Cache this two-dimensional array in a variable for later use.
// Using the original CSV example data, here is what the result of this step should look like:
// ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26
// becomes
// [["ID", "Name", "Occupation", "Age"], ["42", "Bruce", "Knight", "41"], ["57", "Bob", "Fry Cook", "19"], ["63", "Blaine", "Quiz Master", "58"], ["98", "Bill", "Doctor’s Assistant", "26"]]

let numColumns = 0
let fullArray = []
let newStringArray = []
let newWordString = ''
let firstLineBreakIndex = CSV_STRING.indexOf('\n')

for(let charIndex in CSV_STRING){
    if(charIndex < firstLineBreakIndex){
        if(CSV_STRING[charIndex] === ','){
            numColumns++
            newStringArray.push(newWordString)
            newWordString = ''

        } else{
            newWordString += CSV_STRING[charIndex]
        }
    } else if(charIndex == firstLineBreakIndex){
        newStringArray.push(newWordString);
        fullArray.push(newStringArray)
        newWordString = ''
        newStringArray = []
        numColumns++
    }else if(charIndex == CSV_STRING.length - 1){
        newWordString += CSV_STRING[charIndex];
        newStringArray.push(newWordString);
        if(newStringArray.length === numColumns){
            fullArray.push(newStringArray)
        }
     
    } else{
        if(CSV_STRING[charIndex] === ','){
            newStringArray.push(newWordString)
            newWordString = ''
        } else if(CSV_STRING[charIndex] === '\n'){
            newStringArray.push(newWordString);
            if(newStringArray.length === numColumns){
                fullArray.push(newStringArray)
                newWordString = ''
                newStringArray = []
            }
        } else{
            newWordString += CSV_STRING[charIndex]
        }
    }
}

