import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DragDropSortableService } from 'ng2-dnd';
import { Query } from '../../models/query';
import { ApiService } from './../../services/api-service.service';
import { AlertService } from './../../services/alert-service.service';


// TODO delete element button . it should output id of clicked element
@Component({
    selector: 'light-sortable',
    templateUrl: './light-sortable.component.html',
    styleUrls: ['../shared/list.css']
})
export class LightSortableComponent implements OnInit {
    @Input() entities;
    @Input() properties;
    screenshotsUrl = 'screenshots';
    @Input() title = 'Screenshots';
    @Output() sorted = new EventEmitter();
    @Output() delete = new EventEmitter();

    api: string;
    query: Query;
    orderChanged = false;
    minOrder: number;

    constructor(
        private sortService: DragDropSortableService,
        private apiService: ApiService,
        private alert: AlertService
    ) {

    }

    ngOnInit() {

    }
    onOrderChange() {
        this.orderChanged = true;
    }
    onOrderSave() {
        let sorted = {};
        for (let i = 0; i < this.entities.length; i++) {
            let id = this.entities[i].id;
            sorted[id] = i + 1;
        }
        this.sorted.emit(sorted);
        this.orderChanged = false;
    }

    onDelete(index: number) {
        this.apiService.mainPath = '/' + this.screenshotsUrl;
        this.apiService.delete(index).subscribe(
            r => {
                this.alert.info('success', 'screenshot' + index + ' deleted');
                this.delete.emit(index);
            },
            err => {
                this.alert.warning('warning', err.body);
                this.delete.emit(index);
            }
        );
        return false;
    }

}
