/***
 * search (grid, wordlist)
 * This function accepts a grid (a 2d array of letters)
 * and a wordlist (an array of words to search for). The function finds any words
 * that exist in the word search in any of the 8 possible directions (up, down, left, right
 * and all 4 diagonal directions). This function is case-insensitive in its matching.
 *
 * Returns: an array of words that can be found in the word search
 ***/

// row/column modifier should be [-1, 0, 1] representing direction moving
function directionalSearch(grid, wordlist, r, c, rowModifier = 0, columModifier = 0) {
    const height = grid.length;
    const width = grid[0].length;
    const wordsFound = [];
    let spacesAway = 0;
    let currentWord = ''

    while (true) {
        // Check boundaries and break if out of bounds
        if (
            r + (spacesAway * rowModifier) >= height ||
            r + (spacesAway * rowModifier) < 0 ||
            c + (spacesAway * columModifier) >= width ||
            c + (spacesAway * columModifier) < 0
        ) {
            break;
        }

        currentWord += grid[r + (spacesAway * rowModifier)][c + (spacesAway * columModifier)]
        if (wordlist.find(word => word === currentWord.toLowerCase())) {
            wordsFound.push(currentWord.toLowerCase());
        }
        spacesAway++
    }
    return wordsFound;
}

module.exports = function search(grid, wordlist) {
    const wordsFound = [];
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            wordsFound.push(directionalSearch(grid, wordlist, r, c, 1, 0)); //check for words going down
            wordsFound.push(directionalSearch(grid, wordlist, r, c, -1, 0)); // check for words going up
            wordsFound.push(directionalSearch(grid, wordlist, r, c, 0, 1)); // Check for words going right
            wordsFound.push(directionalSearch(grid, wordlist, r, c, 0, -1)); // Check for words going left 
            wordsFound.push(directionalSearch(grid, wordlist, r, c, 1, 1)); // Check for words going down/right diagonal
            wordsFound.push(directionalSearch(grid, wordlist, r, c, -1, 1)); // Check for words going up/right diagonal
            wordsFound.push(directionalSearch(grid, wordlist, r, c, -1, -1)); // Check for words going up/left diagonal
            wordsFound.push(directionalSearch(grid, wordlist, r, c, 1, -1)); // Check for words going down/left diagonal
        }
    }
    return wordsFound.flat();
}