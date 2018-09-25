class RenderList extends Renderer {
	constructor(renderProperties, ul) {
		super(renderProperties);
		
		this.list = ul.cloneNode();
		this.listItems = Array.from(ul.children);

		this.lists = [];
	}

	render() {
        this.addListToLastPage();

		this.listItems.forEach((listItem, index) => {
            this.addContent(
                () => {
                    this.moveItemToLastList(listItem);
                },
                () => {
                    this.addListToLastPage();
                    this.moveItemToLastList(listItem);
                }
            );
		});
	}

	addListToLastPage() {
		let list = this.list.cloneNode();

		this.moveNodeToLastContentDiv(list);

		this.lists.push(list);
	}

	moveItemToLastList(listItem) {
		this.lists[this.lists.length-1].appendChild(listItem);
	}
}