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
	 * @param {string} contentId 
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
	 * 
	 * @returns {boolean}
	 */
	checkPrerequisites() {
		if(this.contentEl && this.contentItems.length > 0 && this.contentDestination ){
			return true;
		}

		return false;
	}

	/**
	 * Store the template elements.
	 * 
	 * @returns {Object}
	 */
	getTemplates() {
		const pages = ['page', 'firstPage'];
		const templates = {};

		if(this.contentDestination){
			pages.forEach((page) => {
				let currentPage = this.contentDestination.querySelector(`[data-template=${page}]`);
	
				if(currentPage) {
					templates[page] = currentPage.cloneNode(true);
	
					currentPage.remove();
					return;
				}

				console.log('ContentDivider: page template not found for: ' + this.contentId);
			});
		}

		return templates;
	}

	/**
	 * Render all content items by using the relevant render object.
	 *
	 * @returns {void}
	 */
	render() {
		this.contentItems.forEach((contentItem, index) => {
			let renderer = null;

			switch(contentItem.nodeName) {
				case 'P':
					renderer = new RenderParagraph(this, contentItem);
					break;
				case 'UL':
					renderer = new RenderList(this, contentItem);
					break;
				case 'TABLE':
					renderer = new RenderTable(this, contentItem);
					break;
				default:
					renderer = new RenderSimple(this, contentItem);
			}

			if (renderer) {
				renderer.render();
			}
		});

		return;
	}
}