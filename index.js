exports.test = function() {
  console.log("Ok");
}
/*exports.printMsg = function() {
  console.log("This is a message from the demo package");
}
exports.printMsg2 = function() {
  console.log("lo...LI.....POOOOOOOOOOOOOOOOOP");
}*/


exports.creer_combo_sudoku_36_36 = function(){
	let grille_4x4 = creer_combo_sudoku_4_4_f()[0];
	let grille_9x9 = creer_combo_sudoku_f()[0];

	let N = 2;
	let M = 3;
	let X = new Array();
	let Y = new Array();
	let Z = new Array();
	let R = new Array();

	let A_text = grille_4x4;
	let B_text = grille_9x9;

	let ZZ;

	//Définition du premier sudoku représenté en quattre dimention.
	ZZ = 0;
	for (let I1 = 0; I1 < N; I1++) {
		X[I1] = new Array();
		for (let I2 = 0; I2 < N; I2++) {
			X[I1][I2] = new Array();
			for (let J1 = 0; J1 < N; J1++) {
				X[I1][I2][J1] = new Array();
				for (let J2 = 0; J2 < N; J2++) {
					X[I1][I2][J1][J2] = A_text[ZZ]-1;
					ZZ++;
				}
			}
		}
	}

	//Définition du deuxième sudoku représenté en quattre dimention.
	ZZ = 0;
	for (let I1 = 0; I1 < M; I1++) {
		Y[I1] = new Array();
		for (let I2 = 0; I2 < M; I2++) {
			Y[I1][I2] = new Array();
			for (let J1 = 0; J1 < M; J1++) {
				Y[I1][I2][J1] = new Array();
				for (let J2 = 0; J2 < M; J2++) {
					Y[I1][I2][J1][J2] = B_text[ZZ]-1;
					ZZ++;
	    	}
	    }
		}
	}

	//Préparation du tableau en 4D représentant le sudoku final.
	for (let I1 = 0; I1 < (N*M); I1++) {
		Z[I1] = new Array();
		for (let I2 = 0; I2 < (N*M); I2++) {
			Z[I1][I2] = new Array();
			for (let J1 = 0; J1 < (N*M); J1++) {
				Z[I1][I2][J1] = new Array();
			}
		}
	}

	//Creation du sudoku final en 4 dimensions.
	for (let I1 = 0; I1 < N; I1++) {
		for (let I2 = 0; I2 < N; I2++) {
			for (let J1 = 0; J1 < N; J1++) {
				for (let J2 = 0; J2 < N; J2++) {
	        for (let U1 = 0; U1 < M; U1++) {
						for (let U2 = 0; U2 < M; U2++) {
							for (let V1 = 0; V1 < M; V1++) {
								for (let V2 = 0; V2 < M; V2++) {
                  let X1 = (I1*M)+U1;
                  let X2 = (I2*M)+U2;
                  let Y1 = (J1*M)+V1;
                  let Y2 = (J2*M)+V2;
                  Z[X1][X2][Y1][Y2] = X[I1][I2][J1][J2]*M*M+Y[U1][U2][V1][V2];
                }
              }
            }
          }
        }
      }
    }
	}

	//Transformation de la 4D à la 1D
	ZZ = 0;
	for (let I1 = 0; I1 < (N*M); I1++) {
		for (let I2 = 0; I2 < (N*M); I2++) {
			for (let J1 = 0; J1 < (N*M); J1++) {
				for (let J2 = 0; J2 < (N*M); J2++) {
					R[ZZ] = Z[I1][I2][J1][J2];
					ZZ++;
				}
			}
		}
	}

	function melanger_grille(){
		melanger_groupe_ligne();
		melanger_groupe_colone();
	}

	function melanger_groupe_ligne(){
		//mélange de la première ligne.

		let i = 0;
		let j = 0;
		let k = 0;
		
		while(k < 6){
			while(j < 6){
				decalage_ligne_de_depart = j*36+(k*36*6);
				let ligne_de_remplacement = Math.floor(Math.random() * 6);
				let decalage_ligne_de_remplacement = ligne_de_remplacement*36+(k*36*6);
				while(i < 36){
					let temp = R[i+decalage_ligne_de_depart];
					R[i+decalage_ligne_de_depart] = R[i+decalage_ligne_de_remplacement];
					R[i+decalage_ligne_de_remplacement] = temp;
					i++;
				}
				i=0;
				j++;
			}
			j=0;
			k++;
		}
	}

	function melanger_groupe_colone(){
		let i = 0;
		let j = 0;
		let k = 0;

		while(k < 6){
			while(j < 6){
				let colone_de_remplacement = Math.floor(Math.random() * 6)-j;
				let decalage_colone_de_remplacement = colone_de_remplacement*36;
				while(i < 36){
					let temp = R[i*36+j+(k*6)];
					R[i*36+j+(k*6)] = R[i*36+j+(k*6)+colone_de_remplacement];
					R[i*36+j+(k*6)+colone_de_remplacement] = temp;
					i++;
				}
				i=0;
				j++;
			}
			j=0;
			k++;
		}
	}

	melanger_grille();


	let tableau_sudoku_avec_case_vide = new Array();
	etape_enlevage_de_case();

	function etape_enlevage_de_case(){
		tableau_sudoku_avec_case_vide = [ ... R];

		let i = 0;
		let nombre_case_max_a_enlecer = 550;
		while(i < nombre_case_max_a_enlecer){
			let case_a_vider = (Math.floor(Math.random() * 1296));
			if(tableau_sudoku_avec_case_vide[case_a_vider] == ""){
			}
			else{
				tableau_sudoku_avec_case_vide[case_a_vider] = "";
				if(resoudre_le_sudoku_en_facile(i+1)){
					//console.log("Je confirme que je peux enlever la case");
					i++;
				}
				else{
					tableau_sudoku_avec_case_vide[case_a_vider] = R[case_a_vider];
					//console.log('Perdu !!');
					//i++;
				}
			}
		}
		//console.log('fini l\'enlevage de case');
		//console.log(tableau_sudoku_avec_case_vide);
	}

	function resoudre_le_sudoku_en_facile(nb_case_a_check = 5){
			let sol_tableau_sudoku_valeur = [ ... tableau_sudoku_avec_case_vide];
			let sol_tableau_sudoku_indice_maitre = new Array(1296).fill(0);
			let i = 0;
			let j = 0;

			let nb_chiffre_decouvert = 0;
			let nb_chiffre_decouvert_total = 0;

			let stop = 0;
		  while(!stop){
		  	let i = 0;
		  	while(i < 1296){
					if(sol_tableau_sudoku_valeur[i].toString() == ""){
						let testounet = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
						verification_horizontal(sol_tableau_sudoku_valeur,testounet,i);
						let testounet2 = [... testounet];
						
						verification_vertical(sol_tableau_sudoku_valeur,testounet2,i);
						let testounet3 = [... testounet2];

						verification_blok(sol_tableau_sudoku_valeur,testounet3,i,true);
						let testounet3b = [... testounet3];

						sol_tableau_sudoku_indice_maitre[i] = testounet3b;
						//console.log(sol_tableau_sudoku_indice_maitre[i]);
					}

					if(Array.isArray(sol_tableau_sudoku_indice_maitre[i])){
						if(sol_tableau_sudoku_indice_maitre[i].length == 1){
							sol_tableau_sudoku_valeur[i] = sol_tableau_sudoku_indice_maitre[i][0];
							sol_tableau_sudoku_indice_maitre[i] = 0;
							nb_chiffre_decouvert++;
							nb_chiffre_decouvert_total++;
						}
					}
					i++;
				}				

				if(nb_chiffre_decouvert_total == nb_case_a_check){
					stop = true;
					//console.log("nom de nombre découvert total b :" + nb_chiffre_decouvert_total);
					return true;
				}
				else if(nb_chiffre_decouvert == 0){
					stop = true;
					//console.log("nom de nombre découvert total  :" + nb_chiffre_decouvert_total);
					return false;
				}

//console.log("nom de nombre découvert :" + nb_chiffre_decouvert);
				nb_chiffre_decouvert = 0;
			}

			
		}

		function verification_horizontal(tableau_a_check,tableau_valeur_possible,case_courante){
			let indice_a_enlever;
			let case_minimal_a_check = Math.floor(case_courante/36)*36;

			for(let k = 0;k < 36 ;k++){
				indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[case_minimal_a_check+k]);
				if(indice_a_enlever != -1){
					tableau_valeur_possible.splice(indice_a_enlever, 1);
				}
			}
		}

		function verification_vertical(tableau_a_check,tableau_valeur_possible,case_courante){
			let decalage_colonne = case_courante % 36;

			for(let k = 0;k < 36 ;k++){
				indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[decalage_colonne+(k*36)]);
				if(indice_a_enlever != -1){
					tableau_valeur_possible.splice(indice_a_enlever, 1);
				}
			}
		}

		function verification_blok(tableau_a_check,tableau_valeur_possible,case_courante,affiche = false){
			let X = Math.floor((case_courante % 36) / 6) * 6; // Block axe X (horizontal)
			let Y = Math.floor(case_courante / 36 / 6) * 6; // Block axe Y (vertical)
			let case_depart_blok = X+(Y*36)
			for(let k = 0; k < 36; k++){
				let l = Math.floor(k / 6);
				let m = k % 6;
				indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[case_depart_blok+m+(l*36)]);
				if(indice_a_enlever != -1){
					tableau_valeur_possible.splice(indice_a_enlever, 1)
				}                
			}
		}


	//melanger_groupe_ligne();

	//return [grille_4x4, grille_9x9,R];
	return [R,tableau_sudoku_avec_case_vide];
}


