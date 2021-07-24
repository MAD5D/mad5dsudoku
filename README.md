
# sudoku (from MAD5D)


Sudoku generator [node.js]

## Installation

``` bash
	$ npm install mad5dsudoku
```

## Usage

``` javascript
	const sudoku = require('mad5dsudoku');
	
	//Create full random 9x9 sudoku
	let double_tableau = sudoku.creer_combo_sudoku();
	//Create a full random 4x4 sudoku
	let double_tableau = sudoku.creer_combo_sudoku_4_4();
	//Create a full random 16x16 sudoku
	let double_tableau = sudoku.creer_combo_sudoku_16_16();

	//Create a PARTIAL random 36x36 sudoku
	//Be carefull, it's very envy for the CPU. Optimization in progress.
	let double_tableau = sudoku.creer_combo_sudoku_36_36();

	puzzle     = double_tableau[1];
	solution   = double_tableau[0];
```



## License
Copyright 2021, Marc-Antoine DROUIN.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
