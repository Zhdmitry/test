import {Component, OnInit, forwardRef, EventEmitter} from '@angular/core';
import {Input, Output} from "@angular/core";


@Component({
    selector: 'app-toggle',
    template:`
         <div class="form-group row">
            <label class="col-md-3 form-control-label" for="visible"><ng-content></ng-content></label>
            <div class="col-md-9">
              <label class="switch switch-3d switch-primary">
                <input name="visible" id="visible" class="switch-input" type="checkbox" [(ngModel)]="ngModel" value="comments" checked>
                <span class="switch-label"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
            </div>
`

})
export class ToggleComponent{
    @Input() value: boolean=false;
    @Output() valueChange = new EventEmitter();
    constructor() { }

    ngOnInit() {
        this.ngModel=this.value;
    }

    get ngModel(){
        return this.value;
    }

    set ngModel(value) {
        this.valueChange.emit(value);
    }
}