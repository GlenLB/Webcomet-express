let express = require("express");
let router = express.Router();
let sendMail = require("../logic/email")
let path = require('path')


/**
 * Structure pour définir une page
 * @param {string} titre 
 * @param {string} description 
 * @param {string} urlCanonique 
 * @param {string} h1 
 */
function Page(titre, description, urlCanonique, h1) {
	this.titre = titre
	this.description = description
	this.urlCanonique = urlCanonique
	this.h1 = h1
}

/**
 * Rend l'URL canonique d'une page
 * @param {*} req la requête HTTP
 * @param {*} res la réponse HTTP
 */
function creerUrlCanonique(req, res) {
	return "https://" + req.hostname + req.path
}

/* Page d'accueil */
router.get('/', function (req, res, next) {
	let p = new Page(
		"&#x21e8; WebComet.fr &#x2022; Webmaster à Rennes &#x2022; Création de site internet et SEO",
		"Vous cherchez un webmaster ou un développeur web freelance pour la création de votre site internet à Rennes ou ailleurs ? Vous cherchez un consultant SEO pour améliorer votre référencement naturel ? Alors contactez-moi pour obtenir un site web optimisé pour le SEO.",
		creerUrlCanonique(req, res),
		"Création de site internet et SEO<br>Webmaster à Rennes"
	)
	res.render("index", p);
});

/* Page création de sites internet */
router.get("/creation-site-internet", function (req, res, next) {
	let p = new Page(
		"&#x21e8; Création de site internet à Rennes et SEO &#x2022; Webmaster à Rennes",
		"Vous avez besoin de faire réaliser la création d'un site internet pour présenter votre activité ? Webmaster basé à Rennes, je peux vous créer un site internet correspondant à vos besoins quelle que soit votre localisation dans le monde.",
		creerUrlCanonique(req, res),
		"Création de site internet à Rennes<br>Webmaster basé à Rennes"
	)
	res.render("creation_site_internet", p);
});

/* Page consultant SEO */
router.get("/consultant-seo", function (req, res, next) {
	let p = new Page(
		"&#x1F4C8; Consultant SEO à Rennes &#x2022; Consultant référencement naturel à Rennes",
		"Consultant SEO indépendant à Rennes, je dispose des compétences pour améliorer la visibilité de votre site web sur les moteurs de recherche comme Google. En améliorant le référencement naturel de votre site internet, vous capterez plus de trafic qualifié sur votre site web.",
		creerUrlCanonique(req, res),
		"Consultant SEO à Rennes<br>Référencement naturel à Rennes"
	)
	res.render("consultant_seo", p);
});

/* Portfolio DIWA */
router.get("/portfolio-diwa", function (req, res, next) {
	let p = new Page(
		"Portfolio Glen Le Baill pour candidature LP DIWA",
		"Portfolio Glen Le Baill pour candidature LP DIWA",
		creerUrlCanonique(req, res),
		"Glen Le Baill &#x2022; Portfolio web"
	)
	res.render("portfolio_diwa", p);
});

/* Page conditions générales */
router.get("/conditions-generales", function (req, res, next) {
	let p = new Page(
		"WebComet.fr &#x2022; Conditions générales de vente",
		"WebComet.fr &#x2022; Conditions générales de vente",
		creerUrlCanonique(req, res),
		"WebComet.fr &#x2022; Conditions générales de vente"
	)
	res.render("conditions_generales", p);
});

/* Page mentions légales */
router.get("/mentions-legales", function (req, res, next) {
	let p = new Page(
		"WebComet.fr &#x2022; Mentions légales",
		"WebComet.fr &#x2022; Mentions légales",
		creerUrlCanonique(req, res),
		"WebComet.fr &#x2022; Mentions légales"
	)
	res.render("mentions_legales", p);
});

/* Page d'envoi d'email */
router.post("/mail", function (req, res, next) {
	let emailAddress = req.body.emailAddress; console.log(emailAddress)
	let msg = req.body.message; console.log(msg)
	res.header("Content-Type", "text/plain")
	async function exec() {
		try {
			let retour = await sendMail(emailAddress, msg)
			console.log(`OK => ${retour}`)
			res.send("ok")
		} catch (e) {
			console.log(`Erreur => ${e}`)
			res.send(e)
		}
	}
	exec()
});

/* Page CV */
router.get("/cv", function (req, res, next) {
	res.sendFile(path.join(__dirname, "../views/cv.html"))
});


/* REDIRECTIONS -------------------------- */

/* Page création de sites vitrine */
router.get("/webmaster-creation-site-vitrine", function (req, res, next) {
	res.redirect(301, "/creation-site-internet");
});

module.exports = router;
