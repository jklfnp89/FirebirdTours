var breadcrumbs = function createBreadcrumbs() {
	if((($("body").attr("class").indexOf('landing') + 1) == 0))
	{
		var breadcrumbs = [];

		breadcrumbs.push({name: 'Main page', url: '/'});

		if($("#active").length <= 0)
		{
			if($("ul.wsite-menu li.wsite-nav-current").length > 0)
			{
				var currentSubElement = $("ul.wsite-menu li.wsite-nav-current");
				var parentElement = currentSubElement.closest(".wsite-menu-wrap").parent("li");

				breadcrumbs.push({name: parentElement.children("a").text(), url: parentElement.children("a").attr("href")});
				breadcrumbs.push({name: currentSubElement.children("a").text(), url: currentSubElement.children("a").attr("href")});
			}
		}
		else if($("#active").length > 0)
		{
			breadcrumbs.push({name: $("#active").children("a").text(), url: $("#active").children("a").attr("href")});
		}

		breadcrumbs[breadcrumbs.length - 1].url = '#';

		return breadcrumbs;
	}

	return undefined;
}();

$(document).ready(function() {
	if(typeof breadcrumbs != "undefined")
	{
		var breadcrumbsHTMLtoInsert = '';

		breadcrumbsHTMLtoInsert = '<ul>';

		for(var i = 0; i < breadcrumbs.length; i++)
		{
			breadcrumbsHTMLtoInsert += '<li>';
			breadcrumbsHTMLtoInsert += '<a href="' + breadcrumbs[i].url + '">';
			breadcrumbsHTMLtoInsert += breadcrumbs[i].name;
			breadcrumbsHTMLtoInsert += '</a>';
			breadcrumbsHTMLtoInsert += '</li>';
		}

		breadcrumbsHTMLtoInsert += '</ul>';

		$("div.breadcrumbs").append(breadcrumbsHTMLtoInsert);
	}
});
