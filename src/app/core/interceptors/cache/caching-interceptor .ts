
import {of as observableOf,  Observable } from 'rxjs';

import {tap} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent } from "@angular/common/http";
import 'rxjs/Rx';
import { HttpCache } from './http-cache';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: HttpCache) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Before doing anything, it's important to only cache GET requests.
    // Skip this interceptor if the request method isn't GET.
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // First, check the cache to see if this request exists.
    const cachedResponse = this.cache.get(req);
    if (cachedResponse) {
      // A cached response exists. Serve it instead of forwarding
      // the request to the next handler.
      return observableOf(cachedResponse);
    }

    // No cached response exists. Go to the network, and cache
    // the response when it arrives.
    return next.handle(req).pipe(tap(event => {
      // Remember, there may be other events besides just the response.
      if (event instanceof HttpResponse) {
        // Update the cache.
        this.cache.put(req, event);
      }
    }));
  }
}
