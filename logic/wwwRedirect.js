/**
 * Pour la redirection www à non www
 */
function wwwRedirect(req, res, next) {
	if (req.headers.host.slice(0, 4) === 'www.') {
		res.redirect(301, req.protocol + '://' + req.headers.host.slice(4) + req.path);
	}
	next();
};

module.exports = wwwRedirect;