exports.creer_combo_sudoku_4_4 = creer_combo_sudoku_4_4_f;

function creer_combo_sudoku_4_4_f(){
	function verification_horizontal(tableau_a_check,tableau_valeur_possible,case_courante){
		let indice_a_enlever;
		let case_minimal_a_check = Math.floor(case_courante/4)*4;

		for(let k = 0;k < 4 ;k++){
			indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[case_minimal_a_check+k]);
			if(indice_a_enlever != -1){
				tableau_valeur_possible.splice(indice_a_enlever, 1);
			}
		}
	}

	function verification_vertical(tableau_a_check,tableau_valeur_possible,case_courante){
		let decalage_colonne = case_courante % 4;

		for(let k = 0;k < 4 ;k++){
			indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[decalage_colonne+(k*4)]);
			if(indice_a_enlever != -1){
				tableau_valeur_possible.splice(indice_a_enlever, 1);
			}
		}
	}

	function verification_blok(tableau_a_check,tableau_valeur_possible,case_courante,affiche = false){
		let X = Math.floor((case_courante % 4) / 2) * 2; // Block axe X (horizontal)
		let Y = Math.floor(case_courante / 4 / 2) * 2; // Block axe Y (vertical)
		let case_depart_blok = X+(Y*4)
		for(let k = 0; k < 4; k++){
			let l = Math.floor(k / 2);
			let m = k % 2;
			indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[case_depart_blok+m+(l*4)]);
			if(indice_a_enlever != -1){
				tableau_valeur_possible.splice(indice_a_enlever, 1)
			}                
		}
	}

  let case_courante = 0;
  let tableau_sudoku = new Array(16).fill(0);
  let tableau_sudoku_valeur_possible = new Array(16).fill(0);
  let tableau_sudoku_valeur_editable = new Array(16).fill(0);
  let tableau_sudoku_avec_case_vide;
  let tableau_sudoku_indice_solution;
  let i_max = 0;

  tableau_sudoku_valeur_possible[case_courante] = [1,2,3,4];

  while(case_courante < 16){
  	
		verification_horizontal(tableau_sudoku,tableau_sudoku_valeur_possible[case_courante],case_courante);
		verification_vertical(tableau_sudoku,tableau_sudoku_valeur_possible[case_courante],case_courante);
		verification_blok(tableau_sudoku,tableau_sudoku_valeur_possible[case_courante],case_courante);/**/

		let indice_a_enlever;

		if(tableau_sudoku_valeur_possible[case_courante].length > 0){
			let chiffre = (Math.floor(Math.random() * Math.floor(tableau_sudoku_valeur_possible[case_courante].length)));
			tableau_sudoku[case_courante] = tableau_sudoku_valeur_possible[case_courante][chiffre];
			case_courante++;
			if(case_courante >= 16){

				let case_a_enlever = true;
				while(case_a_enlever){
					etape_enlevage_de_case();
					if(resoudre_le_sudoku_en_facile()){
						case_a_enlever = false;
						return [tableau_sudoku,tableau_sudoku_avec_case_vide];
					}
				}
			}else{
				tableau_sudoku_valeur_possible[case_courante] = [1,2,3,4];
			}
		}
		else{
			case_courante--;
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_courante]);
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1);
				tableau_sudoku[case_courante] = "";
			}
		}
  }


	function etape_enlevage_de_case(){
		tableau_sudoku_avec_case_vide = [ ... tableau_sudoku];

		let i = 0;
		let nombre_case_max_a_enlecer = 10;
		while(i < 10){
			let case_a_vider = (Math.floor(Math.random() * 16));
			if(tableau_sudoku_avec_case_vide[case_a_vider] == ""){
			}
			else{
				tableau_sudoku_avec_case_vide[case_a_vider] = "";
				i++;
			}
		}

		i = 0;
		while(i<256){
			i++;
		}
	}

	function resoudre_le_sudoku_en_facile(){


		let sol_tableau_sudoku_valeur = [ ... tableau_sudoku_avec_case_vide];
		let sol_tableau_sudoku_valeur_avec_bonus = [ ... tableau_sudoku_avec_case_vide];
		let sol_tableau_sudoku_indice_maitre = new Array(16).fill(0);
		let i = 0;
		let j = 0;

		let nb_chiffre_decouvert = 0;
		let nb_chiffre_decouvert_total = 0;

		let stop = 0;
	  while(!stop){
	  	let i = 0;
	  	while(i < 16){
				if(sol_tableau_sudoku_valeur[i] == ""){
					let testounet = [1,2,3,4];
					verification_horizontal(sol_tableau_sudoku_valeur,testounet,i);
					let testounet2 = [... testounet];

					verification_vertical(sol_tableau_sudoku_valeur,testounet2,i);
					let testounet3 = [... testounet2];

					verification_blok(sol_tableau_sudoku_valeur,testounet3,i,true);
					let testounet3b = [... testounet3];

					sol_tableau_sudoku_indice_maitre[i] = testounet3b;
				}

				if(Array.isArray(sol_tableau_sudoku_indice_maitre[i])){
					if(sol_tableau_sudoku_indice_maitre[i].length == 1){
						sol_tableau_sudoku_valeur[i] = sol_tableau_sudoku_indice_maitre[i][0];
						sol_tableau_sudoku_indice_maitre[i] = 0;
						nb_chiffre_decouvert++;
						nb_chiffre_decouvert_total++;
					}
				}
				i++;
			}				

			if(nb_chiffre_decouvert_total == 10){
				return true;
			}
			else if(nb_chiffre_decouvert == 0){
				return false;
			}

			nb_chiffre_decouvert = 0;
		}
	}
}


