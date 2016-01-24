var lignes = ['0'];
var colonnes = ['0'];
var blocs = ['0'];
var cases = document.getElementsByClassName("case");
var boutons = document.getElementsByClassName("boutons");
var verif = document.getElementById("btVerifier");
var btActif = 0;
var tabCases = [];

$(document).ready(function(){

	// Constructeur pour l'objet case (bloc représente le numéro du bloc de 9 cases la contenant)
	function Case(ligne, colonne, valeur, numero, bloc, valPossibles, modif)
	{
		this.modif = true;
		this.numero = numero;
		this.ligne = ligne;
		this.colonne = colonne;
		this.valeur = valeur;
		this.valPossibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		ligBloc = ligne/3; 
		colBloc = colonne/3;
		
		// calcul du bloc de 9 cases
		if (ligBloc <= 1)  
		{
			if (colBloc <= 1)
			{
				this.bloc = '1';
			}
			if ((colBloc > 1) && (colBloc <= 2))
			{
				this.bloc = '2';
			}
			if ((colBloc > 2) && (colBloc <= 3))
			{
				this.bloc = '3';
			}
		}
		if ((ligBloc > 1) && (ligBloc <= 2))
		{
			if (colBloc <= 1)
			{
				this.bloc = '4';
			}
			if ((colBloc > 1) && (colBloc <= 2))
			{
				this.bloc = '5';
			}
			if ((colBloc > 2) && (colBloc <= 3))
			{
				this.bloc = '6';
			}
		}
		if ((ligBloc > 2) && (ligBloc <= 3))
		{
			if (colBloc <= 1)
			{
				this.bloc = '7';
			}
			if ((colBloc > 1) && (colBloc <= 2))
			{
				this.bloc = '8';
			}
			if ((colBloc > 2) && (colBloc <= 3))
			{
				this.bloc = '9';
			}
		}
	}

	// Renvoie un tableau contenant les numeros des cases du bloc
	function calculBloc(bloc)
	{
		tabBloc = [];
		for (var i=0; i<tabCases.length; i++)
		{
			if (tabCases[i].bloc == bloc)
			{
				tabBloc.push(tabCases[i].numero);
			}
		}
		return tabBloc;
	}

	// verifie si le sudoku est bien valide
	function verifier()
	{
		if (tabCases === tabSolution)
		{
			console.log("valide");
		}
		else
		{
			console.log("invalide");
		}
	}

	// Permet de sélectionner un bouton et de mettre sa valeur en valeur active (elle va etre marquée dans les cases ou on cliquera)
	function fBoutons()
	{
		btActif = this.value;
	}

	// Permet d'afficher la valeur active dans la case sur laquelle on clique
	function fCases()
	{
		num = this.id.substring(11,13); // Récupère le numéro de la case depuis l'id

		if ((btActif != 0) && (btActif != "Effacer") && tabCases[num].modif == true)
		{
			this.innerHTML = "<p>" + btActif + "</p>";
		}
		else if (tabCases[num].modif == true)
		{
			this.innerHTML = "<p>0</p>";
		}
	}

	// Enlève le chiffre sur toutes les cases de la ligne comme possibilite
	function testLigne(chiffre, ligne)
	{
		for (var i=(ligne-1)*9; i<ligne*9; i++) 
		{
			for (var j=0; j<tabCases[i].valPossibles.length; j++)
			{
				if (tabCases[i].valPossibles[j] == chiffre)
				{
					tabCases[i].valPossibles.splice(j, 1);
				}
			}
		}
	}

	// Enlève le chiffre sur toutes les cases de la colonne comme possibilite
	function testColonne(chiffre, colonne)
	{
		for (var i=0; i<9; i++)
		{
			numCase = 9*i+(colonne-1);

			console.log("chiffre : "+chiffre+" colonne : "+colonne+" case : "+numCase+" possibilite : "+tabCases[numCase].valPossibles)

			for (var j=0; j<tabCases[i].valPossibles.length; j++)
			{
				if (tabCases[i].valPossibles[j] == chiffre)
				{
					tabCases[numCase].valPossibles.splice(j, 1);
				}
			}
		}
	}

	// Enlève le chiffre sur toutes les cases du bloc comme possibilite
	function testBloc(chiffre, bloc)
	{/*
		for (var i=0; i<bloc.length; i++)
		{
			for (var j=0; j<tabCases[i].valPossibles.length; j++)
			{
				if (tabCases[i].valPossibles[j] == chiffre)
				{
					tabCases[i].valPossibles.splice(chiffre-1, 1);
				}
			}
		}*/	
	}
	
	function creationSudoku()
	{
		for (var i=0; i<81; i++)
		{
			possibilites = tabCases[i].valPossibles.length;
			var posAlea = Math.floor(Math.random() * possibilites);
			var valAlea = tabCases[i].valPossibles[posAlea];
			casesBloc = calculBloc(tabCases[i].bloc);
			
			tabCases[i].modif = false;
			tabCases[i].valeur = valAlea;
			cases[i].innerHTML = "<p>"+valAlea+"</p>";
			cases[i].style.color="red";
			
			testLigne(valAlea, tabCases[i].ligne);
			testColonne(valAlea, tabCases[i].colonne);
			testBloc(valAlea, casesBloc);
		
		}
	
		tabSolution = tabCases;
	}	

	for (var i=0; i<boutons.length; i++)
	{
		boutons[i].addEventListener('click', fBoutons, false);	
	}

	for (var i=0; i<cases.length; i++)
	{
		var li = cases[i].id.charAt(3); //récupère la ligne de la case grace a son id
		var co = cases[i].id.charAt(7); //récupère la colonne de la case grace a son id
		var val = cases[i].textContent;
		var nCase = new Case(li, co, val, i); //crée un nouvel objet Case grace a la ligne et la colonne
		tabCases.push(nCase);
			
		cases[i].addEventListener('click', fCases, false);
	}

	verif.addEventListener('click', verifier, false);

	creationSudoku();
});
