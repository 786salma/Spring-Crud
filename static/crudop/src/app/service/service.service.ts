import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl:string="http://localhost:8080/api";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  private user:User;

  constructor(private http:Http) { }

  createUser(user:User){
    return this.http.post(this.baseUrl+'/users/add',JSON.stringify(user),
    this.options).map(res=>res.json())
    .catch(this.errorHandler);
  }

  updateUser(user:User){
    return this.http.put(this.baseUrl+'/users/update',JSON.stringify(user),
    this.options).map(res=>res.json())
    .catch(this.errorHandler);
  }

  getUsers(){
    return this.http.get(this.baseUrl+'/users',this.options)
    .map(res=>res.json())
    .catch(this.errorHandler);
  }

  getUser(id:Number){
    return this.http.get(this.baseUrl+'/users/'+id,this.options)
    .map(res=>res.json())
    .catch(this.errorHandler);
  }

  deleteUser(id:Number){
    return this.http.delete(this.baseUrl+'/user/'+id,this.options)
    .map(res=>res.json())
    .catch(this.errorHandler);
  }

  errorHandler(error:Response){
      return Observable.throw(error||"SERVER ERROR");
  }

  setter(user:User){
    this.user=user;
  }

  getter(){
    return this.user;
  }

}
