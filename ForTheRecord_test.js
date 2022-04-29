/* Couldn't implement the timer function. Tried setTimeOut and setInterval functions but got results only after entering "quit". 
Would probably need help in a real case scenario. */


let prompt = require("prompt-sync")();

let condition = true;
let dataList = {};
let outputDataList = [];

console.log(">> Welcome to the number frequency calculator REPL application");
console.log(">> Please see below for the list of instructions.")
console.log(
    `
        >> Please enter 
        "halt"      -> to stop the timer
        "resume"    -> to resume timer
        "quit"      -> to end the game
    `
)
console.log(">> Please input the amount of time in seconds between emitting numbers and their frequency");
let timeInterval = prompt() * 1000;


while (condition){
    console.log(">> Please enter a number");
    let nextNumber = prompt();
    userEnteredDataCheck(nextNumber);
    listObjectCOnverter();
}

// update the dataList object
function updateDataList(data){
    if (dataList[data]){
        dataList[data] += 1
    } else {
        dataList[data] = 1
    }
}


// user entry check 
function userEnteredDataCheck(data){
    if (data === "halt"){
        let subCondition = true;
        while (subCondition) {
            console.log(">> timer haulted");
            let userResumeSignal = prompt();
            if (userResumeSignal === "resume") {
                console.log(">> timer resumed");
                subCondition = false;
            } else {
                console.log(">> enter 'resume' to start the the timer")
            };
        };
    } else if (data === "quit") {
        finalOutput();
        console.log(">>> Thanks for playing, the program will now terminate. <<<");
        condition = false;
    } else {
        let localDataTypeChecker = isNaN(data);

        if (localDataTypeChecker){
            console.log(">> Please enter a number, halt or quit.")
        } else{
            let enteredNumber = parseInt(data);
            fibonnaciChecker(enteredNumber);
            updateDataList(enteredNumber);
        }
    }

}

// check for the fibonnaci series
function fibonnaciChecker(data){
    let a = 0;
    let b = 1;
    let c = 0;
    let fibNumberList = []

    for (let i = 0; i < 1000; i++){
        fibNumberList.push(b)
        c = a + b;
        a = b;
        b = c;
    }
    
    fibNumberList.map(item => {
        if (item === data){
            console.log(">> FIB");
        }
    })
}

// mapping objects to display final output
function finalOutput(){
    let finalString = '';
    outputDataList.map(items => {
        finalString += `${items.key}:${items.value}, `
    })

    console.log(">>> your entered nunber : frequency of repetation are listed below <<<")
    console.log(`>> ${finalString}`);
}

// list to object conversion
function listObjectCOnverter(){
    let localArray = Object.keys(dataList);
    let locaList = []
    localArray.map(items => {
        locaList.push({
        key: items,
        value: dataList[items] 
        });
    });

    locaList.sort(function (a, b) {
        return b.value - a.value;
    });

    outputDataList = locaList
}