exports.creer_combo_sudoku_16_16 = creer_combo_sudoku_16_16_f;

function creer_combo_sudoku_16_16_f(){
	function verification_horizontal(tableau_a_check,tableau_valeur_possible,case_courante){
			let indice_a_enlever;
			let case_minimal_a_check = Math.floor(case_courante/16)*16;

			for(let k = 0;k < 16 ;k++){
				indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[case_minimal_a_check+k]);//ligne
				if(indice_a_enlever != -1){
					tableau_valeur_possible.splice(indice_a_enlever, 1);
				}
			}
		}

		function verification_vertical(tableau_a_check,tableau_valeur_possible,case_courante){
			let decalage_colonne = case_courante % 16;

			for(let k = 0;k < 16 ;k++){
				indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[decalage_colonne+(k*16)]);
				if(indice_a_enlever != -1){
					tableau_valeur_possible.splice(indice_a_enlever, 1);
				}
			}
		}

		function verification_blok(tableau_a_check,tableau_valeur_possible,case_courante,affiche = false){
			let X = Math.floor((case_courante % 16) / 4) * 4; // Block axe X (horizontal)
			let Y = Math.floor(case_courante / 16 / 4) * 4; // Block axe Y (vertical)
			let case_depart_blok = X+(Y*16)
			for(let k = 0; k < 16; k++){
				let l = Math.floor(k / 4);
				let m = k % 4;
				indice_a_enlever = tableau_valeur_possible.indexOf(tableau_a_check[case_depart_blok+m+(l*16)]);
				if(indice_a_enlever != -1){
					tableau_valeur_possible.splice(indice_a_enlever, 1)
				}                
			}
		}

    let case_courante = 0;
    let tableau_sudoku = new Array(256).fill(0);
    let tableau_sudoku_valeur_possible = new Array(256).fill(0);
    let tableau_sudoku_avec_case_vide;
    let tableau_sudoku_indice_solution;
    let i_max = 0;

    tableau_sudoku_valeur_possible[case_courante] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

    //let interval_a_stop = setInterval(function(){
    while(case_courante<256){

			if(i_max < case_courante){
				i_max = case_courante;
			}			

			verification_horizontal(tableau_sudoku,tableau_sudoku_valeur_possible[case_courante],case_courante);
			verification_vertical(tableau_sudoku,tableau_sudoku_valeur_possible[case_courante],case_courante);
			verification_blok(tableau_sudoku,tableau_sudoku_valeur_possible[case_courante],case_courante);
			
			let indice_a_enlever;
			let possible = true;

			let colone_8 = case_courante%16;
			if(colone_8 == 8){
				let tableau_valeur_possible_etape_1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

				//Vérification honrizontale
				verification_horizontal(tableau_sudoku,tableau_valeur_possible_etape_1,case_courante);
				let tableau_valeur_possible_etape_2_1 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_2 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_3 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_4 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_5 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_6 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_7 = [ ... tableau_valeur_possible_etape_1];
				let tableau_valeur_possible_etape_2_8 = [ ... tableau_valeur_possible_etape_1];
				//Vérification vertical
				verification_vertical(tableau_sudoku,tableau_valeur_possible_etape_2_1,case_courante);
				verification_vertical(tableau_sudoku,tableau_valeur_possible_etape_2_2,case_courante+1);
				verification_vertical(tableau_sudoku,tableau_valeur_possible_etape_2_3,case_courante+2);
				verification_vertical(tableau_sudoku,tableau_valeur_possible_etape_2_4,case_courante+3);
				verification_vertical(tableau_sudoku,tableau_valeur_possible_etape_2_5,case_courante+4);
				verification_vertical(tableau_sudoku,tableau_valeur_possible_etape_2_6,case_courante+5);
				verification_vertical(tableau_sudoku,tableau_valeur_possible_etape_2_7,case_courante+6);
				verification_vertical(tableau_sudoku,tableau_valeur_possible_etape_2_8,case_courante+7);

				let tableau_valeur_possible_final = tableau_valeur_possible_etape_2_1.concat(tableau_valeur_possible_etape_2_2,tableau_valeur_possible_etape_2_3,tableau_valeur_possible_etape_2_4,tableau_valeur_possible_etape_2_5,tableau_valeur_possible_etape_2_6,tableau_valeur_possible_etape_2_7,tableau_valeur_possible_etape_2_8);

				let tableau_valeur_possible_final_bis = [...new Set(tableau_valeur_possible_final)];
				tableau_valeur_possible_final_bis.sort(function(a, b) {
				  return a - b;
				});

				let tableau_valeur_possible_etape_3_1 = [ ... tableau_valeur_possible_final_bis];
				let tableau_valeur_possible_etape_3_2 = [ ... tableau_valeur_possible_final_bis];
				
				//vérification blok
				verification_blok(tableau_sudoku,tableau_valeur_possible_etape_3_1,case_courante);
				verification_blok(tableau_sudoku,tableau_valeur_possible_etape_3_2,case_courante+4);

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
        verification_horizontal(tableau_sudoku,tableau_valeur_possible_etape_1,case_courante);
        let tableau_valeur_possible_etape_2_1 = [ ... tableau_valeur_possible_etape_1];
        let tableau_valeur_possible_etape_2_2 = [ ... tableau_valeur_possible_etape_1];
        let tableau_valeur_possible_etape_2_3 = [ ... tableau_valeur_possible_etape_1];
        let tableau_valeur_possible_etape_2_4 = [ ... tableau_valeur_possible_etape_1];

        //Vérification vertical
        verification_vertical(tableau_sudoku,tableau_valeur_possible_etape_2_1,case_courante);
        verification_vertical(tableau_sudoku,tableau_valeur_possible_etape_2_2,case_courante+1);
        verification_vertical(tableau_sudoku,tableau_valeur_possible_etape_2_3,case_courante+2);
        verification_vertical(tableau_sudoku,tableau_valeur_possible_etape_2_4,case_courante+3);

        let tableau_valeur_possible_final = tableau_valeur_possible_etape_2_1.concat(tableau_valeur_possible_etape_2_2,tableau_valeur_possible_etape_2_3,tableau_valeur_possible_etape_2_4);

        let tableau_valeur_possible_final_bis = [...new Set(tableau_valeur_possible_final)];
        tableau_valeur_possible_final_bis.sort(function(a, b) {
          return a - b;
        });

        let tableau_valeur_possible_etape_3_1 = [ ... tableau_valeur_possible_final_bis];
        let tableau_valeur_possible_etape_3_2 = [ ... tableau_valeur_possible_final_bis];

        //vérification blok
        verification_blok(tableau_sudoku,tableau_valeur_possible_etape_3_1,case_courante);

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
				
				tableau_sudoku[case_courante] = tableau_sudoku_valeur_possible[case_courante][chiffre];
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
            tableau_sudoku[case_courante+14] = "";
            tableau_sudoku[case_courante+15] = "";
            tableau_sudoku[case_courante+16] = "";
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
					indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_courante]);
					if(indice_a_enlever != -1){
						tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1);
						tableau_sudoku[case_courante] = "";
					}
				}
			}
    }
