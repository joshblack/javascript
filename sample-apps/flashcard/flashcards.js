// Require our node module to read user input from STDIN and STDOUT
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout),
    user = new User();

// Write our intro messages
write("Welcome to the flashcard application!");
write("What would you like to do?");

// Setup the prompt style
rl.setPrompt('$ ');
rl.prompt();

// Listen to 'return' event from User
rl.on('line', function(response) {

    // Help options
    if (response === "help") {
        write("You can perform the following actions:");
        write("1) Add deckName Deck");
        write("2) Add flashcard-front/flashcard-back flashcard to deckName Deck");
        write("3) Remove deckName Deck");
        write("4) Remove flashcard-front/flashcard-back flashcard from deckName Deck");

        write("You have the following decks:");
        user.decks.forEach(function(deck) {
            write("Deck name: " + deck.name + " (" + deck.flashcards.length + " card(s))");
        });
    }
    else if (response === "exit" || response === "close") {
        // Close our prompt
        rl.close();
    }
    else {
        // Interpret the response and assign it to an action
        var responseAction = new Response(response.trim());

        // Execute our action
        responseAction.execute();
    }

    // Prompt for more input
    rl.prompt();

}).on('close', function() {
    write('Goodbye!');
    process.exit(0);
});

/**
 * User class, used as a persistence layer for our Decks
 *
 */
function User() {
    this.decks = [];

    this.addDeck = function(deck) {
        return this.decks.push(deck);
    }

    this.removeDeck = function(deck) {
        return this.decks.splice(this.decks.indexOf(deck), 1);
    }

    this.findDeck = function(deckName) {
        var deck = null;

        for (var i = 0; i < this.decks.length; i++) {
            if (this.decks[i].name === deckName) {
                deck = this.decks[i];
                break;
            }
        }

        return deck;
    }
};

/**
 * Deck class, used as a persistence layer for our Flashcards
 *
 */
function Deck(name) {
    this.name = name;
    this.flashcards = [];

    this.addFlashcard = function(flashcard) {
        return this.flashcards.push(flashcard);
    }

    this.removeFlashcard = function(flashcard) {
        return this.flashcards.splice(this.flashcards.indexOf(flashcard), 1);
    }
};

/**
 * Flashcard class, used to hold information about a specific flashcard
 *
 */
function Flashcard(front, back, deck) {
    this.front = front;
    this.back = back;
    this.deck = deck;
};

// Implementation of ES6 contains function
String.prototype.contains = function() {
    return String.prototype.indexOf.apply( this, arguments ) !== -1;
};

/**
 * Response class used to interpet user input
 *
 */
function Response(query) {
    this.actionType = findActionTypeOf(query);
    this.deck = determineDeckOf(query);
    this.flashcard = getFlashcardValue(query);

    this.execute = function() {
        return (this.actionType === 'add') ? addAction(this.deck, this.flashcard) : removeAction(this.deck, this.flashcard);
    };

    function findActionTypeOf(response) {
        return (response.contains('Add')) ? 'add' : 'remove';
    };

    function findDeckName(query) {
        var wordsInQuery = getWordsInQuery(query);
        return wordsInQuery[wordsInQuery.indexOf("Deck") - 1];
    };

    function determineDeckOf(query) {
        var deckName = findDeckName(query);
        return user.findDeck(deckName) || new Deck(deckName);
    };

    function getFlashcardValue(query) {
        var wordsInQuery = getWordsInQuery(query),
            flashcardText = wordsInQuery[wordsInQuery.indexOf('flashcard') - 1],
            flashcardPair = (flashcardText) ? flashcardText.split('/') : undefined;

        return (flashcardPair) ? (new Flashcard(flashcardPair[0], flashcardPair[1], this.deck)) : undefined;
    };

    function getWordsInQuery(query) {
        return query.split(' ');
    };

    function addAction(deck, flashcard) {
        return (flashcard) ? (deck.addFlashcard(flashcard)) : (user.addDeck(deck));
    };

    function removeAction(deck, flashcard) {
        return (flashcard)
            ? user.findDeck(deck.name).removeFlashcard(flashcard)
            : user.removeDeck(deck);
    };
};

function write(text) {
    return process.stdout.write(text + "\n");
}