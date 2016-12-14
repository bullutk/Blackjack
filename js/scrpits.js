var theDeck = [];
const freshDeck = createDeck();
theDeck = freshDeck;
var playersHand = [];
var dealersHand = [];//JS, wait for the dom!

$(document).ready(function(){
// -------------------------
// ---------GLOBALS---------
// -------------------------
// var theDeck = [];


// 2.Need a way to make the deck
// createDeck();

		// 1.Get deal working
		$('.deal-button').click(function(){
			//console.log(this);
			// 3.Shuffle the new deck
			shuffleDeck();
			// shift returns the element removed, so push.shift() onto the hand
			playersHand.push(theDeck.shift());
			// add card one to the dealersHand
			dealersHand.push(theDeck.shift());
			// add card two to the playersHand
			playersHand.push(theDeck.shift());
			// add card three to the dealersHand
			dealersHand.push(theDeck.shift());

			// put the first card in the players hand
			placeCard(playersHand[0], 'player', 1)
			//put the second card in the players hand
			placeCard(playersHand[1], 'player', 2)

			// put the first card in the dealers hand
			placeCard(dealersHand[0], 'dealer', 1)
			//put the second card in the dealers hand
			placeCard(dealersHand[1], 'dealer', 2)

			calculateTotal('player',playersHand);
			calculateTotal('dealer',dealersHand);



		});

		
		
		// 4.Update the DOM with the player cards

		// 5.Get hit working
		$('.hit-button').click(function(){
			if(calculateTotal('player', playersHand) < 21){
			//add a card to the JS and the DOM
			playersHand.push(theDeck.shift());
			var slotForNewCard = playersHand.length;
			var lastCardIndex = playersHand.length-1;
			placeCard(playersHand[lastCardIndex],'player', slotForNewCard);
			// update the player
			calculateTotal( 'player', playersHand);
			}
		});

		// 6.Put the card in the right place
		// 7.Update the total
		// 8.Check if the player busted
		// 9.Get stand working
		$('.stand-button').click(function(){
			// what happens to player? nothing, control now goes to dealer
			// if dealer has less than 17, dealer draws card
			var dealerTotal = calculateTotal('dealer', dealersHand)
			while(dealerTotal < 17){
				// dealer has less than 17...hit away!
				dealersHand.push(theDeck.shift());
				var slotForNewCard = dealersHand.length;
				var lastCardIndex = dealersHand.length-1;
				placeCard(dealersHand[lastCardIndex],'dealer', slotForNewCard);
				// update the dealer
				dealerTotal = calculateTotal( 'dealer', dealersHand);
			}
			// the dealer has 17 or more, player hit stand, check to see who won
			checkWin();

		});




		// console.log(theDeck)
});

// calculate face cards correctly(count as 10) 11-J, 12-Q, 13-K === 10
// calculate the proper value for ace (1 or 11)
		function placeCard(whatCard, who, whichSlot) {
			var classToTarget = '.' + who + '-cards .card-' + whichSlot;
			// console.log(classToTarget)
			$(classToTarget).html('<img src="cards/' + whatCard + '.png">');
		}

		function calculateTotal(who, theirHand){
			var cardValue = 0;
			var total = 0;
			for(let i = 0; i < theirHand.length; i++){
				cardValue = Number(theirHand[i].slice(0,-1));
				if(cardValue > 10){
					cardValue = 10;
				}
				total += cardValue
			}
			var classToTarget = '.' + who + '-total-number';
			$(classToTarget).text(total);
			return total;
		}
		function createDeck(){
		//fill the deck with
			// - 52 cards
			   // - 4 suits (h,s,d,c)
			   // - 1-13, (11=J, 12=Q, 13=K)
			   var suits = ['h', 's', 'd', 'c'];
			   // loop thru all four suits (suits array)
			   for(let s = 0; s < suits.length; s++){
			   		// loop thru all 13 cards for each suits
			   		for(let c = 1; c <= 13; c++){
			   			theDeck.push(c+suits[s]);
			   		}
			   	}
		// console.log(theDeck);
			
		}

				function checkWin(){
			playerTotal = calculateTotal('player', playersHand);
			dealerTotal = calculateTotal('dealer', dealersHand);
			if(playerTotal > 21){
				// player busted, put some message in the DOM
			//Dealer busted, player is good, player wins
			}else if(dealerTotal > 21){
				// player safe, dealer busts, put message in DOM
			// no one busted, see who is higher
			}else{
				if(playerTotal > dealerTotal){
					//player won, say this somewhere in the DOM
				}else if(dealerTotal > playerTotal){
					//dealer won, say somewhere in the DOM
				}else{
					// its a tie
				}
			}
		}

		// 10.Run the dealer “hit” until it has more than 16
		// 11.Once dealer has more than 16, checkwin
		// 12.Post a message after checkwin

		function reset(){
			// the deck needs to be reset
			theDeck = freshDeck; //make copy of constant freshDeck
			// the player and dealer hands need to be reset
			playersHand = [];
			dealersHand = [];
			// reset the DOM
			// 	-cards
			$('.card').html('');
			// 	-totals
			playerTotal = calculateTotal('player', playersHand);
			dealerTotal = calculateTotal('dealer', dealersHand);
		}



		function shuffleDeck(){
				for(let i = 0; i < 90; i++){
					var card1ToSwitch = Math.floor(Math.random() * theDeck.length);
					var card2ToSwitch = Math.floor(Math.random() * theDeck.length);
					var temp = theDeck[card1ToSwitch];
					theDeck[card1ToSwitch] = theDeck[card2ToSwitch]
					theDeck[card2ToSwitch] = temp;
					console.log(theDeck);
				}
			}