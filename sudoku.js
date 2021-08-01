exports.Sudoku = function Sudoku(largeur,hauteur,grille = true,solution = true){
	this.largeur = largeur;
	this.hauteur = hauteur;
	this.full_grid = new Array(this.largeur*this.hauteur).fill(0);
	this.grid_with_holes = new Array();

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

	this.create_grid = function(){
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
			this.verification_horizontal(this.full_grid,tableau_sudoku_valeur_possible[case_courante],case_courante);
			this.verification_vertical(this.full_grid,tableau_sudoku_valeur_possible[case_courante],case_courante);
			this.verification_blok(this.full_grid,tableau_sudoku_valeur_possible[case_courante],case_courante);

			//////FIN VERIF
			if(tableau_sudoku_valeur_possible[case_courante].length > 0){
				let chiffre = (Math.floor(Math.random() * Math.floor(tableau_sudoku_valeur_possible[case_courante].length)));
				
				this.full_grid[case_courante] = tableau_sudoku_valeur_possible[case_courante][chiffre];
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
				let indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(this.full_grid[case_courante]);
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1);
					this.full_grid[case_courante] = "";
				}
				else{
				}
			}
		}
	}

	this.creer_grille_16 = function(){
		let case_courante = 0;
    let tableau_sudoku_valeur_possible = new Array(256).fill(0);//
    let tableau_sudoku_avec_case_vide;
    let i_max = 0;

    tableau_sudoku_valeur_possible[case_courante] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

    while(case_courante<256){

			if(i_max < case_courante){
				i_max = case_courante;
			}

			this.verification_horizontal(this.full_grid,tableau_sudoku_valeur_possible[case_courante],case_courante);
			this.verification_vertical(this.full_grid,tableau_sudoku_valeur_possible[case_courante],case_courante);
			this.verification_blok(this.full_grid,tableau_sudoku_valeur_possible[case_courante],case_courante);
			
			let indice_a_enlever;
			let possible = true;

			let colone_8 = case_courante%16;
			if(colone_8 == 8){
				let tableau_valeur_possible_etape_1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

				//Vérification honrizontale
				this.verification_horizontal(this.full_grid,tableau_valeur_possible_etape_1,case_courante);
				let tableau_valeur_possible_etape_2_1 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_2 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_3 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_4 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_5 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_6 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_7 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_8 = [ ... tableau_valeur_possible_etape_1];
				//Vérification vertical
				this.verification_vertical(this.full_grid,tableau_valeur_possible_etape_2_1,case_courante);
				this.verification_vertical(this.full_grid,tableau_valeur_possible_etape_2_2,case_courante+1);
				this.verification_vertical(this.full_grid,tableau_valeur_possible_etape_2_3,case_courante+2);
				this.verification_vertical(this.full_grid,tableau_valeur_possible_etape_2_4,case_courante+3);
				this.verification_vertical(this.full_grid,tableau_valeur_possible_etape_2_5,case_courante+4);
				this.verification_vertical(this.full_grid,tableau_valeur_possible_etape_2_6,case_courante+5);
				this.verification_vertical(this.full_grid,tableau_valeur_possible_etape_2_7,case_courante+6);
				this.verification_vertical(this.full_grid,tableau_valeur_possible_etape_2_8,case_courante+7);

				let tableau_valeur_possible_final = tableau_valeur_possible_etape_2_1.concat(tableau_valeur_possible_etape_2_2,tableau_valeur_possible_etape_2_3,tableau_valeur_possible_etape_2_4,tableau_valeur_possible_etape_2_5,tableau_valeur_possible_etape_2_6,tableau_valeur_possible_etape_2_7,tableau_valeur_possible_etape_2_8);

				let tableau_valeur_possible_final_bis = [...new Set(tableau_valeur_possible_final)];
				tableau_valeur_possible_final_bis.sort(function(a, b) {
				  return a - b;
				});

				let tableau_valeur_possible_etape_3_1 = [ ... tableau_valeur_possible_final_bis];
				let tableau_valeur_possible_etape_3_2 = [ ... tableau_valeur_possible_final_bis];
				
				//vérification blok
				this.verification_blok(this.full_grid,tableau_valeur_possible_etape_3_1,case_courante);
				this.verification_blok(this.full_grid,tableau_valeur_possible_etape_3_2,case_courante+4);

				let tableau_valeur_possible_final_3 = tableau_valeur_possible_etape_3_1.concat(tableau_valeur_possible_etape_3_2);

				let tableau_valeur_possible_final_3_bis = [...new Set(tableau_valeur_possible_final_3)];
				if(tableau_valeur_possible_final_3_bis.length >= 8){

				}
				else{
					possible = false;
				}
			}

			let colone_4 = case_courante%16;

      if(colone_4 == 12){
        let tableau_valeur_possible_etape_1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

        //Vérification honrizontale
        this.verification_horizontal(this.full_grid,tableau_valeur_possible_etape_1,case_courante);
        let tableau_valeur_possible_etape_2_1 = [ ... tableau_valeur_possible_etape_1];
        let tableau_valeur_possible_etape_2_2 = [ ... tableau_valeur_possible_etape_1];
        let tableau_valeur_possible_etape_2_3 = [ ... tableau_valeur_possible_etape_1];
        let tableau_valeur_possible_etape_2_4 = [ ... tableau_valeur_possible_etape_1];

        //Vérification vertical
        this.verification_vertical(this.full_grid,tableau_valeur_possible_etape_2_1,case_courante);
        this.verification_vertical(this.full_grid,tableau_valeur_possible_etape_2_2,case_courante+1);
        this.verification_vertical(this.full_grid,tableau_valeur_possible_etape_2_3,case_courante+2);
        this.verification_vertical(this.full_grid,tableau_valeur_possible_etape_2_4,case_courante+3);

        let tableau_valeur_possible_final = tableau_valeur_possible_etape_2_1.concat(tableau_valeur_possible_etape_2_2,tableau_valeur_possible_etape_2_3,tableau_valeur_possible_etape_2_4);

        let tableau_valeur_possible_final_bis = [...new Set(tableau_valeur_possible_final)];
        tableau_valeur_possible_final_bis.sort(function(a, b) {
          return a - b;
        });

        let tableau_valeur_possible_etape_3_1 = [ ... tableau_valeur_possible_final_bis];
        let tableau_valeur_possible_etape_3_2 = [ ... tableau_valeur_possible_final_bis];

        //vérification blok
        this.verification_blok(this.full_grid,tableau_valeur_possible_etape_3_1,case_courante);

        let tableau_valeur_possible_final_3 = tableau_valeur_possible_etape_3_1;
        let tableau_valeur_possible_final_3_bis = [...new Set(tableau_valeur_possible_etape_3_1)];

        if(tableau_valeur_possible_final_3_bis.length >= 4){

        }
        else{
          possible = false;
        }
      }

			//////FIN VERIF
			if(tableau_sudoku_valeur_possible[case_courante].length > 0 && possible){
				let chiffre = (Math.floor(Math.random() * Math.floor(tableau_sudoku_valeur_possible[case_courante].length)));
				
				this.full_grid[case_courante] = tableau_sudoku_valeur_possible[case_courante][chiffre];
				case_courante++;
				if(case_courante >= 256){
					//clearInterval(interval_a_stop);
				}else{
					tableau_sudoku_valeur_possible[case_courante] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
				}
			}
			else{
				if((case_courante%16) == 0 /*&& (i_max-case_courante) < 4*/){
					case_courante = case_courante - 16;

					i_max = case_courante;

					indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(this.full_grid[case_courante]);
					if(indice_a_enlever != -1){
						tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1);
            this.full_grid[case_courante] = "";
            this.full_grid[case_courante+1] = "";
            this.full_grid[case_courante+2] = "";
            this.full_grid[case_courante+3] = "";
            this.full_grid[case_courante+4] = "";
            this.full_grid[case_courante+5] = "";
            this.full_grid[case_courante+6] = "";
            this.full_grid[case_courante+7] = "";
            this.full_grid[case_courante+8] = "";
            this.full_grid[case_courante+9] = "";
            this.full_grid[case_courante+10] = "";
            this.full_grid[case_courante+11] = "";
            this.full_grid[case_courante+12] = "";
            this.full_grid[case_courante+13] = "";
            this.full_grid[case_courante+14] = "";
            this.full_grid[case_courante+15] = "";
            this.full_grid[case_courante+16] = "";
					}
				}
				else if((case_courante%16) == 0 && (i_max-case_courante) < 8){
					case_courante = case_courante - 9;

					i_max = case_courante;

					indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_courante]);
					if(indice_a_enlever != -1){
						tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1);
						tableau_sudoku[case_courante] = "";
            tableau_sudoku[case_courante+1] = "";
            tableau_sudoku[case_courante+2] = "";
            tableau_sudoku[case_courante+3] = "";
            tableau_sudoku[case_courante+4] = "";
            tableau_sudoku[case_courante+5] = "";
            tableau_sudoku[case_courante+6] = "";
            tableau_sudoku[case_courante+7] = "";
            tableau_sudoku[case_courante+8] = "";
            tableau_sudoku[case_courante+9] = "";
            tableau_sudoku[case_courante+10] = "";
            tableau_sudoku[case_courante+11] = "";
            tableau_sudoku[case_courante+12] = "";
            tableau_sudoku[case_courante+13] = "";
					}
				}
				else{
					case_courante--;
					indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(this.full_grid[case_courante]);
					if(indice_a_enlever != -1){
						tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1);
						this.full_grid[case_courante] = "";
					}
				}
			}
    }
	}

	this.enlever_X_case_au_hasard = function(nb_case){
		let tableau_sudoku_avec_case_vide = [ ... this.full_grid];

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

	this.create_empty_case = function(){
		if(this.largeur*this.hauteur == 81){
			this.grid_with_holes = [ ... this.enlever_X_case_au_hasard(55)];
		}
		else if(this.largeur*this.hauteur == 16){
			this.grid_with_holes = [ ... this.enlever_X_case_au_hasard(10)];
		}
	}

	this.solve = function(solution_deja_existante = false){
		if(this.grid_with_holes.length == this.largeur*this.hauteur){
			let resultat = this.resoudre_le_sudoku_methode_facile();
			let ii = 0;
			while(resultat[0] == false && ii < 11){
				//console.log('!!!!!!!!!!!!!!!!!!!');
				//console.log(resultat[0]);
				//console.log(resultat[1]);
				//remplir un chiffre 'au hazard'
				if(solution_deja_existante){
					let i = 0;
					let liste_indice_case_vide = new Array();
					while(i < this.grid_with_holes.length){
						if(resultat[1][i] == ''){
							liste_indice_case_vide.push(i);
						}
						i++;
					}
					let indice_triche = liste_indice_case_vide[Math.floor(Math.random() * liste_indice_case_vide.length)];
					this.grid_with_holes[indice_triche] = this.full_grid[indice_triche];
					resultat[1][indice_triche] = this.full_grid[indice_triche];

					resultat = this.resoudre_le_sudoku_methode_facile(resultat[1]);
				}
				ii++;
			}

			if(ii >= 10){
				//console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
				//console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
			}

			//console.log(this.grid_with_holes);
			/*if(resultat[0] == false){
				this.resoudre_le_sudoku_methode_force_brut();
			}*/

			return resultat;	
		}
		else{
			console.log(`No sudoku.`);
			return false;
		}
		
	}

	this.resoudre_le_sudoku_methode_force_brut = function(){
		
		console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

		let liste_tableau_de_valeur_possible = new Array();

		let copie_sudoku_a_resoudre = [... this.grid_with_holes];

		let nombre_de_case = this.largeur*this.hauteur;
		let nb_case_vide = 0;
		let liste_indice_case_vide
		let i = 0;
		while(i < nombre_de_case){
			if(copie_sudoku_a_resoudre[i] == ''){
				nb_case_vide ++;
			}
			i++;
		}

		//let case_courante = 0;

		//let tableau_sudoku_valeur_possible = new Array().fill(0);
		//tableau_sudoku_valeur_possible[case_courante] = this.valeur_possible(copie_sudoku_a_resoudre,case_courante);
		
	}

	this.resoudre_le_sudoku_methode_facile = function(grille_personalise = false){
		//console.log(grille_personalise);
		let tableau_sudoku_avec_case_vide;
		if(grille_personalise !== false){
			tableau_sudoku_avec_case_vide = [ ... grille_personalise];
			//console.log(tableau_sudoku_avec_case_vide);
		}
		else{
			tableau_sudoku_avec_case_vide = [ ... this.grid_with_holes];	
		}
		
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

		//A surveiller.
		if(nb_case_vide != 0){
			return [false,tableau_sudoku_avec_case_vide];
		}
		else{
			this.full_grid = [... tableau_sudoku_avec_case_vide];
			return [true,tableau_sudoku_avec_case_vide];
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

	if(this.largeur == 16){
		//Génération de la grille 16x16
		//Même algo que pour le 4x4 et le 9x9 mais avec optimisation.
    this.creer_grille_16();

    let sudoku_realise = 0;

    while(sudoku_realise == 0){
    	let tempo = "";
    	this.grid_with_holes = [ ... this.enlever_X_case_au_hasard(120)];

    	if(this.solve()[0] !== false){
    		sudoku_realise = 1;
    	}
    }
	}
	else{
		if(grille){
			this.create_grid();	
		}

		if(solution && grille){

			let sudoku_realise = 0;

			while(sudoku_realise == 0){
				let tempo = "";
				this.create_empty_case();

				if(this.solve(true)[0] !== false){
					sudoku_realise = 1;
				}
			}
		}		
	}

	return this;
}