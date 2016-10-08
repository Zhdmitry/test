import { Component, OnInit, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';


@Component({
    selector: 'app-input',
    templateUrl: 'input.component.html'

})
export class InputComponent implements OnInit {
    @Input() placeholder = 'enter text...';
    @Input() required: boolean = false;
    @Input() type = 'text';
    @Input() value: string = '';
    @Input() alert: string = '';
    @Output() valueChange = new EventEmitter();
    constructor() { }

    ngOnInit() {
        this.ngModel = this.value;
    }

    get ngModel() {
        return this.value;
    }

    set ngModel(value) {
        this.valueChange.emit(value);
    }
}
