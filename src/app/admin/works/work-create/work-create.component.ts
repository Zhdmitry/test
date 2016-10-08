import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api-service.service';
import { Work } from './../../../models/work';

@Component({
  selector: 'work-create',
  templateUrl: 'work-create.component.html',
  providers: [ApiService]
})
export class WorkCreateComponent implements OnInit {
  entity = new Work(0, '', '#000', '', '#000', '#ccc', 1, true, []);
  submited = false;
  api;


  constructor(private apiService: ApiService, private actRoute: ActivatedRoute, private router: Router) { }


  onSubmit(e) {
    this.submited = true;
    this.apiService.mainPath = this.api;
    this.apiService.post(this.entity).subscribe(
      r => {
        this.router.navigate([`/admin${this.api}/edit/${r.json().id}`]);
        return false;
      },
      err => {
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

