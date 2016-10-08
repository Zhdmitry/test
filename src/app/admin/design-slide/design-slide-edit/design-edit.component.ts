import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api-service.service';
import { AlertService } from '../../../services/alert-service.service';
import { DesignSlide } from '../../../models/design-slide';
import { getDemos } from '../../Utils';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-structure-slide-edit',
  templateUrl: 'design-edit.component.html'
})
export class DesignEditComponent implements OnInit {
  id;
  entity: DesignSlide;
  api;
  submited = false;
  sections: Array<any>;
  formErrors: {} = {};
  alias: string;
  screenshots;
  demoCreated;

  public navRoot() {
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

  onSubmit() {
    this.submited = true;
    this.apiService.mainPath = this.api;
    this.setOrder();
    this.apiService.put(this.entity.id, this.entity).subscribe(r => {
      this.navRoot();
    },
      e => {
        this.submited = false;
        this.alertService.error('Error', e);
      });
  }
  setOrder() {
    for (let i = 0; i < this.entity.screenshots.length; i++) {
      this.entity.screenshots[i].order = i + 1;
    }
  }
  getSections() {
  
    this.apiService.getClear('sections')
      .map(r => r.json())
      .subscribe(res => {
       
        getDemos(this.apiService).then(demos => {
           this.sections = new Array<any>();
          res.data.filter(r => r.sectionTypeId === 0).map((r: any) => {
              
            if (r.designSlides.some(x => x.id === this.entity.id)) {
              let currentDemo = demos.filter(y => y.id === r.demoId)[0];
              this.alias = `http://${window.location.host}/demos/${currentDemo.urlAlias}`;
              this.demoCreated = currentDemo.createdOn;
              console.log(this.demoCreated);
            }
            this.sections.push({ value: r.id, title: r.name + ' (demo:' + (demos.find(d => d.id === r.demoId).heading) + ')' });
          });
        });
      },
      error => {

      });
  }
  get url() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.alias);
  }
  openDemo() {
    window.open(this.alias);
  }

  getEntity() {
    this.apiService.mainPath = this.api;
    this.id = this.actRoute.snapshot.params['id'];
    this.apiService.get('/' + this.id).subscribe(r => {
      this.entity = r.json();
      this.entity.screenshots.sort((x, y) => x.order - y.order);
    });
  }

  ngOnInit() {
    this.actRoute.data.subscribe(val => {
      this.api = val['api'];
      this.getSections();
      this.getEntity();
    });
  }
}
