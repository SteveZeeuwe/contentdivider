/**
 * @file RenderSimple.js
 *
 * Renders simple elements straight onto the current page
 *
 * @author Steve Zeeuwe <szeeuwe@gmail.com>
 * @version 1.0.0
 */

class RenderSimple extends Renderer {
	constructor(renderProperties, contentItem) {
		super(renderProperties);

		this.contentItem = contentItem;
	}

	render() {
		if (this.ifAddItemToLastPageOverflows()) {
			this.createNewPage();
		}

		this.addItemToLastPage(this.contentItem);
	}

	ifAddItemToLastPageOverflows() {
		let currentPage = this.pages[this.pages.length-1];

		currentPage.appendChild(this.contentItem);

		return currentPage.scrollHeight > currentPage.clientHeight;
	}
}