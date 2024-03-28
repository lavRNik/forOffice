function getRandomInt(max) {
    let randomNumber =  Math.floor(Math.random() * max);
    if (randomNumber % 2 === 0) {
        console.log('You win');
    } else {
        console.log('You lose');
    }
}

getRandomInt(5);