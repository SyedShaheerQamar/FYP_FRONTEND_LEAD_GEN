import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Dropdown } from 'primeng/dropdown';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  providers:[MessageService],
})
export class AddCategoryComponent implements OnInit {

  @ViewChild('iconDropdown') iconDropdown!: Dropdown;
  @ViewChild('backgroundDropdown') backgroundDropdown!: Dropdown;

  items: MenuItem[] | undefined;
  visible!: boolean;
  
  constructor(private categoryService:CategoryService,private messageService:MessageService,private router:Router) { }

  Categoryname!:string;
  category!: Category;

  icons: any = [
    { name: 'TEST 1' },
    { name: 'TEST 2' },
    { name: 'TEST 3' },
    { name: 'TEST 4' },
    { name: 'TEST 5' }
  ];

  background: any = [
    { name: 'TEST 1' },
    { name: 'TEST 2' },
    { name: 'TEST 3' },
    { name: 'TEST 4' },
    { name: 'TEST 5' }
  ];

  selectedIcon: any;
  selectedBackground: any;


  ngOnInit(): void {
    this.items = [{ label: 'Category List',routerLink:'/category'},{ label: 'Add Category'}];
  }

  onSubmit() {
    this.category = {
      id: null,
      icons: this.iconDropdown.value.name,
      backgroundColor: this.backgroundDropdown.value.name,
      categoryName: this.Categoryname
    };
    
    this.categoryService.saveCateogry(this.category).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/category']);
    })
  }

  showDialog(){
    this.visible = true;
  }


}
