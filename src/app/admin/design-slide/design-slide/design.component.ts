import { Component, OnInit } from '@angular/core';
import { Relation } from './../../../models/relation';


@Component({
  selector: 'app-design-slide',
  templateUrl: 'design.component.html'
})
export class DesignComponent implements OnInit {

  relations: Array<Relation>;
  constructor() { }




  ngOnInit() {
    this.relations = [new Relation('/sections', 'sectionId', 'id', 'name', 'section name')];
  }
}
