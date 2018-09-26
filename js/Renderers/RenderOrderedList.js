/**
 * @file RenderUnorderedListderedList.js
 *
 * Renders a list item by item
 *
 * @author Steve Zeeuwe <szeeuwe@gmail.com>
 * @author Yann Zeeuwe <yannzeeuwe@gmail.com>
 *
 * @version 1.0.0
 */

class RenderOrderedList extends Renderer {
	constructor(renderProperties, ul) {
		super(renderProperties);
		
		this.list = ul.cloneNode();
		this.listItems = Array.from(ul.children);

		this.lists = [];
		this.counter = 1;
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

            this.counter++;
		});
	}

	addListToLastContentNode() {
		let list = this.list.cloneNode();
		list.setAttribute('start', this.counter);

		this.moveNodeToLastContentNode(list);

		this.lists.push(list);
	}

	moveItemToLastList(listItem) {
		this.lists[this.lists.length-1].appendChild(listItem);
	}
}