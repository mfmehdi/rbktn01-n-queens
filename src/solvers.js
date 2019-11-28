/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n : n}); //fixme
	
	function innerFunction(startingRow, startingCol){
		startingRow = startingRow || 0;
		startingCol = startingCol || 0;

		if(startingRow === n){
			return solution
		}
		solution.togglePiece(startingRow, startingCol);
		startingRow++;
		startingCol++;

		return innerFunction(startingRow, startingCol)

	}

var solution= innerFunction(0,0);
console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.attributes));

return Object.values(solution.attributes).slice(0, this.length -1);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined;
   //fixme
   function innerFunction(n){
   	if(n === 1){
   		return 1;
   	}
   	return n * innerFunction(n-1)
   }
   solutionCount = innerFunction(n)
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
   var board = new Board({n : n}); //fixme
var solution =0
   countNQueensSolutions(n,function(a){
   	solution= _.map(a.rows(),function(row){
   		console.log("===> "+ a)
   			console.log( a)
   		return row.slice() 
   	})|| board.rows()
   })


 console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n,callback) {
var solutionCount = 0; //fixme
var board = new Board({n : n});

function innerFunction (board ,row, callback){
callback = callback || console.log
if(row === n){
	solutionCount++;
	callback(board);
	return;
}

	for (var i = 0; i < n; i++) {
		board.togglePiece(row,i);

		if(!board.hasAnyQueensConflicts()){
			innerFunction (board ,row+1,callback)	
		}
		board.togglePiece(row,i);
	}
}

innerFunction (board ,0,callback)
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
