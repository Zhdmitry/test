import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DragDropSortableService } from 'ng2-dnd';
import { ApiService } from './../../services/api-service.service';
import { AlertService } from './../../services/alert-service.service';

@Component({
    selector: 'image-list',
    templateUrl: 'image-list.component.html',
    styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
    @Input() entities;
    @Input() properties;
    @Input() imageProperty;
    // @Output() sorted = new EventEmitter();
    @Output() delete = new EventEmitter();

    minOrder: number;

    constructor(
        private sortService: DragDropSortableService,
        private apiService: ApiService,
        private alert: AlertService
    ) { }

    ngOnInit() { }

    // onOrderChange() {
    //     let sorted = {};
    //     for (let i = 0; i < this.entities.length; i++) {
    //         let id = this.entities[i].id;
    //         sorted[id] = i + 1;
    //     }
    //     this.sorted.emit(sorted);
    // }

    onDelete(index: number) {
        this.delete.emit(index);
    }
}