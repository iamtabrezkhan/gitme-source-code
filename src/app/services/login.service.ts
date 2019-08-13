import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public tokenUrl = 'https://github.com/login/oauth/access_token';
  public clientId = '589bf067b962a0d15ee5';
  public clientSecret = '6d85eb45e0e56cd7cedd4ec761cbe5ad158ecea9';

  constructor(
    private http: HttpClient
  ) {}

  getToken(code) {
    var headers = new HttpHeaders({
      'Accpet': 'application/json'
    })
    return this.http.post(`http://gitme.ml/backend/signin`, {
      code: code,
      clientId: this.clientId,
      clientSecret: this.clientSecret
    }, {headers:headers});
  }

}
