class RenderParagraph extends Renderer {
	constructor(renderProperties, paragraph) {
		super(renderProperties);

		this.paragraph = paragraph.cloneNode();
		this.paragraphWords = paragraph.innerHTML.split(' ');

		this.paragraphs = [];
	}

	render() {
		this.addParagraphToLastContentNode();

		this.paragraphWords.forEach((word, index) => {
            this.addContent(
                () => {
                    this.addWordToLastParagraph(word);
                },
                () => {
                    this.removeWordFromLastParagraph();
                    this.addParagraphToLastContentNode();
                    this.addWordToLastParagraph(word);
                }
            );
		});
	}

	addParagraphToLastContentNode() {
		let paragraph = this.paragraph.cloneNode();

		this.moveNodeToLastContentNode(paragraph);

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