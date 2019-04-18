/**
 * Pour la redirection www à non www
 */
function wwwRedirect(req, res, next) {
	if (req.headers.host.slice(0, 4) === 'www.') {
		let newHost = req.headers.host.slice(4);
		return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
	}
	next();
};

module.exports = wwwRedirect;
