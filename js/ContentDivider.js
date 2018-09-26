/**
 * @file ContentDivider.js
 *
 * Gather content, content destination and page templates.
 * Create relevant renderer to render content onto page templates.
 *
 * @author Steve Zeeuwe <szeeuwe@gmail.com>
 * @author Yann Zeeuwe <yannzeeuwe@gmail.com>
 *
 * @version 1.0.0
 */

class ContentDivider{
	constructor(contentId){
		this.contentEl = this.getContentEl(contentId);
		this.contentItems = this.getContentItems();
		this.contentDestination = this.getContentDestination();
		this.templates = this.getTemplates();
		this.pages = [];
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
		return this.contentEl && this.contentItems.length > 0 && this.contentDestination && this.templates.hasOwnProperty('page') && this.templates.hasOwnProperty('firstPage');
	}

	/**
	 * Store the template elements.
	 * TODO: Figure out whether it is better to nest 
	 * 		 the if statement or to have two returns.
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
	 * Check whether all is good to go
	 * Start rendering the content from its origin to the templates
	 * Cleanup possible unnecessary DOM elements
	 *
	 * @returns {void}
	 */
	render() {
		if(!this.checkPrerequisites()){
			console.log('ContentDivider: could not start rendering');

			return;
		}

		this.renderNodes();
		this.cleanDOM();

		return;
	}

    /**
	 * Render all content items by using the relevant render object.
	 *
	 * @returns {void}
     */
	renderNodes() {
        const renderProperties = {
            contentDestination: this.contentDestination,
            templates: this.templates,
            pages: this.pages
        };

        this.contentItems.forEach((contentItem, index) => {
            let renderer = null;

            if (contentItem.dataset.hasOwnProperty('unbreaking')) {
                renderer = new RenderSimple(renderProperties, contentItem);
            }
            else {
                switch (contentItem.nodeName) {
                    case 'P':
                        renderer = new RenderParagraph(renderProperties, contentItem);
                        break;
                    case 'UL':
                        renderer = new RenderList(renderProperties, contentItem);
                        break;
                    case 'TABLE':
                        renderer = new RenderTable(renderProperties, contentItem);
                        break;
                    default:
                        renderer = new RenderSimple(renderProperties, contentItem);
                }
            }
            renderer.render();
        });
	}

    /**
	 * Remove all direct child-nodes from all contentNodes with 0 height from the DOM
	 *
	 * @returns {void}
     */
	cleanDOM() {
        Array.from(this.contentDestination.querySelectorAll('.content > *')).forEach((node) => {
        	if (node.offsetHeight === 0) {
                node.remove();
			}
		});
	}
}