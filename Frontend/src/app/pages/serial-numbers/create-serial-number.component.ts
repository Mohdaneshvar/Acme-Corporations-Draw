import { Component, OnInit } from "@angular/core";
import { from } from "rxjs";
import{SerialNumberService } from './serial-number.service';
import {downloadFileResponse} from './../../shared/functions/downloadFile-extesion'
import { CreateSerialNumber } from "./serial-numbers.model";
import { Router } from "@angular/router";
import { Route } from 'src/app/app-routing';
import { AddCardLoading, RemoveCardLoading } from "src/app/core/form.validator";

@Component({
  selector: 'app-create-serial-number',
  templateUrl: './create-serial-number.component.html',
  styleUrls: ['./create-serial-number.component.scss'],
  providers:[SerialNumberService]
})
export class CreateSerialNumberComponent implements OnInit {
  constructor( private serialNumberService:SerialNumberService,private router:Router  ) { }
  ngOnInit(): void {
  }
  
  back()
  {
    this.router.navigate([Route.HOME_INDEX]);
  }
  createSerialNumber()
  {
    const param: CreateSerialNumber = { count:100};
    AddCardLoading('create-serial-number', 'btn-primary');
    this.serialNumberService.createSerialNumber(param).subscribe(
      (response) => {
        downloadFileResponse(response,'serialNumber.txt' );
        RemoveCardLoading('create-serial-number', 'btn-primary');

      },
      (error) => {
        
      }
    );
  }

  }
