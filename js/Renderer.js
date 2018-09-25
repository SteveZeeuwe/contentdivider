/**
 * @file Renderer.js
 *
 * Base renderer to be extended by specific render classes.
 *
 * @author Steve Zeeuwe <szeeuwe@gmail.com>
 * @version 1.0.0
 */

class Renderer {
	constructor(renderProperties) {
		this.contentDestination = renderProperties.contentDestination;
		this.templates = renderProperties.templates;
		this.pages = renderProperties.pages;
	}

	/**
	 * Remove the overflow from the last page as this doesn't happen automagically,
	 * add a clone of the relevant page template to the pages for state tracking
	 * and append the new page to the destination so I can render items to it later.
	 * 
	 * @returns {void}
	 */
	createNewPage() {
		const page = this.templates.page.cloneNode(true);
		this.pages.push(page);
		this.contentDestination.appendChild(page);
	}

	/**
	 * Append the first page to the destination element.
	 * 
	 * @param {Object} renderProperties
	 * @returns {void}
	 */
    static createFirstPage(renderProperties){
		const page = renderProperties.templates.firstPage.cloneNode(true);

		renderProperties.pages.push(page);
		renderProperties.contentDestination.appendChild(page);
	}

    /**
	 * Do an overflow check specifically for the last page
	 *
     * @returns {boolean}
     */
	lastPageContainsOverflowingNodes() {
		return this.pageContainsOverflowingNodes(this.pages[this.pages.length-1]);
	}

    /**
	 * Check whether there are overflowing content nodes on this page
	 * Also checks the overflowing of the page itself.
	 *
     * @param page
     * @returns {boolean}
     */
	pageContainsOverflowingNodes(page) {
        let nodes = [page];
        let overflow = false;

        page.querySelectorAll('.content').forEach((node) => {
        	nodes.push(node);
		});

        nodes.forEach((node) => {
            if (this.nodeOverflows(node)) {
                overflow = true;
            }
        });

        return overflow;
	}

    /**
	 * Check whether a single node is overflowing
	 * Requirement: the overflow CSS property of this node may not be 'default'
	 * If not set, the browser automatically sets this property to 'default'.
	 *
     * @param node
     * @returns {boolean}
     */
	nodeOverflows(node) {
		return node.scrollHeight > node.offsetHeight;
	}

	/**
	 * Append the given element to the latest page.
	 * 
	 * @param {Element} item 
	 * @returns {void}
	 */
    moveNodeToLastPage(item) {
		this.pages[this.pages.length-1].querySelector('.content').appendChild(item);
	}
}