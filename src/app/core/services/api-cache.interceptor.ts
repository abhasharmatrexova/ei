// src/app/api-cache.interceptor.ts

import { Injectable } from '@angular/core';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable ,of} from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable()
export class ApiCacheInterceptor implements HttpInterceptor {

  // cache to store response data
  private cache = new Map<string, HttpResponse<any>>();

  private endPointsToCache = new Set<string>([
    'user-pages',
    'role'
    // Add more endpoint names here if needed
  ]);

  backendUrl: string;

  constructor(private cacheService: ApiService) {
    if (process.env['MASTER_COURIER']) {
      this.backendUrl = process.env['MASTER_COURIER'];
    } else {
       this.backendUrl = '';
    }

  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const url = request.url.replace( this.backendUrl ,'')
    if(this.endPointsToCache.has(url)) {

        const cachedResponse = this.cache.get(request.url);
        console.log("cachedResponse ",cachedResponse );
        if(cachedResponse){
          return of(cachedResponse);
        }
    
        return next.handle(request).pipe(
          tap((event) => {
            if (event instanceof HttpResponse) {
              console.log("HttpResponse ",request.url,event );
              this.cache.set(request.url, event);
            }
          })
        );  
  }

   return next.handle(request);
  }

}
