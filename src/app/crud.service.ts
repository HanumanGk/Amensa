import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpData:HttpClient) { }
  public apiUrl = environment.apiUrl;
  public api = environment.api;


  select(urlname: string)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
    return this.httpData.get(this.apiUrl+urlname);
  }

  getSingleData(urlname: string,id)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
    return this.httpData.get(this.apiUrl+urlname + id);
  }

  postData(routename,data)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
        // 'Content-Type':  'application/application/json'
        })
    };
    return this.httpData.post(this.apiUrl+routename,data);
  }

  deleteData(routename,id)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
        // 'Content-Type':  'application/application/json'
        })
    };
    return this.httpData.delete(this.apiUrl+routename+id);
  }

  postImage(routename,data)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
        //'Content-Type':  'application/application/json'
        })
    };
    return this.httpData.post(this.apiUrl+routename,data);
  }
  postData1(routename,data)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/x-www-form-urlencoded'
        'Content-Type':  'application/application/json'

      })
    };
    return this.httpData.post(this.apiUrl+routename,data);
  }
  socialLink(data)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/x-www-form-urlencoded'
        'Content-Type':  'application/application/json'

      })
    };

     const socialLogin="https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code="+data+"&redirect_uri=http://localhost:4200/linkedInLogin&client_id=819o2a4wpocvlt&client_secret=Eiia9et6ehIcPxn7"
    return this.httpData.post(socialLogin,data);
  }

  socialUrl(routename,accessToken)
  {
    //console.log(accessToken);
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/x-www-form-urlencoded'
        'Authorization':  'Bearer'+accessToken

      })
    };
    return this.httpData.post(routename,"");
  }
}
