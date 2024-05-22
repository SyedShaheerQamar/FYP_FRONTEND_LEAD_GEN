import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { UserInformation } from 'src/app/model/user-information';
import { UserRequest } from 'src/app/model/user-request';
import { CategoryService } from 'src/app/page/cateogries/service/category.service';
import { RequestService } from 'src/app/page/request/service/request.service';
import { UserService } from 'src/app/page/user/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    http: any;

  constructor(private userService: UserService, private userRequestService:RequestService, private categoryService:CategoryService) { }
  items: MenuItem[] | undefined;
  data: any;
  options: any;
  data1: any;
  options1: any;
  userLength: any;
  requestLength: any;
  categoryLength: any;
  url=environment.baseurl;

  ngOnInit(): void {
    this.items = [{ label: 'Dash Board'}];
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.getAllUser();
    this.getAllUserRequest();
    this.getCategory();

    const documentStyle1= getComputedStyle(document.documentElement);
    const textColor1 = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary1= documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder1= documentStyle.getPropertyValue('--surface-border');
    
    this.data1= {
        labels: ['Overall'],
        datasets: [
            {
                label: 'Users',
                backgroundColor:'#4099ff',
                borderColor:'#4099ff',
                data: [65]
            },
            {
                label: 'Category',
                backgroundColor:'#FF5370',
                borderColor:'#FF5370',
                data: [28]
            },
            {
                label: 'Requests',
                backgroundColor:'#59e0c5',
                borderColor:'#59e0c5',
                data: [28]
            }
        ]
    };

    this.options1= {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor1,
                    usePointStyle: true,
                },
                position:'bottom'
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary1,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder1,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary1
                },
                grid: {
                    color: surfaceBorder1,
                    drawBorder: false
                }
            }

        }
    };
  }

  getAllUser(){
    this.userService.GetAllUserFromDatabase().subscribe((res:UserInformation[]) => {
        this.userLength = res.length;
    });
   }

   getAllUserRequest(){
    this.userRequestService.getAll().subscribe((res:UserRequest[])=>{
      this.requestLength=res.length;      
    })
  }

  getCategory(){
    this.categoryService.getAllCategory().subscribe((res:Category[])=>{    
     this.categoryLength=res.length;   
    })
   }

}
