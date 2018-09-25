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
			this.addWordToLastParagraph(word);

			if (this.lastPageContainsOverflowingNodes()) {
				this.removeWordFromLastParagraph();

				this.createNewPage();
				this.addParagraphToLastPage();
				this.addWordToLastParagraph(word);
			}					
		});
	}

	addParagraphToLastPage() {
		let paragraph = this.paragraph.cloneNode();

		this.moveNodeToLastPage(paragraph);

		this.paragraphs.push(paragraph);
	}

	addWordToLastParagraph(word) {
		this.paragraphs[this.paragraphs.length-1].textContent += ' ' + word;
	}

	removeWordFromLastParagraph() {
		let p = this.paragraphs[this.paragraphs.length-1];
        p.textContent = p.textContent.substring(0, p.textContent.lastIndexOf(" "));
	}
}