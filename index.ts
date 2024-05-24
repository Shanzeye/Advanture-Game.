#! /usr/bin/env node
 
import inquirer from "inquirer";


// Define the player object with initial health and an empty inventory
interface Player {
    name: string;
    health: number;
    inventory: string[];
}

// Initialize the player with default values
let player: Player = {
    name: '',
    health: 100,
    inventory: []
};

// Define the main game loop
async function startGame() {
    console.log("Welcome to the Text Adventure Game!");

    const playerName = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is your name?'
    });
    player.name = playerName.name;

    console.log(`Hello, ${player.name}!`);

    await explore();

    console.log('Game over.');
}

// Function to handle exploration
async function explore() {
    console.log('You are in a forest. You can go left, right, or straight.');

    const direction = await inquirer.prompt({
        type: 'list',
        name: 'direction',
        message: 'Which direction do you want to go?',
        choices: ['Left', 'Right', 'Straight']
    });

    switch (direction.direction) {
        case 'Left':
            console.log('You find a treasure chest!');
            player.inventory.push('Gold');
            console.log(`You obtained some Gold! Current inventory: ${player.inventory.join(', ')}`);
            break;
        case 'Right':
            console.log('You encounter a monster!');
            const fight = await inquirer.prompt({
                type: 'confirm',
                name: 'fight',
                message: 'Do you want to fight?'
            });
            if (fight.fight) {
                console.log('You defeated the monster!');
            } else {
                console.log('You fled from the monster!');
            }
            break;
        case 'Straight':
            console.log('You find a potion!');
            player.health += 20;
            console.log(`You drink the potion and restore 20 health. Current health: ${player.health}`);
            break;
    }
}

// Start the game
startGame();



