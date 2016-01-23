var cases = document.getElementsByClassName("case");
var boutons = document.getElementsByClassName("boutons");
var btActif = 0;
var tabCases = [];


// Constructeur pour l'objet case (bloc représente le numéro du bloc de 9 cases la contenant)
function Case(ligne, colonne, valeur, numero, bloc, valPossibles)
{
	this.numero = numero;
	this.ligne = ligne;
	this.colonne = colonne;
	this.valeur = valeur;
	this.valPossibles = {"1":true, "2":true, "3":true, "4":true, "5":true, "6":true, "7":true, "8":true, "9":true}; // true signifie que la case peut avoir cette valeur la
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

$(document).ready(function(){

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

	// Permet de sélectionner un bouton et de mettre sa valeur en valeur active (elle va etre marquée dans les cases ou on cliquera)
	function fBoutons()
	{
		btActif = this.value;
	}

	// Permet d'afficher la valeur active dans la case sur laquelle on clique
	function fCases()
	{
		if ((btActif != 0) && (btActif != "Effacer"))
		{
			this.innerHTML = "<p>" + btActif + "</p>";
		}
		else
		{
			this.innerHTML = "<p>0</p>";
		}
	}

	// Vérifie la présence ou non d'un chiffre dans la case
	function testCase(chiffre, case1)
	{
		if (tabCases[case1].valeur != '0')
		{
			return false;
		} 
		return true;
	}

	// Vérifie que le même chiffre ne se trouve pas déjà sur la ligne
	function testLigne(chiffre, ligne, case1)
	{		
		for (var i=(ligne-1)*9; i<ligne*9; i++) 
		{
			if ((tabCases[i].valeur == chiffre) && (case1 != i))
			{
				return false;
			}		
		}
		return true;
	}

	// Vérifie que le même chiffre ne se trouve pas déjà sur la colonne
	function testColonne(chiffre, colonne, case1)
	{
		for (var i=0; i<9; i++)
		{
			numCase = 9*i+(colonne-1);
			if ((tabCases[numCase].valeur == chiffre) && (case1 != numCase))
			{
				return false;
			}
		}
		return true;
	}

	// Vérifie que le même chiffre ne se trouve pas déjà dans le bloc
	function testBloc(chiffre, bloc, case1)
	{
	for (var i=0; i<9; i++)
		{
			if ((tabCases[bloc[i]].valeur == chiffre) && (case1 != tabCases[tabBloc[i]]))
			{			
				return false;
			}
		}
		return true;
	}

	// Crée une grille de sudoku avec 30 chiffres présents au début
	function creationSudoku()
	{
		for (var i=0; i<30; i++)
		{
			var valAlea = Math.floor((Math.random() * 9) + 1);
			var caseAlea = Math.floor((Math.random() * 81));
			
			casesBloc = calculBloc(tabCases[caseAlea].bloc);
			
			if ((!testBloc(valAlea, casesBloc, caseAlea)) || (!testColonne(valAlea, tabCases[caseAlea].colonne, caseAlea)) || (!testLigne(valAlea, tabCases[caseAlea].ligne, caseAlea)) || (!testCase(valAlea, caseAlea)))
			{
				i--;
			}
			else
			{
				tabCases[caseAlea].valeur = valAlea;
				cases[caseAlea].innerHTML = "<p>"+valAlea+"</p>";
			}
		}
	}

	creationSudoku();

});
