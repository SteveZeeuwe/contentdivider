/**
 * @file ContentDivider.js
 *
 * Simple explanation
 *
 * @author Steve Zeeuwe <szeeuwe@gmail.com>
 * @version 1.0.0
 */

class ContentDivider{
	constructor(contentId){
		this.contentEl = this.setContentEl(contentId);
		this.contentItems = this.setContentItems();
		this.contentDestination = this.setContentDestination();
		this.pages = [];

		if(!this.checkPrerequisites()){
			return;
		}

		if (this.initTemplates()) {
			this.render();
		}
		else {
			console.log('ContentDivider: could not continue processing: ' + contentId);
		}	
	}

	setContentEl(contentId) {
		return document.querySelector('#' + contentId);
	}

	setContentItems() {
		if(this.contentEl){
			return Array.from(this.contentEl.children);
		}

		return [];
	}

	setContentDestination() {
		if(this.contentEl){
			return document.querySelector('#' + this.contentEl.dataset.to);
		}
	}

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
	initTemplates() {
		this.templates = {};

		let page = this.contentDestination.querySelector('[data-template=page]');

		if (!page) {
			console.log('ContentDivider: page template not found for: ' + this.contentId);

			return false;
		}
		else {
			this.templates.page = page.cloneNode(true);

			page.remove();
		}

		let firstPage = this.contentDestination.querySelector('[data-template=firstPage]');		

		if (!firstPage) {
			this.templates.firstPage = page.cloneNode(true);

			console.log('ContentDivider: firstPage not found using page template for: ' + this.contentId);
		}
		else {
			this.templates.firstPage = firstPage.cloneNode(true);

			firstPage.remove();
		}

		return true;
	}

	/**
	 * Check for prerequisites.
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