//    }, 2);

		let gudule = 0;
		while(gudule < 256){
	    gudule++;
		}

		let grille_correcte = false;
		let tempous = false;
		while(!grille_correcte){
			etape_enlevage_de_case();
			tempous = resoudre_le_sudoku_en_X_etape();
			if(tempous == false){
			}
			else{
				grille_correcte = true;
				let l = 0;
				let nombre_de_case_vide = 0;
				while(l < 256){
					if(tempous[l] == ""){
						nombre_de_case_vide++;
					}
					l++;
				}
				return [tableau_sudoku,tempous];
				//console.log(tableau_sudoku);
				//console.log(tempous);
			}
		}

		function etape_enlevage_de_case(){
			tableau_sudoku_avec_case_vide = [ ... tableau_sudoku];

			let i = 0;
			while(i < 120){
				let case_a_vider = (Math.floor(Math.random() * 256));
				if(tableau_sudoku_avec_case_vide[case_a_vider] == ""){
				}
				else{
					tableau_sudoku_avec_case_vide[case_a_vider] = "";
					i++;	
				}
			}

			i = 0;
			while(i<256){
				i++;
			}
		}

		function resoudre_le_sudoku_en_X_etape(){
			let sol_tableau_sudoku_valeur = [ ... tableau_sudoku_avec_case_vide];
			let sol_tableau_sudoku_valeur_avec_bonus = [ ... tableau_sudoku_avec_case_vide];
			let sol_tableau_sudoku_editable = new Array(256).fill(0);
			let sol_tableau_sudoku_indice_maitre = new Array(256).fill(0);
			let i = 0;
			let j = 0;

			let nb_chiffre_decouvert = 0;
			//while(i < 81){
		  //let interval_a_stop = setInterval(function(){
		  while(1){
		  	while(i < 256){
					if(sol_tableau_sudoku_valeur[i] == ""){
						let testounet = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
						verification_horizontal(sol_tableau_sudoku_valeur,testounet,i);
						let testounet2 = [... testounet];

						verification_vertical(sol_tableau_sudoku_valeur,testounet2,i);
						let testounet3 = [... testounet2];

						verification_blok(sol_tableau_sudoku_valeur,testounet3,i,true);
						let testounet3b = [... testounet3];

						sol_tableau_sudoku_indice_maitre[i] = testounet3b;
					}

					if(Array.isArray(sol_tableau_sudoku_indice_maitre[i])){
						if(sol_tableau_sudoku_indice_maitre[i].length == 1){
							sol_tableau_sudoku_valeur[i] = sol_tableau_sudoku_indice_maitre[i][0];
							sol_tableau_sudoku_indice_maitre[i] = 0;
							nb_chiffre_decouvert++;
						}
					}
					i++;
				}


				if(i>=256){
					i = 0;
					while(i<256){
						i++;
					}
					i = 0;

					j++;
					if(j >= 2 && nb_chiffre_decouvert == 0){
						let k = 0;
						while(k < 256){
							if(Array.isArray(sol_tableau_sudoku_indice_maitre[k])){
								if(sol_tableau_sudoku_indice_maitre[k].length >= 1){
									sol_tableau_sudoku_valeur[k] = sol_tableau_sudoku_indice_maitre[k][0];
									sol_tableau_sudoku_valeur_avec_bonus[k] = sol_tableau_sudoku_indice_maitre[k][0];
									sol_tableau_sudoku_indice_maitre[k] = 0;
									k = 500;
								}
							}
							k++;
						}

						if(k >= 500){
						}
						else{
							//clearInterval(interval_a_stop);
							k = 0;
							let grille_finie = true;
							while(k < 256){
								if(Array.isArray(sol_tableau_sudoku_indice_maitre[k])){
									grille_finie=false;
								}
								k++;
							}

							if(grille_finie){
								return sol_tableau_sudoku_valeur_avec_bonus;
							}
							else{
								return false;
							}
						}
					}

					nb_chiffre_decouvert = 0;
					//clearInterval(interval_a_stop);
				}
			}//,1000);
		}
}


