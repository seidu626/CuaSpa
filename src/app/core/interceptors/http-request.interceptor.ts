
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent } from "@angular/common/http";
import 'rxjs/Rx';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  //https://angular.io/guid/http

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercepted request ... ");
    // Clone the request to add the new header.
    let headers: any;

    if (!req.headers.get('Content-Type')) {
      headers = req.clone({ headers: req.headers.set("Content-Type", "application/json; charset=utf-8") });
    }
   
    headers = headers.clone({ headers: req.headers.set("Accept", "application/json") });
   
    //send the newly created request
    return next.handle(headers).pipe(
      catchError((error, caught) => {
        //intercept the respons error and displace it to the console
        console.log("Error Occurred");
        console.log(error);
        //return the error to the method that called it
        return observableThrowError(error);
      })) as any;
  
  }
}
