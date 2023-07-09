import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/_services/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ProfileUserService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  UpdateProfileUser(data:any){
    let headers = new HttpHeaders({'Authorization':'Bearer '+this.authService.token})
    let LINK = URL_SERVICIOS+"/users/profile-user";
    return this.http.post(LINK,data,{headers:headers})
  }

  AvatarChangeUser(file:any){
    let headers = new HttpHeaders({'Authorization':'Bearer '+this.authService.token})
    let LINK = URL_SERVICIOS+"/users/profile-user";
    let formData = new FormData();
    formData.append("imagen",file,file.name);
    return this.http.post(LINK,formData,{headers:headers})
  }
}
