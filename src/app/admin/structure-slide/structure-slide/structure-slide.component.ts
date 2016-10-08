import { Component, OnInit } from '@angular/core';
import { Relation } from './../../../models/relation';


@Component({
  selector: 'app-structure-slide',
  templateUrl: 'structure-slide.component.html'
})
export class StructureSlideComponent implements OnInit {

  relations: Array<Relation>;
  constructor() { }

  ngOnInit() {
    this.relations = [new Relation('/sections', 'sectionId', 'id', 'name', 'section name')];
  }

}


