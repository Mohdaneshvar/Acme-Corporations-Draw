import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { FormValidator, PhoneValidator, RequiredValidator, NationalIdValidator, IsStringWithoutNumberValidator, IsNumberValidator, MobileValidator, DateValidator, ForbiddenCharValidator, EmailValidator, ProductSerialValidator } from 'src/app/core/form.validator';
import { AddCardLoading, RemoveCardLoading } from 'src/app/core/form.validator';
import { NationalCodePipe } from 'src/app/shared/pipes/national-code.pipe';
import { ParticipantService } from "../participant.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/app-routing';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-register-participant',
  templateUrl: './register-participant.component.html',
  styleUrls: ['./register-participant.component.scss'],
  providers:[ParticipantService]
})
export class RegisterParticipantComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,private participantService:ParticipantService,private router:Router
    ,private toastService:ToastService ) { }
  form: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }
  registerParticipant(): void {
    FormValidator(this.form, 'registerParticipantForm', () => {
      const err: ValidationErrors = {};
      return err;
    }).subscribe(
      () =>  {
        AddCardLoading('register-participant', 'btn-primary');
        this.participantService.registerParticipant(this.form.getRawValue()).subscribe(
          result => {
            RemoveCardLoading('register-participant', 'btn-primary');
            this.toastService.add('success', 'Information successfully recorded', '');
            this.router.navigate([Route.HOME_INDEX]);
          },   error => {
            console.log(error);
            RemoveCardLoading('register-participant', 'btn-primary');
          }
        );
       }
    );
  }

  back()
  {
    this.router.navigate([Route.HOME_INDEX]);
  }
  private createForm(): void {
    this.form = this.formBuilder.group({
      firstName: new FormControl('', [RequiredValidator("Please enter your first name.")]),
      lastName: new FormControl('', [RequiredValidator('Please enter your lastName.')]),
      emailAddress: new FormControl('', [RequiredValidator('Please enter your address'),
          EmailValidator('the email format is not correct')]),
      productSerialNumber: new FormControl('', [RequiredValidator('Please enter your product\'s SerialNumber')
      ,ProductSerialValidator(' format of the product serial number is not correct.')]),
      hasOlderThan18:new FormControl('',[RequiredValidator("You must confirm that you are over 18 years old.")])
    });
  }
  }
