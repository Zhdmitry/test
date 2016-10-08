import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.css']
})
export class SelectComponent implements OnInit {


  @Input() listValues;
  _list: Array<any>;
  _value;


  @Input() set value(e) {
    this.control.setValue(e);
    this._value = e;
  };

  get value() {
    return this.control.value;
  }
  constructor() {
  }

  control = new FormControl();


  @Output() valueOut = new EventEmitter();


  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      this.valueOut.emit(parseInt(value, 10));
      console.log(value);
    });
    if (this._value) {
      let i_element = this.listValues.findIndex(r => r.value === this._value);
      let el = this.listValues[i_element];
      let new_list = [...this.listValues.slice(0, i_element), ...this.listValues.slice(i_element + 1, this.listValues.length)]
      console.log(new_list);
      console.log(this.listValues);;
      new_list.unshift(el);
      this._list = new_list;
    } else {
      //if default value is null
      this._list = this.listValues;
       this.valueOut.emit(parseInt(this._list[0].value, 10));
    }
  }

}
