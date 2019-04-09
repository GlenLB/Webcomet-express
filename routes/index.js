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
		"WebComet.fr &#x2022; Webmaster à Rennes &#x2022; Création de site internet à Rennes &#x2022; Consultant SEO freelance",
		"Vous cherchez un webmaster ou développeur web freelance pour créer votre site internet à Rennes ou ailleurs ? Vous cherchez un consultant SEO pour améliorer votre référencement naturel ? Alors contactez-moi, car je dispose des compétences pour vous créer un site internet au référencement naturel optimisé pour que votre site web soit visible sur les moteurs de recherche comme Google.",
		creerUrlCanonique(req, res),
		"Création de site internet &#x2022; Webmaster à Rennes<br>Référencement naturel SEO"
	)
	res.render("index", p);
});

/* Page création de sites vitrine */
router.get("/webmaster-creation-site-vitrine", function (req, res, next) {
	let p = new Page(
		"Webmaster Rennes : Création de site vitrine à Rennes et SEO",
		"Vous avez besoin d'un site vitrine pour présenter votre activité ? Webmaster basé à Rennes, je peux vous créer un site vitrine correspondant à vos besoins quelle que soit votre localisation dans le monde.",
		creerUrlCanonique(req, res),
		"Création de site vitrine professionnel<br>Développeur web basé à Rennes"
	)
	res.render("creation_site_vitrine", p);
});

/* Page consultant SEO */
router.get("/consultant-seo", function (req, res, next) {
	let p = new Page(
		"Consultant SEO à Rennes - Consultant référencement naturel freelance",
		"Consultant SEO freelance à Pacé près de Rennes, je dispose des compétences pour améliorer la visibilité de votre site web sur les moteurs de recherche comme Google. En améliorant le référencement naturel de votre site internet, vous capterez plus de trafic qualifié sur votre site web.",
		creerUrlCanonique(req, res),
		"Consultant SEO à Rennes<br>Référencement naturel à Rennes"
	)
	res.render("consultant_seo", p);
});

/* Page conditions générales */
router.get("/conditions-generales", function (req, res, next) {
	let p = new Page(
		"Webcomet.fr - Conditions générales de vente",
		"Webcomet.fr - Conditions générales de vente",
		creerUrlCanonique(req, res),
		"Webcomet.fr - Conditions générales de vente"
	)
	res.render("conditions_generales", p);
});

/* Page mentions légales */
router.get("/mentions-legales", function (req, res, next) {
	let p = new Page(
		"Webcomet.fr - Mentions légales",
		"Webcomet.fr - Mentions légales",
		creerUrlCanonique(req, res),
		"Webcomet.fr - Mentions légales"
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

module.exports = router;
