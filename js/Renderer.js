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

		if (!this.pages.length) {
			this.createNewPage();
		}
	}

	/**
	 * Remove the overflow from the last page as this doesn't happen automagically,
	 * add a clone of the relevant page template to the pages for state tracking
	 * and append the new page to the destination so I can render items to it later.
	 * 
	 * @returns {void}
	 */
	createNewPage() {

		let page;

		if (!this.pages.length) {
			page = this.templates.firstPage.cloneNode(true);
		}
		else {
			this.removeOverflowLastPage();
			page = this.templates.page.cloneNode(true);
		}

		this.pages.push(page);

		this.contentDestination.appendChild(page);
	}

	/**
	 * When the current page overflows I immediately remove the last added element
	 * to stop the overflowing. Sadly the browser is not smart enough to check if 
	 * removing the scrollbar would result in potentially not needing the scrollbar 
	 * anymore. For this edgecase I have to explicitly set the overflow to hidden.* 
	 * 
	 * @returns {void}
	 */
	removeOverflowLastPage() {
		this.pages[this.pages.length-1].setAttribute('style', 'overflow: hidden;');
	}

	/**
	 * Append the given element to the latest page.
	 * 
	 * @param {Element} item 
	 * @returns {void}
	 */
	addItemToLastPage(item) {
		this.pages[this.pages.length-1].querySelector('.content').appendChild(item);
	}
}