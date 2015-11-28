exports.index = function(req, res) {

	var pageData = {
		meta: {
			title: 'Pocket Beta coming soon',
			description: '.|..'
		}
	};

	res.render('home', pageData);
};
