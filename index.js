var cheerio = require( "cheerio" )

var convertAdmonition = function (page)
{
	var $ = cheerio.load( page.content );

	// For each blockquote...
	$( ".admonitionblock" ).each(function () {

    // Find type string

    var kind = $(this).find('.title').text();
    var content = $(this).find('.content');

		// Set style and title
		var style = kind.toLowerCase();

		// Store all segments as array
		var children = $(this).children().toArray();

		// Create callout header
		var calloutHeader = $('<h4>').text(kind);

		// Create callout bodyy
		var calloutBody = $('<div>').append(content.html());

		// Create callout
		var callout = $('<div>')
			.addClass('callout callout-' + style)
			.append(calloutHeader)
			.append(calloutBody);

		// Insert new callout to DOM
		$(this).before(callout);

		// Remove old blockquote
		$(this).remove();

		// Replace page content
		page.content = $.html();

	});

	return page;
};

module.exports = {
	book: {
			assets: './assets',
			css: [
				'plugin.css'
			]
    },
	hooks: {
			"page": function(page)
			{
				page = convertAdmonition(page);
				return page;
	     	}
    }
};
