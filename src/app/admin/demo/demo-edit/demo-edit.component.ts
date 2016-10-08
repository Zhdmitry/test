import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../services/alert-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-demo-edit',
  templateUrl: 'demo-edit.component.html',
  styleUrls: ['demo-edit.component.css']
})
export class DemoEditComponent implements OnInit {

  entity: any;
  api;
  submited = false;
  formErrors: {};
  url;
  showPreview: boolean = false;

  public  navRoot() {
    this.router.navigate(['/admin' + this.api]);
    return false;
  }

  constructor(
    private apiService: ApiService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
    private domSanitizer: DomSanitizer
  ) { }
  OnSubmit() {
    this.submited = true;
    this.apiService.put(this.entity.id, this.entity).subscribe(r => {
      this.navRoot();
    },
      e => {
        this.formErrors = e.json();
    });

  }
  ngOnInit() {

    this.actRoute.data.subscribe(val => {
      this.api = val['api'];
      this.apiService.mainPath = this.api;
      this.apiService.get('/' + this.actRoute.snapshot.params['id']).subscribe(r => {
        this.entity = r.json();
        this.url = `http://${window.location.host}/demos/${this.entity.urlAlias}`;
      });
    });
  }
  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
