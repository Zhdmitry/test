import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DragDropSortableService } from 'ng2-dnd';
import { ApiService } from '../../services/api-service.service';
import { AlertService } from './../../services/alert-service.service';
import { Query } from '../../models/query';
import { Relation } from './../../models/relation';
import { Column } from './../../models/column';

@Component({
    selector: 'index-page-sortable',
    templateUrl: './index-page-sortable.component.html',
    styleUrls: ['../shared/list.css']
})
export class IndexPageSortableComponent implements OnInit, AfterViewInit {
    @Input() properties;
    columns: Array<Column>;
    @Input() title = 'List view';
    @Input() relations: Array<Relation>;

    api: string;
    page = 1;
    paginationOptions = [10, 15, 20];
    count: number;
    filterProp = '';
    query: Query;
    sortProp = 'order';
    order = 'ASC';
    deleteEntity: number;
    entities: any;
    orderChanged = false;
    minOrder: number;

    get itemsPerPage() {
        let res = localStorage.getItem('itemsPerPage');
        if (!res) {
            localStorage.setItem('itemsPerPage', '10');
            return 10;
        }
        return parseInt(res, 10);
    }
    set itemsPerPage(val) {
        let res = parseInt(val.toString(), 10);
        let res2 = isNaN(res) ? '10' : res.toString();
        localStorage.setItem('itemsPerPage', res2);
    }

    constructor(
        private apiService: ApiService,
        private actRoute: ActivatedRoute,
        private sortService: DragDropSortableService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.actRoute.data.subscribe(val => {
            this.api = val['api'];
            this.apiService.mainPath = this.api;
            this.getEntities();
        });
        this.columns = new Array<Column>();
        for (let prop of this.properties) {
            this.columns.push(new Column(prop, true, prop.toLowerCase()));
        }
    }
    ngAfterViewInit() {
        document.getElementById('filter').onkeyup = (e) => {
            if (e.keyCode === 13) {
                this.filter();
            } else if (e.keyCode === 27) {
                this.filterProp = '';
                this.filter();
            }
        };
    }
    getRelations() {
        if (this.relations) {
            for (let rel of this.relations) {
                this.apiService.mainPath = rel.relatedApi;
                this.apiService.get('').subscribe(x => {
                    let res = x.json().data;
                    for (let obj of this.entities) {
                        let prop = res.filter(y => y[rel.relatedProperty] === obj[rel.compareProperty])[0][rel.displayProperty];
                        obj[rel.displayProperty] = prop;
                    }
                    if (!this.properties.some(z => z === rel.displayProperty)) {
                        this.properties.push(rel.displayProperty);
                        this.columns.push(new Column(rel.displayProperty, true, rel.title, rel.compareProperty));
                    }
                });
            }
        }
    }
    sort(prop: string) {
        this.order = this.sortProp === prop ? (this.order === 'ASC' ? 'DESC' : 'ASC') : 'ASC';
        this.sortProp = prop;
        this.getEntities();
    }
    filter() {
        this.getEntities();
    }
    onDelete(modal: any, deleteEntity: number) {
        this.deleteEntity = deleteEntity;
        modal.open();
    }
    confirmDelete(modal: any) {
        this.apiService.mainPath = this.api;
        this.apiService.delete(this.deleteEntity).subscribe(x => {
            this.alertService.success('Success', `${this.api} #${this.deleteEntity} was deleted`);
            this.getEntities();
        },
            err => {
                this.alertService.error('Error', `While deleting ${this.api} #${this.deleteEntity}`);
                this.getEntities();
            });
        modal.close();
        return false;
    }
    getEntities() {
        this.query = new Query(
            (this.page - 1) * this.itemsPerPage,
            this.page * this.itemsPerPage,
            this.sortProp, this.order,
            this.filterProp);
        this.apiService.mainPath = this.api;
        this.apiService.get(this.query).subscribe(x => {
            this.count = x.json().count;
            this.entities = x.json().data;
            this.minOrder = Math.min.apply(Math, this.entities.map(y => y.order));
            this.getRelations();
        });
    }
    getPage(page: number) {
        this.page = page;
        this.getEntities();
    }
    onOrderChange() {
        this.orderChanged = true;
    }
    onOrderSave() {
        let sorted = {};
        for (let i = 0; i < this.entities.length; i++) {
            let id = this.entities[i].id;
            let value = i + this.minOrder;
            sorted[id] = value;
        }
        this.apiService.mainPath = this.api;
        this.apiService.put('', sorted).subscribe(x => {
            this.alertService.success('Success', `Order of ${this.api} was changed`);
            this.getEntities();
            this.orderChanged = false;
        });
    }

}
