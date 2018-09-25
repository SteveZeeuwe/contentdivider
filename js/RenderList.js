class RenderList extends Renderer {
	constructor(renderProperties, ul) {
		super(renderProperties);
		
		this.list = ul.cloneNode();
		this.listItems = Array.from(ul.children);

		this.lists = [];
	}

	render() {
        this.addListToLastContentNode();

		this.listItems.forEach((listItem, index) => {
            this.addContent(
                () => {
                    this.moveItemToLastList(listItem);
                },
                () => {
                    this.addListToLastContentNode();
                    this.moveItemToLastList(listItem);
                }
            );
		});
	}

	addListToLastContentNode() {
		let list = this.list.cloneNode();

		this.moveNodeToLastContentNode(list);

		this.lists.push(list);
	}

	moveItemToLastList(listItem) {
		this.lists[this.lists.length-1].appendChild(listItem);
	}
}