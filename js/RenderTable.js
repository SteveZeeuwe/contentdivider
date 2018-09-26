/**
 * @file RenderTable.js
 *
 * Renders a table divided over pages
 * Takes the following into account:
 * - re-rendering of table head when opening new table on new page
 * - only rendering the footer at the bottom of the last table
 * - clones all element properties into every generated table
 *
 * @author Steve Zeeuwe <szeeuwe@gmail.com>
 * @author Yann Zeeuwe <yannzeeuwe@gmail.com>
 *
 * @version 1.0.0
 */

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
        this.addTableToLastContentNode();

		this.tableRows.forEach((tableRow) => {

            this.addContent(
                () => {
                    this.moveRowToLastTable(tableRow);
                },
                () => {
					//tablerow weghalen
					let tableRowClone = tableRow.cloneNode(true);
					tableRow.remove ();

					this.addTableToLastContentNode();

					this.moveRowToLastTable(tableRowClone);
                }
            );
		});

		this.addFooterToLastTable();
	}

	addTableToLastContentNode() {
        let table = this.table.cloneNode();

        this.tables.push(table);

        this.addHeaderToLastTable();
        this.addBodyToLastTable();

        this.addContent(
            () => {
                this.moveNodeToLastContentNode(table);
            },
			true
        );
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