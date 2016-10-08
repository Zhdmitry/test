import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Query } from '../../models/query';
import { ApiService } from '../../services/api-service.service';
import { AlertService } from './../../services/alert-service.service';

@Component({
  selector: 'app-index-page',
  templateUrl: 'index-page.component.html',
  styleUrls: ['../shared/list.css']
})
export class IndexPageComponent implements OnInit, AfterViewInit {
    @Input() properties;
    @Input() title = 'Screenshot';
    api: string;
    page = 1;
    count: number;
    filterProp = '';
    query: Query;
    sortProp = 'order';
    order = 'ASC';
    deleteEntity: number;
    entities: any;
    orderChanged = false;
    minOrder: number;
    paginationOptions = [10, 15, 20];

    constructor(
        private apiService: ApiService,
        private actRoute: ActivatedRoute,
        private alertService: AlertService
    ) { }

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

    ngOnInit() {
        this.actRoute.data.subscribe(val => {
            this.api = val['api'];
            this.apiService.mainPath = this.api;
            this.getEntities();
        });
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
        this.apiService.delete(this.deleteEntity).subscribe(x => {
            this.alertService.success('Success', `${this.api} #${this.deleteEntity} was deleted`);
            this.getEntities();
        },
        err => {
            this.alertService.error('Error', `While deleting ${this.api} #${this.deleteEntity}`);
            this.getEntities();
        });
        modal.close();
    }
    getEntities() {
        this.query = new Query(
            (this.page - 1) * this.itemsPerPage,
            this.page * this.itemsPerPage,
            this.sortProp, this.order,
            this.filterProp);

        this.apiService.get(this.query).subscribe(x => {
            this.count = x.json().count;
            this.entities = x.json().data;
            this.minOrder = Math.min.apply(Math, this.entities.map(x => x.order));
        });
    }
    getPage(page: number) {
        this.page = page;
        this.getEntities();
    }
}
