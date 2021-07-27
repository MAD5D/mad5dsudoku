const index = require('./index.js');

test('Test simple chargement du fichier', () => {
  expect(index.test()).toBe("OK");
});


test('Test du sudoku 4x4', () => {
	let grille_a_tester = index.creer_combo_sudoku_4_4();
	expect(typeof grille_a_tester === 'object' && grille_a_tester !== null && !Array.isArray(grille_a_tester)).toBe(true);
	expect(Array.isArray(grille_a_tester.tableau_sudoku)).toBe(true);
	expect(Array.isArray(grille_a_tester.tableau_sudoku_avec_case_vide)).toBe(true);
	expect(grille_a_tester.largeur).toBe(4);
	expect(grille_a_tester.hauteur).toBe(4);
});

test('Test du sudoku 9x9 (object)', () => {
	let grille_a_tester = index.creer_combo_sudoku(true);
	expect(typeof grille_a_tester === 'object' && grille_a_tester !== null && !Array.isArray(grille_a_tester)).toBe(true);
	expect(Array.isArray(grille_a_tester.tableau_sudoku)).toBe(true);
	expect(Array.isArray(grille_a_tester.tableau_sudoku_avec_case_vide)).toBe(true);
	expect(grille_a_tester.largeur).toBe(9);
	expect(grille_a_tester.hauteur).toBe(9);
});

test('Test du sudoku 9x9 (tableau)', () => {
	let grille_a_tester = index.creer_combo_sudoku();
	expect(Array.isArray(grille_a_tester)).toBe(true);
	expect(Array.isArray(grille_a_tester[0])).toBe(true);
	expect(Array.isArray(grille_a_tester[1])).toBe(true);
});