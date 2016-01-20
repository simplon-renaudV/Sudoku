<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta lang="fr-FR">
	
	<title>Sudoku</title>

	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>

<div class="container">

<?php
	//Affichage des cases et des boutons
	$numCase=0;
	$ligne=1;
	$colonne=1;
	for ($ligne=1; $ligne<=9; $ligne++)
	{
		echo "<div class='row'>";
		for ($colonne=1; $colonne<=9;$colonne++)
		{
			echo "<div class='col-xs-1 case ligne".$ligne." colonne".$colonne."' id='lig".$ligne."col".$colonne."num".$numCase."'><p>x</p></div>";
			$numCase++;
		}
		echo "<div class='col-xs-1'></div>";
		echo "<div class='col-xs-1'><input type='button' class='boutons' id='bt".$ligne."' value='".$ligne."'></div>";
		echo "<div class='col-xs-1'></div>";
		echo "</div>";
	}
?>

<script src="scripts/jquery-2.2.0.js"></script> 
<script src="scripts/script.js"></script>

</body>

</html>