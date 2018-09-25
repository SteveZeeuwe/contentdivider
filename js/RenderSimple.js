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
        this.addContent(
			() => {
				this.moveNodeToLastContentNode(this.contentItem);
			}
		);
	}
}