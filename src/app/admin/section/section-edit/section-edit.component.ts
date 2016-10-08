import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert-service.service';
import { SECTION_TYPES } from './../../../models/section-types';

@Component({
  selector: 'app-section-edit',
  templateUrl: 'section-edit.component.html'
})
export class SectionEditComponent implements OnInit {

  entity: any;
  api;
  submited = false;
  formErrors: {} = {};
  demos;
  radioOptions = SECTION_TYPES;

  public navRoot() {
    this.router.navigate(['/admin' + this.api]);
    return false;
  }

  constructor(
    private apiService: ApiService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public alertService: AlertService
  ) { }
  onSubmit() {
    this.submited = true;
    this.apiService.put(this.entity.id, this.entity).subscribe(r => this.navRoot());
  }

  getDemos() {
    this.apiService.getClear('demos')
      .map(r => r.json())
      .subscribe(res => {
       
        this.demos = res.data.map((r: any) => { return { value: r.id, title: r.urlAlias }; });
      },
      error => {

      });
  }
  ngOnInit() {

    this.actRoute.data.subscribe(val => {
      this.api = val['api'];
      this.apiService.mainPath = this.api;
      this.getDemos();
      this.apiService.get('/' + this.actRoute.snapshot.params['id']).subscribe(r => this.entity = r.json());
    });

  }
}
