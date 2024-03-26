import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/model/PaginatedResponse';
import { Category } from 'src/app/model/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:HttpClient) { }
  url=environment.baseurl;


  getAllCategory():Observable<Category[]>{
    return this.http.get<Category[]>(this.url.concat("/category/getAll"))
  }

  deleteCategoryByID(id:number):Observable<Category>{
    return this.http.delete<Category>(this.url.concat('/category/delete/',id.toString()));
  }


}
