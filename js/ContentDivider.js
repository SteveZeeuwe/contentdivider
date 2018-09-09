/**
 * @file ContentDivider.js
 *
 * Render content items onto templates.
 *
 * @author Steve Zeeuwe <szeeuwe@gmail.com>
 * @version 1.0.0
 */

class ContentDivider{
	constructor(contentId){
		this.contentEl = this.getContentEl(contentId);
		this.contentItems = this.getContentItems();
		this.contentDestination = this.getContentDestination();
		this.templates = this.getTemplates();
		this.pages = [];

		if(!this.checkPrerequisites()){
			console.log('ContentDivider: could not continue processing: ' + contentId);

			return;
		}

		this.render();
	}

	/**
	 * Retrieve the contentElement.
	 * 
	 * @param {String} contentId 
	 * @returns {Element|null}
	 */
	getContentEl(contentId) {
		return document.querySelector('#' + contentId);
	}

	/**
	 * Retrieve all content items.
	 * 
	 * @returns {Array}
	 */
	getContentItems() {
		if(this.contentEl){
			return Array.from(this.contentEl.children);
		}

		return [];
	}

	/**
	 * Retrieve the container element where 
	 * we will render the content into.
	 * 
	 * @returns {Element|null}
	 */
	getContentDestination() {
		if(this.contentEl){
			return document.querySelector('#' + this.contentEl.dataset.to);
		}

		return null;
	}

	/**
	 * Check whether we should continue or not.
	 */
	checkPrerequisites() {
		if(this.contentEl && this.contentItems.length > 0 && this.contentDestination ){
			return true;
		}

		return false;
	}

	/**
	 * Check for templates.
	 * 
	 * @returns {Boolean}
	 */
	getTemplates() {

		const pages = ['page', 'firstPage'];
		const templates = {};

		pages.forEach((page) => {
			let currentPage = this.contentDestination.querySelector(`[data-template=${page}]`);

			if (!currentPage) {
				console.log('ContentDivider: page template not found for: ' + this.contentId);
			}
			else {
				templates[page] = currentPage.cloneNode(true);

				currentPage.remove();
			}
		});

		return templates;
	}

	/**
	 * Render all content items by using the relevant render object.
	 *
	 * @returns {void}
	 */
	render() {
		let renderer = null;

		this.contentItems.forEach((contentItem, index) => {
			if(contentItem.nodeName === 'P') {
				renderer = new RenderParagraph(this, contentItem);
			}
			else if (contentItem.nodeName === 'UL') {
				renderer = new RenderList(this, contentItem);
			}
			else if(contentItem.nodeName === 'TABLE') {
				renderer = new RenderTable(this, contentItem);
			}
			else {
				renderer = new RenderSimple(this, contentItem);
			}

			if (renderer) {
				renderer.render();
			}
		});

		return;
	}
}