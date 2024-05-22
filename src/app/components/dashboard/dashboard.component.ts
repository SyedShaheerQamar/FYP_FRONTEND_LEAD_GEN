import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
  items: MenuItem[] | undefined;
  data1: any;
  options1: any;
  userLength: number = 0;
  requestLength: number = 0;
  categoryLength: number = 0;
  url = environment.baseurl;

  constructor(
    private userService: UserService, 
    private userRequestService: RequestService, 
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.items = [{ label: 'Dash Board' }];
    this.getAllUser();
    this.getAllUserRequest();
    this.getCategory();

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options1 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
            usePointStyle: true,
          },
          position: 'bottom'
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  getAllUser() {
    this.userService.GetAllUserFromDatabase().subscribe((res: UserInformation[]) => {
      this.userLength = res.length;
      this.updateChartData();
    });
  }

  getAllUserRequest() {
    this.userRequestService.getAll().subscribe((res: UserRequest[]) => {
      this.requestLength = res.length;
      this.updateChartData();
    });
  }

  getCategory() {
    this.categoryService.getAllCategory().subscribe((res: Category[]) => {
      this.categoryLength = res.length;
      this.updateChartData();
    });
  }

  updateChartData() {
    this.data1 = {
      labels: ['Overall'],
      datasets: [
        {
          label: 'Users',
          backgroundColor: '#4099ff',
          borderColor: '#4099ff',
          data: [this.userLength]
        },
        {
          label: 'Category',
          backgroundColor: '#FF5370',
          borderColor: '#FF5370',
          data: [this.categoryLength]
        },
        {
          label: 'Requests',
          backgroundColor: '#59e0c5',
          borderColor: '#59e0c5',
          data: [this.requestLength]
        }
      ]
    };
  }
}
