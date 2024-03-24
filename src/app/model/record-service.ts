import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { UserRequest } from './user-request';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  getRecords(): Observable<UserRequest[]> {
    return interval(30000) // Poll every 30 seconds
      .pipe(
        startWith(0),
        switchMap(() => this.http.get<UserRequest[]>('http://localhost:8080/api/userRequest/getAll'))
      );
  }
}
