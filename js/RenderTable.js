class RenderTable extends Renderer {
	constructor(renderProperties, table) {
		super(renderProperties);
		
		this.table = table.cloneNode();
		this.tableHeader = null;
		this.tableFooter = null;
		this.tableRows = [];

		if (table.tHead) {
			this.tableHeader = table.tHead.cloneNode(true);
		}
		
		if (table.tFoot) {
			this.tableFooter = table.tFoot.cloneNode(true);
		}

		this.tableRows = Array.from(table.tBodies[0].children);

		this.tables = [];

		this.addTableToLastPage();
	}

	render() {
		this.tableRows.forEach((tableRow, index) => {
			if (this.ifAddRowToLastTableOverflows(tableRow)) {
				this.createNewPage();
				this.addTableToLastPage();
			}

			this.addRowToLastTable(tableRow);
		});

		this.addFooterToLastTable();
	}

	addTableToLastPage() {
		let table = this.table.cloneNode();

		this.addItemToLastPage(table);

		this.tables.push(table);

		this.addHeaderToLastTable();
		this.addBodyToLastTable();
	}

	ifAddRowToLastTableOverflows(tableRow) {
		let currentPage = this.pages[this.pages.length-1];
		let currentTable = this.tables[this.tables.length-1];

		currentTable.tBodies[0].appendChild(tableRow);

		return currentPage.scrollHeight > currentPage.clientHeight;
	}

	addRowToLastTable(tableRow) {
		this.tables[this.tables.length-1].tBodies[0].appendChild(tableRow);
	}

	addBodyToLastTable() {
		this.tables[this.tables.length-1].appendChild(document.createElement("tbody"));
	}

	addHeaderToLastTable() {
		if (this.tableHeader) {
			this.tables[this.tables.length-1].appendChild(this.tableHeader.cloneNode(true));
		}
	}

	addFooterToLastTable() {
		if (this.tableFooter) {
			this.tables[this.tables.length-1].appendChild(this.tableFooter.cloneNode(true));
		}				
	}
}