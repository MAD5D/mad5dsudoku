exports.Sudoku = function Sudoku(largeur,hauteur){
	this.largeur = largeur;
	this.hauteur = hauteur;
	this.tableau_sudoku = new Array(this.largeur*this.hauteur).fill(0);
	this.tableau_sudoku_avec_case_vide;

	this.creer_grille = function(){
		let case_courante = 0;//const arr = new Array(81).fill(0);
		
		let tableau_sudoku_valeur_possible = new Array(this.largeur*this.hauteur).fill(0);
		//tableau_sudoku_valeur_possible[case_courante] = [1,2,3,4,5,6,7,8,9];
		tableau_sudoku_valeur_possible[case_courante] = [];

		for(let i = 1;i <= this.hauteur;i++){//Attention : ne fonctionne que sur les sudokus de taille N*N
			tableau_sudoku_valeur_possible[case_courante].push(i);
		}

		while(case_courante < 81){
			//Vérification horizontale
			verification_horizontal(this.tableau_sudoku,tableau_sudoku_valeur_possible[case_courante],case_courante);
			verification_vertical(this.tableau_sudoku,tableau_sudoku_valeur_possible[case_courante],case_courante);
			verification_blok(this.tableau_sudoku,tableau_sudoku_valeur_possible[case_courante],case_courante);

			//////FIN VERIF
			if(tableau_sudoku_valeur_possible[case_courante].length > 0){
				let chiffre = (Math.floor(Math.random() * Math.floor(tableau_sudoku_valeur_possible[case_courante].length)));
				
				this.tableau_sudoku[case_courante] = tableau_sudoku_valeur_possible[case_courante][chiffre];
				case_courante++;
				if(case_courante >= 81){
					return this.tableau_sudoku;
				}else{
					tableau_sudoku_valeur_possible[case_courante] = [1,2,3,4,5,6,7,8,9];
				}
			}
			else{
				case_courante--;
				let indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(this.tableau_sudoku[case_courante]);
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1);
					this.tableau_sudoku[case_courante] = "";
				}
				else{
				}
			}
		}
	}

	function verification_horizontal(tableau_a_check,tableau_valeur_possible,case_courante){
		let indice_a_enlever;
		let case_minimal_a_check = Math.floor(case_courante/9)*9;

		for(let k = 0;k < 9 ;k++){
			indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[case_minimal_a_check+k]);//ligne
			if(indice_a_enlever != -1){
				tableau_valeur_possible.splice(indice_a_enlever, 1);
			}
		}
	}

	function verification_vertical(tableau_a_check,tableau_valeur_possible,case_courante){
		let decalage_colonne = case_courante % 9;

		for(let k = 0;k < 9 ;k++){
			indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[decalage_colonne+(k*9)]);
			if(indice_a_enlever != -1){
				tableau_valeur_possible.splice(indice_a_enlever, 1);
			}
		}
	}

	function verification_blok(tableau_a_check,tableau_valeur_possible,case_courante,affiche = false){
		let X = Math.floor((case_courante % 9) / 3) * 3; // Block axe X (horizontal)
		let Y = Math.floor(case_courante / 9 / 3) * 3; // Block axe Y (vertical)
		let case_depart_blok = X+(Y*9)
		for(let k = 0; k < 9; k++){
			let l = Math.floor(k / 3);
			let m = k % 3;
			indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[case_depart_blok+m+(l*9)]);
			if(indice_a_enlever != -1){
				tableau_valeur_possible.splice(indice_a_enlever, 1)
			}
		}
	}

	function enlever_45_case_au_hasard(tableau_sudoku){
		let tableau_sudoku_avec_case_vide = [ ... tableau_sudoku];

		let i = 0;
		while(i < 45){
			let case_a_vider = (Math.floor(Math.random() * 81));
			if(tableau_sudoku_avec_case_vide[case_a_vider] == ""){
			}
			else{
				tableau_sudoku_avec_case_vide[case_a_vider] = "";
				i++;	
			}
		}
		return tableau_sudoku_avec_case_vide;
	}

	function resoudre_le_sudoku_methode_facile(tableau_sudoku_avec_case_vide_a){
		let tableau_sudoku_avec_case_vide = [ ... tableau_sudoku_avec_case_vide_a];
		let sol_tableau_sudoku_editable = new Array(81).fill(0);
		let sol_tableau_sudoku_indice_maitre = new Array(81).fill(0);

		let i;
		let valeur_trouve = true;
		let nb_case_vide;
		while(valeur_trouve){
			i = 0;
			nb_case_vide = 0;
			valeur_trouve = false;
			while(i < 81){
				if(tableau_sudoku_avec_case_vide[i] == ""){
					sol_tableau_sudoku_indice_maitre[i] = valeur_possible(tableau_sudoku_avec_case_vide,i);
					nb_case_vide++;
				}
				else{
					sol_tableau_sudoku_indice_maitre[i] = 0;
				}
				i++;
			}
			i = 0;
			while(i < 81){
				if(Array.isArray(sol_tableau_sudoku_indice_maitre[i])){
					if(sol_tableau_sudoku_indice_maitre[i].length == 1){
						tableau_sudoku_avec_case_vide[i] = sol_tableau_sudoku_indice_maitre[i][0];
						sol_tableau_sudoku_indice_maitre[i] = 0;
						valeur_trouve = true;
					}
				}
				i++;
			}
		}

		if(nb_case_vide != 0){
			return false;
		}
		else{
			return tableau_sudoku_avec_case_vide;
		}
	}

	function valeur_possible(tableau_sudoku_avec_case_vide,case_courante){
		let indice_a_enlever;
		let liste_valeur_possible = [1,2,3,4,5,6,7,8,9];

		verification_horizontal(tableau_sudoku_avec_case_vide,liste_valeur_possible,case_courante);
		verification_vertical(tableau_sudoku_avec_case_vide,liste_valeur_possible,case_courante);
		verification_blok(tableau_sudoku_avec_case_vide,liste_valeur_possible,case_courante);

		return liste_valeur_possible;
	}

	this.creer_grille();

	let sudoku_realise = 0;

	while(sudoku_realise == 0){
		let tempo = "";		
		this.tableau_sudoku_avec_case_vide  = [ ... enlever_45_case_au_hasard(this.tableau_sudoku)];
		if(resoudre_le_sudoku_methode_facile(this.tableau_sudoku_avec_case_vide) !== false){
			sudoku_realise = 1;
		}
	}

	return this;
}