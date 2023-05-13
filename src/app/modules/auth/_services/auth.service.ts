import { URL_SERVICIOS } from './../../../config/config';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  token : any = ''
  user : any = null
  constructor(private http: HttpClient, private router: Router) {
    this.loadLocalStorage()
  }

  loadLocalStorage(){
    if (localStorage.get("token")) {
      this.token=localStorage.getItem("token");
      this.user=JSON.parse(localStorage.getItem("user") ?? '');
    } else {
      this.token='';
      this.user=null;
    }
  }

  login(email: string, password: string) {
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, { email, password }).pipe(
      map((auth: any) => {
        if (auth.access_token) {
          return this.storeLocalStorageToken(auth);
        } else {
          return of(undefined);
        }
        catchError((error) => {
          console.log(error);
          return of(undefined);
        });
      })
    );
  }

  storeLocalStorageToken(auth: any) {
    if (auth.access_token) {
      localStorage.setItem("token",auth.access_token);
      localStorage.setItem("user",auth.user)
      this.token=auth.access_token;
      this.user=auth.user;
      return true;
    } else {
      return false;
    }
  }

  register(data:any){
    let url = URL_SERVICIOS+"/register";
    return this.http.post(url, data)
  }

  logout(){
    this.token = '';
    this.user=null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(["auth/login"],{queryParams:{}})
  }


}
