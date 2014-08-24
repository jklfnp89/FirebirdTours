var breadcrumbs = function createBreadcrumbs() {
	if((($("body").attr("class").indexOf('landing') + 1) == 0))
	{
		var breadcrumbs = [];

		breadcrumbs.push({name: 'Main page', url: '/'});

		if($("#active").length <= 0)
		{
			if($("li.wsite-nav-current").length > 0)
			{
				var currentElement = $("li.wsite-nav-current");
				var betweenCurrentAndHeadParent = currentElement.parents("li[id^='wsite-nav']");
				var parentElement = currentElement.closest("li[id^='pg']");

				breadcrumbs.push({name: parentElement.children("a").text(), url: parentElement.children("a").attr("href")});

				for(var i = (betweenCurrentAndHeadParent.length - 1); i >= 0; i--)
				{
					var item = $(betweenCurrentAndHeadParent[i]).children("a");

					var itemText = item.children("span.wsite-menu-title").length > 0 ? item.children("span.wsite-menu-title").text() : item.text();
					var itemURL = item.attr("href");

					breadcrumbs.push({name: itemText, url: itemURL});
				}

				breadcrumbs.push({name: currentElement.children("a").children("span.wsite-menu-title").length > 0 ? currentElement.children("a").children("span.wsite-menu-title").text() : currentElement.children("a").text(), url: currentElement.children("a").attr("href")});
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
