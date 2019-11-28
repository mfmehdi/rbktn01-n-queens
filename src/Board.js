// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
    	var nbOfOne=0;
    	var row = this.get(rowIndex);
    	for(var i = 0; i < row.length; i++){
    		nbOfOne += row[i];
    		if(nbOfOne > 1){
    			return true
    		}
    	}
    	return false
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
    	var rows = this.rows();
    	for(var rowIndex = 0; rowIndex < rows.length; rowIndex++){
    		if(this.hasRowConflictAt(rowIndex)){
    			return true
    		}
    	}
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
    	var rows = this.rows();
    	var nbOfOne = 0;
    	for (var rowIndex = 0; rowIndex < rows.length; rowIndex++){
    		nbOfOne += rows[rowIndex][colIndex];
    		if(nbOfOne > 1){
    			return true;
    		}
    	}
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
    	var col = this.rows()[0].length;
    	for (var i = 0; i < col; i++){
    		if(this.hasColConflictAt(i)){
    			return true;
    		}
    	}
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
    // 	var rows = this.rows();
    // 	var majorDi = Math.abs(majorDiagonalColumnIndexAtFirstRow);
    // 	var nbOfOne = 0;
    // 	var col = 0;
    // 	for (var i = majorDi; i < rows.length; i++) {
    // 		console.log('row = '+ i, 'col ='+col , 'major =' + majorDiagonalColumnIndexAtFirstRow, 'value = ' +rows[i][col])
    // 		nbOfOne += rows[i][col];
    // 		col++;
    // 		if(nbOfOne > 1){
    // 			return true;
    // 		}
    // 	}
    //   return false; // fixme
    // },

		hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow ) {
			
		    	var rows = this.rows();
		    	var majorDi = majorDiagonalColumnIndexAtFirstRow;
		    	var col = majorDi;
		    	var i = 0;
		    	var nbOfOne = 0;
		    	
		    	if(majorDi < 0){
		    		i = Math.abs(majorDiagonalColumnIndexAtFirstRow);
		    		col = 0;
		    	}
		    	for (i; i < rows.length; i++) {
		    		//console.log('row = '+ i, 'col ='+col , 'major =' + majorDiagonalColumnIndexAtFirstRow, 'value = ' +rows[i][col])
		    		nbOfOne += rows[i][col];
		    		col++;
		    		if(nbOfOne > 1){
		    			return true;
		    		}
		    	}
		      return false; // fixme
		    },
    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
    	var col = this.rows().length;

    	for (var i = (col*-1); i < col; i++){
    		if(this.hasMajorDiagonalConflictAt(i)){
    			return true;
    		}
    	}
      return false; // fixme

    },
    



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

    	//console.log("--- "+ minorDiagonalColumnIndexAtFirstRow)
	  var rows = this.rows(); 
	  var nbOfOne=0;
	  var minorD=minorDiagonalColumnIndexAtFirstRow;
	  var col = minorD 
	  var i = 0;

	  if(minorDiagonalColumnIndexAtFirstRow > rows.length-1){
	  	minorD-=rows.length-1;
	  	i = minorD;
	  	col = rows.length-1
	  }
    	for (i; i < rows.length; i++) {
    	nbOfOne+= rows[i][col];
    	col--;
    	if(nbOfOne > 1)
    		return true
    	}
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
    	var rows = this.rows();
    	for(var i = 0; i < (rows.length - 1) * 2; i++){
    		if(this.hasMinorDiagonalConflictAt(i)){
    			return true
    		}
    	}
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
