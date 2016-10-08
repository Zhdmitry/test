export class Work {
    constructor(
        public id: number,
        public title: string,
        public titleColor: string,
        public decription: string,
        public descriptionColor: string,
        public backgroundColor: string,
        public order?: number,
        public visible?: boolean,
        public screenshots?: any[]
    ) {}
}