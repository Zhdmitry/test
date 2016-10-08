import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Demo } from './../../../models/demo';

@Component({
  selector: 'app-structure-slide-create',
  templateUrl: 'demo-create.component.html'
})
export class DemoCreateComponent implements OnInit {
  entity: any = {
    headingColor: '#000',
    subheadingColor: '#000'
  }
  submited= false;
  api;
  formErrors;

  constructor(private apiService: ApiService, private actRoute: ActivatedRoute, private  router: Router) { }

  public  navRoot() {
    this.router.navigate(['/admin' + this.api]);
    return false;
  }

  OnSubmit(e) {
    this.submited = true;
    this.apiService.mainPath = this.api;
    this.apiService.post(this.entity).subscribe(r => this.navRoot(),
      e => {
        this.formErrors = e.json();
        this.submited = false;
      }
    );
  }

  ngOnInit() {
    this.actRoute.data.subscribe(val => {
      this.api = val['api'];
    });
  }




}
