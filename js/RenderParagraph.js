class RenderParagraph extends Renderer {
	constructor(renderProperties, paragraph) {
		super(renderProperties);
		
		this.paragraph = paragraph.cloneNode();
		this.paragraphWords = paragraph.innerHTML.split(' ');

		this.paragraphs = [];
	}

	render() {
		this.addParagraphToLastPage();

		this.paragraphWords.forEach((word, index) => {
			if (this.ifAddWordToLastParagraphOverflows(word)) {
				this.createNewPage();
				this.addParagraphToLastPage();
				this.addWordToLastParagraph(word);
			}					
		});
	}

	addParagraphToLastPage() {
		let paragraph = this.paragraph.cloneNode();

		this.addItemToLastPage(paragraph);

		this.paragraphs.push(paragraph);
	}

	ifAddWordToLastParagraphOverflows(word) {
		let currentPage = this.pages[this.pages.length-1];
		let currentParagraph = this.paragraphs[this.paragraphs.length-1];

		currentParagraph.textContent += ' ' + word;

		if (this.pageContainsOverflowingNodes(currentPage)) {
			currentParagraph.textContent = currentParagraph.textContent.substring(0, currentParagraph.textContent.lastIndexOf(" "));

			return true;
		}
		
		return false;
	}

	addWordToLastParagraph(word) {
		this.paragraphs[this.paragraphs.length-1].textContent += ' ' + word;
	}
}