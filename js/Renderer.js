class Renderer {
	constructor(contentDivider) {
		this.pages = contentDivider.pages;
		this.contentDestination = contentDivider.contentDestination;
		this.templates = contentDivider.templates;

		if (!this.pages.length) {
			this.createNewPage();
		}
	}

	createNewPage() {
		this.removeOverflowLastPage();

		let page;

		if (!this.pages.length) {
			page = this.templates.firstPage.cloneNode(true);
		}
		else {
			page = this.templates.page.cloneNode(true);
		}

		this.pages.push(page);

		this.contentDestination.appendChild(page);
	}

	removeOverflowLastPage() {
		if (this.pages.length) {
			this.pages[this.pages.length-1].setAttribute('style', 'overflow: hidden;');
		}
	}

	addItemToLastPage(item) {
		this.pages[this.pages.length-1].querySelector('.content').appendChild(item);
	}
}