import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Dropdown } from 'primeng/dropdown';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-add-category',
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
  itemCategory!:Category[];

  icons: any = [];
  background: any = [];

  selectedIcon: any;
  selectedBackground: any;


  ngOnInit(): void {
    this.items = [{ label: 'Category List',routerLink:'/category'},{ label: 'Add Category'}];
    this.getCategory();
  }

  getCategory(){
    this.categoryService.getAllCategory().subscribe((res:Category[])=>{
     this.itemCategory=res;    

     this.populateDropdowns();
     
    },error=>{
     this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    })
   }

  //  populateDropdowns() {
  //   // Populate the icons dropdown with category names
  //   this.icons = this.itemCategory.map((category) => {
  //     return { name: category.icons };
  //   });

  //   // Populate the background dropdown with category names
  //   this.background = this.itemCategory.map((category) => {
  //     return { name: category.backgroundColor };
  //   });
  // }

  populateDropdowns() {
    const categoryNamesSet = new Set<string>();
  
    // Populate the icons dropdown with unique category names
    this.icons = [];
    this.itemCategory.forEach(category => {
      if (!categoryNamesSet.has(category.icons)) {
        categoryNamesSet.add(category.icons);
        this.icons.push({ name: category.icons });
      }
    });
  
    // Populate the background dropdown with unique category names
    this.background = [];
    this.itemCategory.forEach(category => {
      if (!categoryNamesSet.has(category.backgroundColor)) {
        categoryNamesSet.add(category.backgroundColor);
        this.background.push({ name: category.backgroundColor });
      }
    });
  }
  
  

  onSubmit() {
    this.category = {
      id: null,
      icons: this.iconDropdown.value.name,
      backgroundColor: this.backgroundDropdown.value.name,
      categoryName: this.Categoryname
    };
    
    this.categoryService.saveCateogry(this.category).subscribe((res: any) => {
      this.router.navigate(['/category']);
    })
  }

  showDialog(){
    this.visible = true;
  }


}
