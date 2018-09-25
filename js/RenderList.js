class RenderList extends Renderer {
	constructor(renderProperties, ul) {
		super(renderProperties);
		
		this.list = ul.cloneNode();
		this.listItems = Array.from(ul.children);

		this.lists = [];

		this.addListToLastPage();
	}

	render() {
		this.listItems.forEach((listItem, index) => {
			if (this.ifAddListItemToLastListOverflows(listItem)) {
				this.createNewPage();
				this.addListToLastPage();
			}

			this.addItemToLastList(listItem);
		});
	}

	addListToLastPage() {
		let list = this.list.cloneNode();

		this.addItemToLastPage(list);

		this.lists.push(list);
	}

	ifAddListItemToLastListOverflows(listItem) {
		let currentPage = this.pages[this.pages.length-1];
		let currentList = this.lists[this.lists.length-1];

		currentList.appendChild(listItem);

		return this.pageContainsOverflowingNodes(currentPage);
	}

	addItemToLastList(listItem) {
		this.lists[this.lists.length-1].appendChild(listItem);
	}
}