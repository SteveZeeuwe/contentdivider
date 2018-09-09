class RenderSimple extends Renderer {
	constructor(contentDivider, contentItem) {
		super(contentDivider);

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

		if (currentPage.scrollHeight > currentPage.clientHeight) {
			return true;
		}
		else {
			return false;
		}
	}
}