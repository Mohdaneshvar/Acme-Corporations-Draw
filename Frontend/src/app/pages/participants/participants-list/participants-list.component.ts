import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormValidator, IsStringWithoutNumberValidator, PasswordValidator, RequiredValidator } from 'src/app/core/form.validator';
import { Store } from '@ngrx/store';
import { ParticipantService } from '../participant.service';
import { Participant } from '../participant.model';
import { Route } from 'src/app/app-routing';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.scss']
})
export class ParticipantsListComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private participantService:ParticipantService, private router:Router) {
    
   }

  loading: boolean = true;
  cols: any[];
  totalRecords: number = 0;
  totalPage:number=0;
  skip: number = 0;
  take: number = 10;
  pageNumber: number = 1;
  modelList:Participant[];
  loadLazyDataPaging(event: LazyLoadEvent) {
    this.skip = event.first //= First row offset
    this.take = event.rows //= Number of rows per page
    this.pageNumber=(this.skip/this.take)+1;
    this.getData();
  }


  back()
  {
    this.router.navigate([Route.HOME_INDEX]);
  }
  getData() {
    this.loading = true;
    setTimeout(() => {

    this.participantService.getAllParticipant(this.take, this.skip).subscribe(
      data => {
        this.modelList = data.results;
        this.totalRecords = data.rowCount;
        this.totalPage=Math.ceil(data.rowCount/this.take);
        this.loading = false;
      }
    );
  });
}
  ngOnInit(): void {
    this.loading = true;

  }
 
}

