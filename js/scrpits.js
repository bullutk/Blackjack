//----------------------
// ----GLOBALS----------
//----------------------

var theDeck = createDeck();
var playersHand = [] //player1Squares in tictactoe
var dealersHand = [] //player2Squares in tictactoe
// var topOfDeck = 4; Could use without shift 

$(document).ready(function(){

	$('.reset-game').click(function(){
		reset();
	});

	$('.deal-button').click(function(){
		reset();
		//Deal stuff goes in here
		shuffleDeck(); //Deck is now shuffled!
		// Update player array and DOM
		//Use shift to remove the top card from the deck.
		// Shift returns the element removed, so push .shift() onto the hand

		playersHand.push(theDeck.shift()); 
		dealersHand.push(theDeck.shift()); 
		playersHand.push(theDeck.shift()); 
		dealersHand.push(theDeck.shift());

		placeCard('player',1,playersHand[0]);
		placeCard('player',2,playersHand[1]);

		// Update dealer array and DOM
		placeCard('dealer',1,dealersHand[0]);
		placeCard('dealer',2,'deck');

		calculateTotal(playersHand,'player');
		calculateTotal(dealersHand,'dealer');


	});

	$('.hit-button').click(function(){
		// console.log(calculateTotal(playersHand,'player'));
		// var whatThePlayerHas = Number($('.player.total-number').text)
		if(calculateTotal(playersHand,'player') < 21){
			playersHand.push(theDeck.shift());
			var lastCardIndex = playersHand.length-1;
			var slotForNewCard = playersHand.length;
			placeCard('player',slotForNewCard,playersHand[lastCardIndex]);
			calculateTotal(playersHand, 'player');
		}
		checkWin();
	});

	$('.stand-button').click(function(){
		// stand stuff goes in here
		// What happens to player now? Nothing.
		// Control now goes to teh dealer... if dealer has less than 17, draw card.
		placeCard('dealer',2,dealersHand[1]);
		var dealerTotal = calculateTotal(dealersHand,'dealer');
		while(dealerTotal < 17){
			// Dealer has less than 17... hit away!
			dealersHand.push(theDeck.shift());
			var lastCardIndex = dealersHand.length-1;
			var slotForNewCard = dealersHand.length;
			placeCard('dealer',slotForNewCard,dealersHand[lastCardIndex]);
			dealerTotal = calculateTotal(dealersHand,'dealer');
		}
		// The dealer has 17 or more. Player hit stand. Check to see who won.
		checkWin();

	});
});

function checkWin(){
	var playerTotal = calculateTotal(playersHand,'player');
	var dealerTotal = calculateTotal(dealersHand,'dealer');

	// player has more than 21. Player busts, and loses.
	if(playerTotal > 21){
		//Player busted. Put some message in the DOM
		$('.player-total').html('Player busted, the house wins!')
	//Deler busted, player is good, player wins.
	}else if(dealerTotal > 21){
		// Player safe, dealer busts, put message in DOM
		$('.dealer-total').html('Dealer busted, Player wins!')
	//No one busted. See who is higher
	}else{
		if((playerTotal > dealerTotal) && (dealerTotal > 16)){
			// Player won. Say this somewhere in the DOM
			$('.player-total').html('Player wins!')
		}else if((dealerTotal > playerTotal) && (dealerTotal > 16)){
			// Dealer won. Say this somewhere in the DOM
			$('.dealer-total').html('House wins!')
		}else{
			// Tie (push). Say somewhere in the DOM
			$('.dealer-total').html('Tie, House wins!')
			$('.player-total').html('Tie, House wins!!')



		}
	}
}

function reset(){
	// the deck needs to be reset
	theDeck = createDeck(); 
	// the player and dealer hands need to be reset
	playersHand = [];
	dealersHand = [];
	// reset the DOM
	// - cards
	$('.card').html('');
	$('.dealer-total').html('DEALER TOTAL: <span class="dealer-total-number">0</span>')
	$('.player-total').html('PLAYER TOTAL: <span class="player-total-number">0</span>')
	// - totals
	var playerTotal = calculateTotal(playersHand,'player');
	var dealerTotal = calculateTotal(dealersHand,'dealer');

}

function createDeck(){
	var newDeck = [];
	var suits = ['h','s','d','c'];
	//suits/outter loop
	for(let s = 0; s < suits.length; s++){ 
		// card values/inner loop
		for(let c = 1; c <= 13; c++){
			newDeck.push(c+suits[s]);
		}
	}
	return newDeck;
}

function shuffleDeck(){
	for(let i = 0; i < 9001; i++){
		var random1 = Math.floor(Math.random() * theDeck.length);
		var random2 = Math.floor(Math.random() * theDeck.length);

		// switch theDeck[random1] with theDeck[random2]
		// store the value of theDeck[random1]
		var temp = theDeck[random1];

		// overwrite theDeck[random1] with theDeck[random2]
		theDeck[random1] = theDeck[random2];

		// overwrite theDeck[random2] with the temp (what used to be in random1)
		theDeck[random2] = temp;
	}
	console.log(theDeck);		
}

function placeCard(who, where, whatCard){
	var classSelector = '.' + who + '-cards .card-' + where;
						// '.' + 'player' + '-cards .card-' + 'one'
						// '.player-cards .card-one'
	$(classSelector).html('<img src="cards/' + whatCard + '.png">');
	// $('.player-cards .card-one').html('<img src="cards/2d.png">')
	// if(classSelector = 'dealer- card card-2' )
}

function calculateTotal(hand, who){
	var total = 0; // init total to 0
	var cardValue = 0 // temp var for value of current card
	for(let i = 0; i < hand.length; i++){
		//Handle the face cards!
		cardValue = Number(hand[i].slice(0,-1)); //start at 0 and copy until the last index
		if(cardValue > 10){
			cardValue = 10;
		}
		if((cardValue == 1) && (total < 11)) {
			cardValue = 11;
		}
		total += cardValue;
	}
	// Update the DOM with the new total
	var classSelector = '.'+who+'-total-number';
	$(classSelector).text(total);
	return total;
}

