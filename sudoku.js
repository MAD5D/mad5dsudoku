exports.Sudoku = function Sudoku(largeur,hauteur){
	this.largeur = largeur;
	this.hauteur = hauteur;
	this.tableau_sudoku = new Array(this.largeur*this.hauteur).fill(0);
	this.tableau_sudoku_avec_case_vide;

	this.verification_horizontal = function(tableau_a_check,tableau_valeur_possible,case_courante){
		let indice_a_enlever;
		let case_minimal_a_check = Math.floor(case_courante/this.largeur)*this.largeur;

		for(let k = 0;k < this.largeur ;k++){
			indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[case_minimal_a_check+k]);//ligne
			if(indice_a_enlever != -1){
				tableau_valeur_possible.splice(indice_a_enlever, 1);
			}
		}
	}

	this.verification_vertical = function(tableau_a_check,tableau_valeur_possible,case_courante){
		let indice_a_enlever;
		let decalage_colonne = case_courante % this.hauteur;

		for(let k = 0;k < this.hauteur ;k++){
			indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[decalage_colonne+(k*this.hauteur)]);
			if(indice_a_enlever != -1){
				tableau_valeur_possible.splice(indice_a_enlever, 1);
			}
		}
	}

	//a vérifier au niveau des hauteurs / largeurs si largeur != hauteur
	this.verification_blok = function(tableau_a_check,tableau_valeur_possible,case_courante){
		let indice_a_enlever;
		let X = Math.floor((case_courante % this.hauteur) / Math.sqrt(this.hauteur)) * Math.sqrt(this.hauteur); // Block axe X (horizontal)
		let Y = Math.floor(case_courante / this.hauteur / Math.sqrt(this.hauteur)) * Math.sqrt(this.hauteur); // Block axe Y (vertical)
		let case_depart_blok = X+(Y*this.hauteur)
		for(let k = 0; k < this.hauteur; k++){
			let l = Math.floor(k / Math.sqrt(this.hauteur));
			let m = k % Math.sqrt(this.hauteur);
			indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[case_depart_blok+m+(l*this.hauteur)]);
			if(indice_a_enlever != -1){
				tableau_valeur_possible.splice(indice_a_enlever, 1)
			}
		}
	}

	this.creer_grille = function(){
		let case_courante = 0;//const arr = new Array(81).fill(0);
		let nombre_de_case = this.largeur*this.hauteur;

		let tableau_sudoku_valeur_possible = new Array().fill(0);
		//tableau_sudoku_valeur_possible[case_courante] = [1,2,3,4,5,6,7,8,9];
		tableau_sudoku_valeur_possible[case_courante] = [];

		for(let i = 1;i <= this.hauteur;i++){//Attention : ne fonctionne que sur les sudokus de taille N*N
			tableau_sudoku_valeur_possible[case_courante].push(i);
		}

		while(case_courante < nombre_de_case){
			//Vérification horizontale
			this.verification_horizontal(this.tableau_sudoku,tableau_sudoku_valeur_possible[case_courante],case_courante);
			this.verification_vertical(this.tableau_sudoku,tableau_sudoku_valeur_possible[case_courante],case_courante);
			this.verification_blok(this.tableau_sudoku,tableau_sudoku_valeur_possible[case_courante],case_courante);

			//////FIN VERIF
			if(tableau_sudoku_valeur_possible[case_courante].length > 0){
				let chiffre = (Math.floor(Math.random() * Math.floor(tableau_sudoku_valeur_possible[case_courante].length)));
				
				this.tableau_sudoku[case_courante] = tableau_sudoku_valeur_possible[case_courante][chiffre];
				case_courante++;
				if(case_courante >= nombre_de_case){
					return true;
				}else{
					tableau_sudoku_valeur_possible[case_courante] = [];

					for(let i = 1;i <= this.hauteur;i++){//Attention : ne fonctionne que sur les sudokus de taille N*N
						tableau_sudoku_valeur_possible[case_courante].push(i);
					}
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

	this.enlever_X_case_au_hasard = function(nb_case){
		let tableau_sudoku_avec_case_vide = [ ... this.tableau_sudoku];

		let i = 0;
		while(i < nb_case){
			let case_a_vider = (Math.floor(Math.random() * this.largeur*this.hauteur));
			if(tableau_sudoku_avec_case_vide[case_a_vider] == ""){
			}
			else{
				tableau_sudoku_avec_case_vide[case_a_vider] = "";
				i++;
			}
		}
		return tableau_sudoku_avec_case_vide;
	}

	this.resoudre_le_sudoku_methode_facile = function(){
		let tableau_sudoku_avec_case_vide = [ ... this.tableau_sudoku_avec_case_vide];
		let sol_tableau_sudoku_editable = new Array(this.largeur*this.hauteur).fill(0);
		let sol_tableau_sudoku_indice_maitre = new Array(this.largeur*this.hauteur).fill(0);

		let i;
		let valeur_trouve = true;
		let nb_case_vide;
		while(valeur_trouve){
			i = 0;
			nb_case_vide = 0;
			valeur_trouve = false;
			while(i < this.largeur*this.hauteur){
				if(tableau_sudoku_avec_case_vide[i] == ""){
					sol_tableau_sudoku_indice_maitre[i] = this.valeur_possible(tableau_sudoku_avec_case_vide,i);
					nb_case_vide++;
				}
				else{
					sol_tableau_sudoku_indice_maitre[i] = 0;
				}
				i++;
			}
			i = 0;
			while(i < this.largeur*this.hauteur){
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

	this.valeur_possible = function(tableau_sudoku_avec_case_vide,case_courante){
		let indice_a_enlever;
		//let liste_valeur_possible = [1,2,3,4,5,6,7,8,9];

		let liste_valeur_possible = [];

		for(let i = 1;i <= this.hauteur;i++){//Attention : ne fonctionne que sur les sudokus de taille N*N
			liste_valeur_possible.push(i);
		}

		this.verification_horizontal(tableau_sudoku_avec_case_vide,liste_valeur_possible,case_courante);
		this.verification_vertical(tableau_sudoku_avec_case_vide,liste_valeur_possible,case_courante);
		this.verification_blok(tableau_sudoku_avec_case_vide,liste_valeur_possible,case_courante);

		return liste_valeur_possible;
	}

	this.creer_grille();

	let sudoku_realise = 0;

	while(sudoku_realise == 0){
		let tempo = "";
		if(this.largeur*this.hauteur == 81){
			this.tableau_sudoku_avec_case_vide = [ ... this.enlever_X_case_au_hasard(45)];
		}
		else if(this.largeur*this.hauteur == 16){
			this.tableau_sudoku_avec_case_vide = [ ... this.enlever_X_case_au_hasard(10)];
		}

		if(this.resoudre_le_sudoku_methode_facile() !== false){
			sudoku_realise = 1;
		}
	}
	

	return this;
}