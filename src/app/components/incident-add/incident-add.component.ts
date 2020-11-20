import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/common/custom-validators';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from 'src/app/services/incident.service';
import { DomainService } from 'src/app/services/domain.service';
import { PriorityService } from 'src/app/services/priority.service';
import { Priority } from 'src/app/models/priority';


@Component({
  selector: 'app-incident-add',
  templateUrl: './incident-add.component.html',
  styleUrls: ['./incident-add.component.css']
})
export class IncidentAddComponent implements OnInit {
  message: string = '';
  priorityList: Array<Priority> = []

  incidentForm = new FormGroup({
    priorityId: new FormControl('', [ Validators.required]),
    title: new FormControl('', [ Validators.required]),
    creator: new FormControl('', [ Validators.required]),
    description: new FormControl('', [ Validators.required]),
    domainName: new FormControl('', [ Validators.required]),
    //domainName: new FormControl('', [ Validators.required, CustomValidators.domainNotExists(this.domainService)]),
    phoneNumber: new FormControl('', [ CustomValidators.numbersOnly()]),
  })
  constructor(private incidentService: IncidentService, private domainService: DomainService, private priorityService: PriorityService) { }

  ngOnInit(): void {
    this.priorityService.getAll()
    .then(response => {
      this.priorityList = response;
    })
    .catch(error => {
      console.log(error);
    })
  }
    
  get priorityId() { return this.incidentForm.get('priorityId'); }
  get title() { return this.incidentForm.get('title'); }
  get creator() { return this.incidentForm.get('creator'); }
  get description() { return this.incidentForm.get('description'); }
  get domainName() { return this.incidentForm.get('domainName'); }
  get phoneNumber() { return this.incidentForm.get('phoneNumber'); }

  onSubmit(){
    let incident = new Incident();
    incident.priorityId = this.priorityId.value
    incident.title = this.title.value;
    incident.creator = this.creator.value;
    incident.description = this.description.value;
    incident.domainName = this.domainName.value;
    incident.phoneNumber = this.phoneNumber.value;


    this.incidentService.add(incident)
      .then(response  => {
        this.message = "Incident successfully added";
      })
      .catch(error =>{
        this.message = "An error has occurred!";
      })
  }

}
