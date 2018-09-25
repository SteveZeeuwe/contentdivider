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
	}

	render() {
        this.addTableToLastPage();

		this.tableRows.forEach((tableRow, index) => {
            this.moveRowToLastTable(tableRow);

			if (this.lastPageContainsOverflowingNodes()) {
				this.createNewPage();
				this.addTableToLastPage();
				this.moveRowToLastTable(tableRow);
            }
		});

		this.addFooterToLastTable();
	}

	addTableToLastPage() {
		let table = this.table.cloneNode();

		this.moveNodeToLastPage(table);

		this.tables.push(table);

		this.addHeaderToLastTable();
		this.addBodyToLastTable();
	}

	moveRowToLastTable(tableRow) {
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