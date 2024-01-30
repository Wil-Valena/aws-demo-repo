document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-btn');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    const cardArray = [
        { name: 'card01', img: 'images/ca.png' },
        { name: 'card01', img: 'images/ca.png' },
        { name: 'card02', img: 'images/da.png' },
        { name: 'card02', img: 'images/da.png' },
        { name: 'card03', img: 'images/sa.png' },
        { name: 'card03', img: 'images/sa.png' },
        { name: 'card04', img: 'images/ha.png' },
        { name: 'card04', img: 'images/ha.png' },
        { name: 'card05', img: 'images/ck.png' },
        { name: 'card05', img: 'images/ck.png' },
        { name: 'card06', img: 'images/dk.png' },
        { name: 'card06', img: 'images/dk.png' },
        { name: 'card07', img: 'images/sk.png' },
        { name: 'card07', img: 'images/sk.png' },
        { name: 'card08', img: 'images/hk.png' },
        { name: 'card08', img: 'images/hk.png' }        
        // { name: 'card09', img: 'images/cq.png' },
        // { name: 'card09', img: 'images/cq.png' },
        // { name: 'card10', img: 'images/dq.png' },
        // { name: 'card10', img: 'images/dq.png' }
        // { name: 'card11', img: 'images/sq.png' },
        // { name: 'card11', img: 'images/sq.png' },
        // { name: 'card12', img: 'images/hq.png' },
        // { name: 'card12', img: 'images/hq.png' },        
        // { name: 'card13', img: 'images/cj.png' },
        // { name: 'card13', img: 'images/cj.png' },
        // { name: 'card14', img: 'images/dj.png' },
        // { name: 'card14', img: 'images/dj.png' },
        // { name: 'card15', img: 'images/sj.png' },
        // { name: 'card15', img: 'images/sj.png' },
        // { name: 'card16', img: 'images/hj.png' },
        // { name: 'card16', img: 'images/hj.png' }
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
               setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    startButton.addEventListener('click', createBoard);
});
