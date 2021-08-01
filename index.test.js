const index = require('./index.js');
/*
test('Test simple chargement du fichier', () => {
  expect(index.test()).toBe("OK");
});*/


test('Test du sudoku 4x4', () => {
	let grille_a_tester = index.create_sudoku_4x4();
	expect(typeof grille_a_tester === 'object' && grille_a_tester !== null && !Array.isArray(grille_a_tester)).toBe(true);
	expect(Array.isArray(grille_a_tester.full_grid)).toBe(true);
	expect(Array.isArray(grille_a_tester.grid_with_holes)).toBe(true);
	expect(grille_a_tester.largeur).toBe(4);
	expect(grille_a_tester.hauteur).toBe(4);
});

test('Test du sudoku 9x9 (object)', () => {
	let grille_a_tester = index.create_sudoku_9x9(true);
	expect(typeof grille_a_tester === 'object' && grille_a_tester !== null && !Array.isArray(grille_a_tester)).toBe(true);
	expect(Array.isArray(grille_a_tester.full_grid)).toBe(true);
	expect(Array.isArray(grille_a_tester.grid_with_holes)).toBe(true);
	expect(grille_a_tester.largeur).toBe(9);
	expect(grille_a_tester.hauteur).toBe(9);
});