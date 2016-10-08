import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SECTION_TYPES } from './../../../models/section-types';

@Component({
  selector: 'app-section-create',
  templateUrl: 'section-create.component.html',
  styleUrls: ['section-create.component.css']
})
export class SectionCreateComponent implements OnInit {

  entity: any = {};
  submited = false;
  api;
  demos: { title: string, value: string };
  radioOptions = SECTION_TYPES;

  constructor(private apiService: ApiService, private actRoute: ActivatedRoute, private router: Router) { }

  public navRoot() {
    this.router.navigate(['/admin' + this.api]);
  }


  onSubmit(e) {
    this.submited = true;

    this.apiService.mainPath = this.api;
    this.apiService.post(this.entity).subscribe(r => {
      // user created
      this.navRoot();


    });

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
      this.getDemos();
    });
  }

}
