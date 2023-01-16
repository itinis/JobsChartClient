import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  httpOptions: { headers: HttpHeaders; } | undefined;
  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:7047/';

  get(controller: string, functionApi:string , parameter: any = null): Observable<any> {
    if (parameter != null) {
      return this.http.get(this.baseUrl + controller + "/"+  functionApi , parameter);
    }
    return this.http.get(this.baseUrl + controller+ "/" +  functionApi);
  }
  post(controller: string,functionApi:string,  parameter: any = null): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
      
    };
    if (parameter instanceof (Object)) {
      return this.http.post(this.baseUrl + controller + "/" + functionApi ,  JSON.stringify(parameter),this.httpOptions);
    }
    else {
      return this.http.post<any>(this.baseUrl + controller + "/" +  functionApi +"/" ,JSON.stringify(parameter), this.httpOptions);
    }
  }
}

//return this.httpClient.post<boolean>(this.baseUrl + 'AddTemplateTextRules', body, {
 // headers: headerOptions
//}).pipe(catchError(this.handleError.bind(this));
//}