exports.creer_combo_sudoku = creer_combo_sudoku_f;

function creer_combo_sudoku_f(){
	let sudoku_realise = 0;
	let tableau_sudoku2;
	let tableau_sudoku_avec_case_vide;
	while(sudoku_realise == 0){
		let tempo = "";
		tableau_sudoku2 = [ ... creer_grille()];
		tableau_sudoku_avec_case_vide  = [ ... etape_enlevage_de_case(tableau_sudoku2)];
		let menerve = [ ... resoudre_le_sudoku_en_X_etape(tableau_sudoku_avec_case_vide)];

		let iii = 0;
		let tem = 0;
		while(iii<81){
			if(menerve[iii] == ""){
				tem = 1;
			}
			iii++;
		}

		if(tem == 0){
			sudoku_realise = 1;
		}
	}
	return [tableau_sudoku2,tableau_sudoku_avec_case_vide];
	
	function creer_grille(){
		let case_courante = 0;//const arr = new Array(81).fill(0);
		let tableau_sudoku = new Array(81).fill(0);
		let tableau_sudoku_valeur_possible = new Array(81).fill(0);
		let tableau_sudoku_avec_case_vide;
		tableau_sudoku_valeur_possible[case_courante] = [1,2,3,4,5,6,7,8,9];

		while(case_courante < 81){
			//Vérification horizontale
			let case_minimal_a_check = Math.floor(case_courante/9)*9;
			let case_maximal_a_check = case_minimal_a_check + 8;

			let indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_minimal_a_check]);/*case 1*/
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_minimal_a_check+1]);/*case 2*/
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_minimal_a_check+2]);/*case 3*/
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_minimal_a_check+3]);/*case 4*/
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_minimal_a_check+4]);/*case 5*/
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_minimal_a_check+5]);/*case 6*/
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_minimal_a_check+6]);/*case 7*/
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_minimal_a_check+7]);/*case 8*/
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_minimal_a_check+8]);/*case 9*/
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}

			//Vérification vertical
			let decalage_colonne = case_courante % 9;

			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[decalage_colonne]);//case 1
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[decalage_colonne+9]);//case 2
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[decalage_colonne+18]);//case 3
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[decalage_colonne+27]);//case 4
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[decalage_colonne+36]);//case 5
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[decalage_colonne+45]);//case 6
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[decalage_colonne+54]);//case 7
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[decalage_colonne+63]);//case 8
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}
			indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[decalage_colonne+72]);//case 9
			if(indice_a_enlever != -1){
				tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
			}

			//Vérification blok
			let colonne = case_courante%9;
			let ligne = Math.floor(case_courante/9);

			let blok_colonne = "";
			let blok_ligne = "";
			if(colonne >= 0 && colonne < 3){
				blok_colonne = 1;
			}
			if(colonne >= 3 && colonne < 6){
				blok_colonne = 2;
			}
			if(colonne >= 6 && colonne < 9){
				blok_colonne = 3;
			}

			if(ligne >= 0 && ligne < 3){
				blok_ligne = 1;
			}
			if(ligne >= 3 && ligne < 6){
				blok_ligne = 2;
			}
			if(ligne >= 6 && ligne < 9){
				blok_ligne = 3;
			}

			//verification par blok
			if(blok_colonne == 1 && blok_ligne == 1){
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[0]);	//case 1
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[1]);//case 2
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[2]);//case 3
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[9]);//case 4
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[10]);//case 5
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[11]);//case 6
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[18]);//case 7
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[19]);//case 8
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[20]);//case 9
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
			}

			if(blok_colonne == 2 && blok_ligne == 1){
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[3]);	//case 1
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[4]);//case 2
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[5]);//case 3
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[12]);//case 4
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[13]);//case 5
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[14]);//case 6
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[21]);//case 7
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[22]);//case 8
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[23]);//case 9
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
			}

			if(blok_colonne == 3 && blok_ligne == 1){
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[6]);	//case 1
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[7]);//case 2
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[8]);//case 3
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[15]);//case 4
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[16]);//case 5
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[17]);//case 6
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[24]);//case 7
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[25]);//case 8
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[26]);//case 9
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
			}

			if(blok_colonne == 1 && blok_ligne == 2){
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[27]);	//case 1
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[28]);//case 2
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[29]);//case 3
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[36]);//case 4
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[37]);//case 5
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[38]);//case 6
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[45]);//case 7
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[46]);//case 8
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[47]);//case 9
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
			}

			if(blok_colonne == 2 && blok_ligne == 2){
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[30]);//case 1
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[31]);//case 2
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[32]);//case 3
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[39]);//case 4
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[40]);//case 5
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[41]);//case 6
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[48]);//case 7
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[49]);//case 8
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[50]);//case 9
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
			}

			if(blok_colonne == 3 && blok_ligne == 2){
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[33]);//case 1
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[34]);//case 2
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[35]);//case 3
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[42]);//case 4
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[43]);//case 5
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[44]);//case 6
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[51]);//case 7
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[52]);//case 8
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[53]);//case 9
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
			}

			if(blok_colonne == 1 && blok_ligne == 3){
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[54]);//case 1
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[55]);//case 2
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[56]);//case 3
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[63]);//case 4
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[64]);//case 5
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[65]);//case 6
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[72]);//case 7
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[73]);//case 8
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[74]);//case 9
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
			}

			if(blok_colonne == 2 && blok_ligne == 3){
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[57]);//case 1
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[58]);//case 2
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[59]);//case 3
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[66]);//case 4
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[67]);//case 5
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[68]);//case 6
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[75]);//case 7
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[76]);//case 8
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[77]);//case 9
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
			}

			if(blok_colonne == 3 && blok_ligne == 3){
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[60]);//case 1
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[61]);//case 2
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[62]);//case 3
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[69]);//case 4
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[70]);//case 5
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[71]);//case 6
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[78]);//case 7
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[79]);//case 8
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[80]);//case 9
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1)
				}
			}

			//////FIN VERIF
			if(tableau_sudoku_valeur_possible[case_courante].length > 0){
				let chiffre = (Math.floor(Math.random() * Math.floor(tableau_sudoku_valeur_possible[case_courante].length)));
				
				tableau_sudoku_valeur_possible[case_courante].length
				tableau_sudoku[case_courante] = tableau_sudoku_valeur_possible[case_courante][chiffre];
				case_courante++;
				if(case_courante >= 81){
					return tableau_sudoku;
				}else{
					tableau_sudoku_valeur_possible[case_courante] = [1,2,3,4,5,6,7,8,9];
				}
			}
			else{
				case_courante--;
				indice_a_enlever = tableau_sudoku_valeur_possible[case_courante].indexOf(tableau_sudoku[case_courante]);
				if(indice_a_enlever != -1){
					tableau_sudoku_valeur_possible[case_courante].splice(indice_a_enlever, 1);
					tableau_sudoku[case_courante] = "";
				}
				else{
				}
			}
		}
		return tableau_sudoku;
	}

	function etape_enlevage_de_case(tableau_sudoku){
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

	function resoudre_le_sudoku_en_X_etape(tableau_sudoku_avec_case_vide){
		let sol_tableau_sudoku_valeur = [ ... tableau_sudoku_avec_case_vide];
		let sol_tableau_sudoku_editable = new Array(81).fill(0);
		let sol_tableau_sudoku_indice_maitre = new Array(81).fill(0);

		let ii = 0;
		while(ii<81){
			i = 0;
			while(i < 81){
				if(sol_tableau_sudoku_valeur[i] == ""){
					sol_tableau_sudoku_indice_maitre[i] = valeur_possible(sol_tableau_sudoku_valeur,i);
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
						sol_tableau_sudoku_valeur[i] = sol_tableau_sudoku_indice_maitre[i][0];
						sol_tableau_sudoku_indice_maitre[i] = 0;
					}
				}
				i++;
			}
			ii++;
		}
		return sol_tableau_sudoku_valeur;
	}




