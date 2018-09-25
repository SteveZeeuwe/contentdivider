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
        this.moveNodeToLastPage(this.contentItem);

		if (this.lastPageContainsOverflowingNodes()) {
			this.createNewPage();
            this.moveNodeToLastPage(this.contentItem);
		}
	}
}