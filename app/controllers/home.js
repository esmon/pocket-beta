exports.index = function(req, res) {

	var pageData = {
		meta: {
			title: 'home',
			description: '.|..'
		}
	};

	res.render('home', pageData);
};