/////////////////////////////

			function valeur_possible(sol_tableau_sudoku_valeur,i){
				let indice_a_enlever;
				let liste_valeur_possible = [1,2,3,4,5,6,7,8,9];

				let case_minimal_a_check = Math.floor(i/9)*9;
				let case_maximal_a_check = case_minimal_a_check + 8;
				//verification honrizontale
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[case_minimal_a_check]);/*case 1*/
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1);
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[case_minimal_a_check+1]);/*case 2*/
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1);
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[case_minimal_a_check+2]);/*case 3*/
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1);
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[case_minimal_a_check+3]);/*case 4*/
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1);
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[case_minimal_a_check+4]);/*case 5*/
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1);
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[case_minimal_a_check+5]);/*case 6*/
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1);
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[case_minimal_a_check+6]);/*case 7*/
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1);
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[case_minimal_a_check+7]);/*case 8*/
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1);
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[case_minimal_a_check+8]);/*case 9*/
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1);
						}
				//Fin vérification horizontale

				//verification vertical
						let decalage_colonne = i % 9;

						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[decalage_colonne]);//case 1
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[decalage_colonne+9]);//case 2
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[decalage_colonne+18]);//case 3
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[decalage_colonne+27]);//case 4
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[decalage_colonne+36]);//case 5
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[decalage_colonne+45]);//case 6
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[decalage_colonne+54]);//case 7
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[decalage_colonne+63]);//case 8
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[decalage_colonne+72]);//case 9
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
				//fin verification vertical

			//Vérification blok
				let colonne = i%9;
				let ligne = Math.floor(i/9);

				let blok_colonne = "";
				let blok_ligne = "";
				if(colonne >= 0 && colonne < 3){
					blok_colonne = 1;
				}
				if(colonne >= 3 && colonne < 6){
					blok_colonne = 2;
				}
				if(colonne >= 6 && colonne < 9){
					blok_colonne = 3;
				}

				if(ligne >= 0 && ligne < 3){
					blok_ligne = 1;
				}
				if(ligne >= 3 && ligne < 6){
					blok_ligne = 2;
				}
				if(ligne >= 6 && ligne < 9){
					blok_ligne = 3;
				}

			//verification par blok
			if(blok_colonne == 1 && blok_ligne == 1){

						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[0]);	//case 1
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}

						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[1]);//case 2
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}

						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[2]);//case 3
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}

						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[9]);//case 4
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}

						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[10]);//case 5
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}

						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[11]);//case 6
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}

						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[18]);//case 7
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}

						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[19]);//case 8
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}

						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[20]);//case 9
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
			}
			else if(blok_colonne == 2 && blok_ligne == 1){

						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[3]);//case 1
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[4]);//case 2
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[5]);//case 3
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[12]);//case 4
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[13]);//case 5
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[14]);//case 6
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[21]);//case 7
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[22]);//case 8
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[23]);//case 9
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
			}
			else if(blok_colonne == 3 && blok_ligne == 1){
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[6]);//case 1
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[7]);//case 2
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[8]);//case 3
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[15]);//case 4
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[16]);//case 5
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[17]);//case 6
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[24]);//case 7
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[25]);//case 8
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[26]);//case 9
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
			}
			else if(blok_colonne == 1 && blok_ligne == 2){
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[27]);//case 1
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[28]);//case 2
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[29]);//case 3
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[36]);//case 4
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[37]);//case 5
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[38]);//case 6
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[45]);//case 7
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[46]);//case 8
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[47]);//case 9
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
			}
			else if(blok_colonne == 2 && blok_ligne == 2){
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[30]);//case 1
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[31]);//case 2
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[32]);//case 3
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[39]);//case 4
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[40]);//case 5
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[41]);//case 6
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[48]);//case 7
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[49]);//case 8
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[50]);//case 9
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
			}
			else if(blok_colonne == 3 && blok_ligne == 2){
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[33]);//case 1
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[34]);//case 2
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[35]);//case 3
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[42]);//case 4
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[43]);//case 5
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[44]);//case 6
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[51]);//case 7
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[52]);//case 8
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[53]);//case 9
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
			}
			else if(blok_colonne == 1 && blok_ligne == 3){
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[54]);//case 1
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[55]);//case 2
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[56]);//case 3
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[63]);//case 4
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[64]);//case 5
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[65]);//case 6
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[72]);//case 7
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[73]);//case 8
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[74]);//case 9
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
			}
			else if(blok_colonne == 2 && blok_ligne == 3){
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[57]);//case 1
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[58]);//case 2
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[59]);//case 3
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[66]);//case 4
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[67]);//case 5
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[68]);//case 6
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[75]);//case 7
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[76]);//case 8
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[77]);//case 9
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
			}
			else if(blok_colonne == 3 && blok_ligne == 3){
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[60]);//case 1
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[61]);//case 2
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[62]);//case 3
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[69]);//case 4
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[70]);//case 5
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[71]);//case 6
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[78]);//case 7
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[79]);//case 8
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
						indice_a_enlever = liste_valeur_possible.indexOf(sol_tableau_sudoku_valeur[80]);//case 9
						if(indice_a_enlever != -1){
							liste_valeur_possible.splice(indice_a_enlever, 1)
						}
			}
			else{
			}

				return liste_valeur_possible;
			}
////////////////////////////////







}