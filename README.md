# Find Your Hat

## Description:
Find Your Hat is a game built using Node.js that is played on your computers terminal.

## How to get this game on your computer
- First, you must have node.js downloaded onto your computer
- Clone the repository to your computer

## How to Play
1. Access the game's folder via the terminal
2. You, the player, are represented by the "*", your hat is represented by "^", your are walking through a field represented by '░', and that field is covered with holes represeted by "O".
3. The objective of the game is for you(*) to make your way to your hat without falling into one of the holes!
4. Start the game my inputing 'node main.js' into the terminal, this will prompt the start of the game.
5. Input which direction you want to move (up, down, right, left), and the field will continue to print to the terminal with the path you've taken.
6. The game ends when you've found your hat (win!) or when you fall down a hole (lose).


### Example Game:
![An example of the game being played in full](./game-screenshot.png)


## Modify Game 
- If you'd like to change the dimensions of the field youre playing on, you can modify the 'myField' variable.

```
const myField = new Field(Field.generateField(10, 5, 20))
```

- 'new Field' declares a new field object, and as it's field parameter, you input the Field.generate function
- Field.generate() takes 3 arguements: the width and height of the field (required parameters) and the percentage of the field that should be holes (default is set to 20).
- Update the Field.generate() arguments to make the field bigger, smaller, or have a larger percentage of holes.
