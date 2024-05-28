import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = environment.baseUrl;


  constructor(private http: HttpClient, private snack: MatSnackBar ) {}

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  findById(id: any): Observable<User>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url);
  }

  update(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user.id}`
    return this.http.put<User>(url,user);
  }

  delete(id: any):Observable<void>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  create(user: User): Observable<User>{
    return this.http.post<User>(this.baseUrl,user);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    } )
  }

}
