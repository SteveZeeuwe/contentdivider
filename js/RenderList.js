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
			this.moveItemToLastList(listItem);

			if (this.lastPageContainsOverflowingNodes()) {
				this.createNewPage();
				this.addListToLastPage();
				this.moveItemToLastList(listItem);
			}
		});
	}

	addListToLastPage() {
		let list = this.list.cloneNode();

		this.moveNodeToLastPage(list);

		this.lists.push(list);
	}

	moveItemToLastList(listItem) {
		this.lists[this.lists.length-1].appendChild(listItem);
	}
}