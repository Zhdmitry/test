import {Component, OnInit, Input} from '@angular/core';
import {Query} from "../../../models/query";
import {ApiService} from "../../../services/api-service.service";
import {ActivatedRoute} from "@angular/router";
import {StructureSlide} from "../../../models/structure_slide";


@Component({
  selector: 'app-design-slide',
  templateUrl: 'demo.component.html'
})
export class DemoComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
