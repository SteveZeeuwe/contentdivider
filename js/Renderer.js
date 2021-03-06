/**
 * @file Renderer.js
 *
 * Base renderer to be extended by specific render classes.
 *
 * @author Steve Zeeuwe <szeeuwe@gmail.com>
 * @author Yann Zeeuwe <yannzeeuwe@gmail.com>
 *
 * @version 1.0.0
 */

class Renderer {
	constructor(renderProperties) {
		this.renderProperties = renderProperties;

        if (!this.renderProperties.pages.length) {
        	this.createNewPage(true);
        }
	}

	/**
	 * Remove the overflow from the last page as this doesn't happen automagically,
	 * add a clone of the relevant page template to the pages for state tracking
	 * and append the new page to the destination so I can render items to it later.
	 * 
	 * @returns {void}
	 */
	createNewPage(first = false) {
        let page;

		if (first) {
            page = this.renderProperties.templates.firstPage.cloneNode(true);
		}
		else {
            page = this.renderProperties.templates.page.cloneNode(true);
		}

		page.contentNodes = Array.from(page.querySelectorAll('.content')).map(( contentNode => {
            contentNode.active = false;
			return contentNode;
		}));

		page.contentNodes[0].active = true;

        this.renderProperties.pages.push(page);
        this.renderProperties.contentDestination.appendChild(page);
	}

    /**
	 * Do an overflow check specifically for the last page
	 *
     * @returns {boolean}
     */
	lastPageContainsOverflowingNodes() {
		return this.pageContainsOverflowingNodes(this.renderProperties.pages[this.renderProperties.pages.length-1]);
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
	 * Try to add content to the latest contentNode
	 *
     * @param first: the first function to call
     * @param second: function to call when first function results in overflow, after a new contentNode is prepared
     */
	addContent(first, second = null) {
        first();

		if (this.lastPageContainsOverflowingNodes()) {
			this.makeNextContentNodeActiveOrCreateNewPage();

			if (typeof second === 'function') {
                this.addContent(second, true);
            }
            else if (second === true) {
				this.addContent(first, true);
			}
		}
	}

    /**
	 * Move a node to the last contentNode
	 *
     * @param item
     */
    moveNodeToLastContentNode(item) {
        this.getLastActiveContentNode().appendChild(item);
	}

    /**
	 * Find the latest active contentNode
	 *
     * @returns null or Node
     */
	getLastActiveContentNode() {
    	let activeContentNode = null;

        this.renderProperties.pages[this.renderProperties.pages.length-1].contentNodes.forEach((contentNode) => {
			if (contentNode.active) {
                activeContentNode =  contentNode;
			}
		});

        return activeContentNode;
	}

    /**
	 * Find the next inactive node on the last page
	 *
     * @returns null or Node
     */
	findNextInactiveContentNodeOnLastPage() {
		let nextInactiveContentNode = null;

        this.renderProperties.pages[this.renderProperties.pages.length-1].contentNodes.forEach((contentNode) => {
            if (contentNode.active === false && nextInactiveContentNode === null) {
                nextInactiveContentNode = contentNode;
            }
        });

        return nextInactiveContentNode;
	}

    /**
     * Find the next inactive node on the last page
     *
     * @returns (void)
     */
	makeNextContentNodeActiveOrCreateNewPage() {
		let nextContentNode = this.findNextInactiveContentNodeOnLastPage();

        if (nextContentNode !== null) {
            nextContentNode.active = true;
        }
        else {
            this.createNewPage();
		}
	}
}