import { Component, OnInit } from '@angular/core';
import { Relation } from './../../../models/relation';

@Component({
  selector: 'app-section',
  templateUrl: 'section.component.html'
})
export class SectionComponent implements OnInit {
  relations: Array<Relation>;
  constructor() { }

  ngOnInit() {
    this.relations = [new Relation('/demos', 'demoId', 'id', 'urlAlias', 'demo url')];
  }

}
