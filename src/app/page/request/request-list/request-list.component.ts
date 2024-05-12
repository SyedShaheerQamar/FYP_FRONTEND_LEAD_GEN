import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { RequestService } from '../service/request.service';
// import { Location } from '../../../model/Location'
import { UserRequest } from 'src/app/model/user-request';

@Component({
  selector: 'app-location-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
  providers:[MessageService]
})
export class RequestListComponent implements OnInit {


  constructor(private userRequestService:RequestService,private messageService:MessageService) { }
 
  items: MenuItem[] | undefined;
  visible: boolean = false;
  request!:UserRequest[];
  lID!:number
  ApproveId!:number;
  approveVisible: boolean = false;

  ngOnInit() {
      this.items = [{ label: 'Request List'}];
      this.getAllUserRequest();
  }
  
  getAllUserRequest(){
    this.userRequestService.getAllUserRequest().subscribe((res:UserRequest[])=>{
      this.request=res;
      console.log(this.request);

      for(var i=0; i<res.length; i++){
        const specificItem = res[i];
        const categoryNames = specificItem.category.map(category => category.categoryName);
        this.request[i].categoryName = categoryNames;
      }
      
      
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    })
  }

  deleteRequestByID(id:number){
    this.userRequestService.deleteUserRequsetByID(id).subscribe((res:UserRequest)=>{
      this.getAllUserRequest();
      this.visible = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request is deleted on id '+res!.id!.toString()});
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    });
   }

  showDialog(id:number) {
    this.lID=id;
    this.visible = true;
  }

  approveRequestByID(id:number){
    this.userRequestService.adminApproveUserRequsetByID(id).subscribe((res)=>{
      this.getAllUserRequest();
      this.approveVisible = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request is approved on id '+res!.id!.toString()});
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    });
  }

  showDialogForApprove(id:number){
    this.ApproveId = id;
    this.approveVisible = true;
  }

}
