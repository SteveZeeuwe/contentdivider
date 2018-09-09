/**
 * @file ContentDivider.js
 *
 * Simple explanation
 *
 * @author Steve Zeeuwe <szeeuwe@gmail.com>
 * @author Yann Zeeuwe <yannzeeuwe@gmail.com>
 * @version 1.0.0
 */

class ContentDivider{
	constructor(contentId){
		this.contentId = contentId;

		if (this.init(contentId) && this.initTemplates()) {
			this.render();
		}
		else {
			console.log('ContentDivider: could not continue processing: ' + contentId);
		}	
	}

	/**
	 * Check for content and children.
	 * 
	 * @returns {Boolean}
	 */
	init() {
		this.contentFrom = document.querySelector('#' + this.contentId);

		if (!this.contentFrom || !this.contentFrom.children.length) {
			console.log('ContentDivider: content not found: ' + this.contentId);

			return false;
		}

		this.content = Array.from(this.contentFrom.children);

		this.contentTo = document.querySelector('#' + this.contentFrom.dataset.to);

		if (!this.contentTo) {

			console.log('ContentDivider: contentTo not found: ' + this.contentFrom.dataset.to);

			return false;
		}

		this.pages = [];

		return true;
	}

	/**
	 * Check for templates.
	 * 
	 * @returns {Boolean}
	 */
	initTemplates() {
		this.templates = {};

		let page = this.contentTo.querySelector('[data-template=page]');

		if (!page) {
			console.log('ContentDivider: page template not found for: ' + this.contentId);

			return false;
		}
		else {
			this.templates.page = page.cloneNode(true);

			page.remove();
		}

		let firstPage = this.contentTo.querySelector('[data-template=firstPage]');		

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

		this.content.forEach((contentItem, index) => {
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