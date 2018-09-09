class RenderList extends Renderer {
	constructor(contentDivider, ul) {
		super(contentDivider);
		
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

		if (currentPage.scrollHeight > currentPage.clientHeight) {
			return true;
		}
		
		return false;
	}

	addItemToLastList(listItem) {
		this.lists[this.lists.length-1].appendChild(listItem);
	}
}