export class Column {
    constructor(
        // property to get from the database
        public dbProperty: string,
        public sortable = true,
        // property to display as the title
        public displayProperty = dbProperty,
        // property which is used for sorting
        public orderProperty = dbProperty
    ) { }
}