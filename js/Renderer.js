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
		this.removeOverflowLastPage();
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
	 * When the current page overflows I immediately remove the last added element
	 * to stop the overflowing. Sadly the browser is not smart enough to check if 
	 * removing the scrollbar would result in potentially not needing the scrollbar 
	 * anymore. For this edgecase I have to explicitly set the overflow to hidden.* 
	 * 
	 * @returns {void}
	 */
	removeOverflowLastPage() {
		this.pages[this.pages.length-1].classList.add('Full');
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