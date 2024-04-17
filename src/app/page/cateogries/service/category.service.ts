import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/model/PaginatedResponse';
import { Category } from 'src/app/model/category';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
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

  saveCateogry(category: any):Observable<any>{
    return this.http.post<any>(this.url.concat("/category/saveCategory"), category)
  }


}
