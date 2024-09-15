
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

// Recreating the function in accordance with Part 2 requirements
// Declaring variables 
let numColumns = 0
let fullArray = []
let newStringArray = []
let newWordString = ''
let firstLineBreakIndex = CSV_STRING.indexOf('\n')

// Turning header row of CSV into array
// numColumns is incremented every comma to keep track of number of entries
for(let charIndex in CSV_STRING){
    if(charIndex < firstLineBreakIndex){
        if(CSV_STRING[charIndex] === ','){
            numColumns++
            newStringArray.push(newWordString)
            newWordString = ''

        } else{
            newWordString += CSV_STRING[charIndex]
        }
    // Once the loop reaches the index of the first '\n it is treated as the end of the header row
    } else if(charIndex == firstLineBreakIndex){
        newStringArray.push(newWordString);
        fullArray.push(newStringArray)
        newWordString = ''
        newStringArray = []
        numColumns++
    // Logic for finishing off the CSV string and completing the array of entries
    }else if(charIndex == CSV_STRING.length - 1){
        newWordString += CSV_STRING[charIndex];
        newStringArray.push(newWordString);
        if(newStringArray.length === numColumns){
            fullArray.push(newStringArray)
        }
    // Logic for everything between the end of the header row and the end of the string
    // Every '\n' results in the row array pushed into the main array
    // Every time this happens the function checks to make sure that the number of entries in the array is requal to numColumns
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
console.log(fullArray)

// Part 3: Transforming Data

// Turning fullArray from Part 2 into an array of objects
// This is pretty straightforward, an object is created for each person
// The key has the same index as the entries in their respective arrays
let objArray = []
for(let i = 1; i < fullArray.length; i++){
    let obj = {}
    for(let elmIndex in fullArray[i]){
        obj[fullArray[0][elmIndex].toLowerCase()] = fullArray[i][elmIndex]
    }
    objArray.push(obj)

}
console.log(objArray)


// Part 4: Sorting and Manipulating Data

// Remove the last element from the sorted array.
objArray.pop()
// Insert the following object at index 1:
// { id: "48", name: "Barry", occupation: "Runner", age: "25" }
objArray.splice(1, 0, { id: "48", name: "Barry", occupation: "Runner", age: "25" })
// Add the following object to the end of the array:
// { id: "7", name: "Bilbo", occupation: "None", age: "111" }
objArray.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" })

console.log(objArray)

// Part 5

let newCsvString = ''
let keyArray = (Object.keys(objArray[0]))

for(let key of Object.keys(objArray[0])){
    newCsvString += key
    // Necessary to prevent comma from generating at end of row
    // As long as it is not the last cell of the row it will add a comma after the entry
    if(keyArray.indexOf(key) < keyArray.length - 1){
        newCsvString += ','
    }
    
}
// Start new line after generating key row
newCsvString += '\n'
for(let i = 0; i < objArray.length; i++){
    for(let key of Object.keys(objArray[0])){
        newCsvString += objArray[i][key]
        // Necessary to prevent comma from generating at end of row
        // As long as it is not the last cell of the row it will add a comma after the entry
        if(keyArray.indexOf(key) < keyArray.length - 1){
        newCsvString += ','
    }
    }
    // Start new line after every entry row is generated
    newCsvString += '\n'

}
console.log(newCsvString)