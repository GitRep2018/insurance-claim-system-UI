import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId;
  response;
  display: boolean = false;
  display1: boolean = false;
  constructor(private _service: DataService, private messageService: MessageService) { }

  getClaims = () => {
    this._service.getAllClamis(this.userId).subscribe((data) => {
      console.log("claim data", data);
      this.response = data;
    })
  }

  cancel(): void {
    this.display1 = true;
  }

  reject = (claimId, reason) => {
    let obj = {
      "claimId": claimId,
      "claimStatus": "REJECT",
      "comments": reason
    }
    console.log("datassssss", obj)
    this._service.rejectClaim(this.userId, obj).subscribe((data) => {
      console.log(data)
      if (data['statusCode'] == 200) {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: data['statusMessage'] });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: data['Message'] });
      }
    })
    this.display1 = false;
  }

  openPopUp = () => {
    this.display = true;
  }


  approves = (claimId, comments) => {
    let obj = {
      "claimId": claimId,
      "claimStatus": "APPROVE",
      "comments": comments
    }
    console.log("datassssss", obj)
    this._service.approveClaim(this.userId, obj).subscribe((data) => {
      console.log(data)
      if (data['statusCode'] == 200) {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: data['statusMessage'] });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: data['Message'] });
      }
    })
    this.display = false;
  }

  ngOnInit() {
    this.userId = sessionStorage.getItem("User");
    console.log(this.userId);
    this.getClaims();
  }

}
