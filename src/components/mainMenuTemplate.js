const { app } = require("electron");

const krajMenu = [
	{
		label: "O programu",
	},
	{
		label: "Izlaz iz programa",
		click() {
			app.quit();
		},
	},
];

const podesenjaMenu = [
	{
		label: "Parametri vage",
	},
];

const bazaPodatakaMenu = [
	{
		label: "Arhiviranje baze",
	},
	{
		label: "Povratak arhive",
	},
	{
		label: "Kompakt baze",
	},
	{
		label: "Brisanje podataka",
	},
];

const izvjescaMenu = [
	{
		label: "Pregled vaganja",
	},
	{
		label: "Pregled za robu",
	},
	{
		label: "Pregled za kupca - dobavljača",
	},
];

const vaganjaMenu = [
	{
		label: "Jedno vaganje",
	},
	{
		label: "Prvo vaganje",
	},
	{
		label: "Drugo vaganje",
	},
	{
		label: "Unos vaganja",
	},
];

const maticniPodaciMenu = [
	{
		label: "Vozilo",
	},
	{
		label: "Vozač",
	},
	{
		label: "Prikolica",
	},
	{
		label: "Roba",
	},
	{
		label: "Partner",
	},
	{
		label: "Mjesto isporuke",
	},
];

const mainMenuTemplate = [
	{
		label: "Matični podaci",
		submenu: maticniPodaciMenu,
	},
	{
		label: "Vaganja",
		submenu: vaganjaMenu,
	},
	{
		label: "Izvješča",
		submenu: izvjescaMenu,
	},
	{
		label: "Baza podataka",
		submenu: bazaPodatakaMenu,
	},
	{
		label: "Podešenja",
		submenu: podesenjaMenu,
	},
	{
		label: "Kraj",
		submenu: krajMenu,
	},
];

module.exports = mainMenuTemplate;
