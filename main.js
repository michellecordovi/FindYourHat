const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//Field class
class Field {
    constructor(field) {
        this.field = field;
    }

    ///prints field to the screen
    print(){
        // let stringField = this.field.map(index => index.join(''))
        this.field.forEach(index => console.log(index.join('')))
    }

    //generates a custom field with width, height, and percentage of holes
    static generateField(width, height, percentage = 30){
        const newField = []
        const fieldDimensions = height * width;
        const numberOfHoles = fieldDimensions * (percentage/100)//number of holes in the field
        
        //creates the field based on height and width
        function createField(){
            for (let i = 0; i < height; i++){
                let array = []
                newField.push(array)
    
                for (let j = 0; j < width; j++) {
                    array.push(fieldCharacter);
                }
            }
        }


        //creates hole in the field
        function addHolesToField(){
            let holesAdded = 0;

            while (holesAdded < numberOfHoles){
                let randomRow = Math.floor(Math.random() * height);
                let randomColumn = Math.floor(Math.random() * width);

                if(newField[randomRow][randomColumn] !== hole){
                    newField[randomRow][randomColumn] = hole;
                    holesAdded++;
                }
            }
        }

        function addHat(){
            let hatAdded = false;

            while (hatAdded === false) {
                let randomRow = Math.floor(Math.random() * height);
                let randomColumn = Math.floor(Math.random() * width);

                if(newField[randomRow][randomColumn] !== hole){
                    newField[randomRow][randomColumn] = hat;
                    hatAdded = true
                }
            }

        }

        function addPlayer(){
            let playerAdded = false;

            while (playerAdded === false) {
                let randomRow = Math.floor(Math.random() * height);
                let randomColumn = Math.floor(Math.random() * width);

                if(newField[randomRow][randomColumn] !== hole){
                    newField[randomRow][randomColumn] = pathCharacter;
                    playerAdded = true
                }
            }
        }


        createField()
        addHolesToField()
        addHat()
        addPlayer()
        
        return newField;
    }

}

//create a new instance of field
let defaultField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
])


function makeMove(userInput){
    let input = userInput.toString().toLowerCase().trim();
    let field = myField.field;

    //function to decide what to do after the player has made a move
    function stepOnField(){
        if(field[row][column] === 'O'){
            process.stdout.write(`Oh no, you fell down the hole :( ! Better luck next time.`)
            process.exit()
        } else if (field[row][column] === "^") {
            process.stdout.write(`WOO, you found your hat! Congrats.`);
            process.exit()
        } else {
            field[row][column] = '*';
            myField.print();
            process.stdout.write(`Great, which way now? `);
        }
    }
    
    //cases to decide what to do depending on player move input
    switch (input) {
        case 'up':
            if(row - 1 < 0) {
                process.stdout.write(`Please enter a valid direction: `);
                process.stdin.on('data', makeMove)
            } else {
                row -= 1;
                stepOnField()
            }
            break;

        case 'down':
            if(row + 1 > field.length - 1){
                process.stdout.write(`Please enter a valid direction: `);
            } else {
                row += 1;
                stepOnField()
            }

            break;
        case 'right':           
            if(column + 1 > field[row].length - 1){
                process.stdout.write(`Please enter a valid direction: `); 
            } else {
                column += 1;
                stepOnField()
            }
            
            break;
        case 'left':
            if(column - 1 < 0) {
                process.stdout.write(`Please enter a valid direction: `);
                process.stdin.on('data', makeMove)
            } else {
                column -= 1;
                stepOnField()
            }

            break;
        default:
            console.log(`Please enter a valid input: up, down, right, or left?`)
    }
}

const myField = new Field(Field.generateField(10, 5, 20))

let row = myField.field.findIndex(element => element.includes("*")) //index of row where * starts in the field
let column = myField.field[row].findIndex(element => element.includes("*"))


myField.print()

process.stdout.write('Which direction would you like to move: up, down, right, or left? ')
process.stdin.on('data', makeMove)