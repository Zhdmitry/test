import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StructureSlide } from '../../../models/structure_slide';
import { getDemos } from '../../Utils';
@Component({
  selector: 'app-structure-slide-create',
  templateUrl: 'structure-slide-create.component.html'
})
export class StructureSlideCreateComponent implements OnInit {


  entity: any = {};
  submited = false;
  api;
  sections;

  errors


  constructor(private apiService: ApiService, private actRoute: ActivatedRoute, private router: Router) { }

  public navRoot() {
    this.router.navigate(['/admin' + this.api]);
    return false;
  }


  onSubmit(e) {
    this.submited = true;

    this.apiService.mainPath = this.api;
    this.apiService.post(this.entity).subscribe(r => {
      this.navRoot();
    }, e => {

      this.errors = e;
      this.submited = false;
    });
  }

  getSections() {
    this.apiService.getClear('sections')
      .map(r => r.json())
      .subscribe(res => {

        getDemos(this.apiService).then(demos => {
          this.sections = res.data.filter(r => r.sectionTypeId === 1).map((r: any) => {
            return { value: r.id, title: r.name + " (demo:" + (demos.find(demos => demos.id === r.demoId).heading) + ")" };
          });
        });


      },
      error => {

      });
  }
  ngOnInit() {
    this.actRoute.data.subscribe(val => {
      this.api = val['api'];
      this.getSections();
    });
  }

}
