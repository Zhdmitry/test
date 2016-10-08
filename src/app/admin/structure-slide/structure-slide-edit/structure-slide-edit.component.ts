import { Component, OnInit } from '@angular/core';
import { StructureSlide } from '../../../models/structure_slide';
import { ApiService } from '../../../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert-service.service';
import { getDemos } from '../../Utils';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-structure-slide-edit',
  templateUrl: 'structure-slide-edit.component.html',
})
export class StructureSlideEditComponent implements OnInit {

  entity: StructureSlide;
  api;
  submited = false;
  formErrors: {} = {};
  sections: Array<any>
  alias: string;

  // navigate to the root component from /users/edit/1 to users.
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
    this.apiService.put(this.entity.id, this.entity).subscribe(r => {
      this.navRoot();

    });

  }
  getSections() {
    this.apiService.getClear('sections')
      .map(r => r.json())
      .subscribe(res => {
        getDemos(this.apiService).then(demos => {
          this.sections = new Array<any>();
          res.data.filter(r => r.sectionTypeId === 1).map((r: any) => {
            if (r.structureSlides.some(x => x.id === this.entity.id)) {
              let alias = demos.filter(y => y.id === r.demoId)[0].urlAlias;
              this.alias = `http://${window.location.host}/demos/${alias}`;
            }
            this.sections.push({ value: r.id, title: r.name + ' (demo:' + (demos.find(demos => demos.id === r.demoId).heading) + ')' });
          });


        });
      },
      error => {

      });
  }
  ngOnInit() {
    this.actRoute.data.subscribe(val => {
      this.api = val['api'];
      this.apiService.mainPath = this.api;
      this.apiService.get('/' + this.actRoute.snapshot.params['id']).subscribe(r => this.entity = r.json());
      this.getSections();
    });
  }
  get url() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.alias);
  }
  openDemo() {
    window.open(this.alias);
  }
}
