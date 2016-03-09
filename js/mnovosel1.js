function ispisGreske(greska, greskaVrijedi=true) {
	greska = "<div>" + greska + "</div>";
	var tekstGreske = document.getElementById("greska").innerHTML.replace(greska, "");
	
	if ( greskaVrijedi ) {
		tekstGreske += greska;
	}	
	document.getElementById("greska").innerHTML = tekstGreske;
}

function imaVelikoPocetnoSlovo(vrijednost) {
	if ( isNaN(vrijednost[0]) && vrijednost[0] === vrijednost[0].toUpperCase() ) return true;
	else return false;
}

function provjeriElement(element) {
	var validated = false;
	var submitButton = document.getElementById("submitBtn");
	var opisGreske= {	grad:	 "Neispravan unos grada! Grad se piše velikim početnim slovom.",
						adresa:	 "Adresa nije upisana ili ima više od 100 znakova.",
						ime:	 "Neispravan unos imena! Ime se piše velikim početnim slovom.",
						prezime: "Neispravan unos prezimena! Prezime se piše velikim početnim slovom.",
						spol:	 "Spol nije odabran!",
						lozinka: "Lozinka mora sadržavati min. 8 znakova: brojeve, mala i velika slova."
					};
	
	if (element.length == 2) {
		if ( element[0].checked || element[1].checked ) validated = true;
		else validated = false;		
		opisGreske = opisGreske["spol"];
		
	} else {
		switch(element.id) {
			case "grad":
			case "ime":
			case "prezime":			
				if ( element.value == "" || !imaVelikoPocetnoSlovo(element.value) ) validated = false;
				else validated = true;
				opisGreske = opisGreske[element.id];
			break;

			case "adresa":
				if ( element.value == "" || element.value.length > 100 ) validated = false;
				else validated = true;
				opisGreske = opisGreske[element.id];
			break;

			case "lozinka":
				var patt = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/g;
				if ( element.value.length > 7 && patt.test(element.value) ) validated = true;
				else validated = false;
				opisGreske = opisGreske[element.id];
			break;
			
			default:
				if ( element.value == "" ) validated = false;
				else validated = true;
				opisGreske = "Korisničko ime i email moraju biti uneseni.";
			
		}
		if ( !validated ) element.focus();
	}

	
	if ( validated ) {
		ispisGreske(opisGreske, false);
		submitButton.disabled = false;
	} else {		
		submitButton.disabled = true;
		ispisGreske(opisGreske);
	}
	
	return validated;
}

var grad = document.getElementById("grad");
grad.addEventListener("blur", function(e) { provjeriElement(grad); });

var adresa = document.getElementById("adresa");
adresa.addEventListener("blur", function(e) { provjeriElement(adresa); });

var ime = document.getElementById("ime");
ime.addEventListener("blur", function(e) { provjeriElement(ime); });

var prezime = document.getElementById("prezime");
prezime.addEventListener("blur", function(e) { provjeriElement(prezime); });

var lozinka = document.getElementById("lozinka");
lozinka.addEventListener("blur", function(e) { provjeriElement(lozinka); });


var form = document.getElementById("formular");
form.addEventListener("submit", function(e) {
	if ( !provjeriElement(document.getElementsByName("spol")) ) e.preventDefault();
	if ( !provjeriElement(grad) ) e.preventDefault();
	if ( !provjeriElement(adresa) ) e.preventDefault();
	if ( !provjeriElement(ime) ) e.preventDefault();
	if ( !provjeriElement(prezime) ) e.preventDefault();
	if ( !provjeriElement(lozinka) ) e.preventDefault();
	if ( !provjeriElement(document.getElementById("email")) ) e.preventDefault();
	if ( !provjeriElement(document.getElementById("korisnickoIme")) ) e.preventDefault();
});
