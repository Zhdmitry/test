import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api-service.service';

@Component({
  selector: 'work-edit',
  templateUrl: 'work-edit.component.html',
  providers: [ApiService]
})
export class WorkEditComponent implements OnInit {
  entity: any;
  submited = false;
  api;
  id: number;

  constructor(private apiService: ApiService, private actRoute: ActivatedRoute, private router: Router) { }


  onSubmit() {
    this.submited = true;
    this.apiService.mainPath = this.api;
    this.setOrder();
    this.apiService.put(this.id, this.entity).subscribe(r => {
      this.navRoot();
    });
  }
  setOrder() {
    for (let i = 0; i < this.entity.screenshots.length; i++) {
      this.entity.screenshots[i].order = i + 1;
    }
  }
  ngOnInit() {

    this.actRoute.data.subscribe(val => {
      this.id = this.actRoute.snapshot.params['id'];
      this.api = val['api'];
      this.getEntity();
    });
  }
  getEntity() {
      this.apiService.mainPath = this.api;
      this.apiService.get('/' + this.id).subscribe(r => {
        this.entity = r.json();
        this.entity.screenshots.sort((x, y) => x.order - y.order);
      });
  }
  navRoot() {
    this.router.navigate(['/admin' + this.api]);
  }
}
