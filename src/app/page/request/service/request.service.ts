import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, startWith, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRequest } from 'src/app/model/user-request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http:HttpClient) { }
  url=environment.baseurl;

  getAllUserRequest():Observable<UserRequest[]>{
    return interval(30000) // Poll every 30 seconds
      .pipe(
        startWith(0),
        switchMap(() => this.http.get<UserRequest[]>(this.url.concat('/userRequest/getAllRequests')))
      );
  }

  getAll():Observable<UserRequest[]>{
    return this.http.get<UserRequest[]>(this.url.concat('/userRequest/getAll'));
  }

  deleteUserRequsetByID(id:number):Observable<UserRequest>{
    return this.http.put<UserRequest>(this.url.concat('/userRequest/deleteRequest/',id.toString()), null);
  }

  adminApproveUserRequsetByID(id:number):Observable<UserRequest>{
    return this.http.put<UserRequest>(this.url.concat('/userRequest/setApproval/',id.toString()), null);
  }

  getAllDeletedRequests():Observable<UserRequest[]>{
    return this.http.get<UserRequest[]>(this.url.concat('/userRequest/getAllDeletedRequests'));
  }

}
