import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private headerValueSubject = new BehaviorSubject<string>('');
  headerValue$ = this.headerValueSubject.asObservable();

  headerFunctionTriggered = new EventEmitter<void>();

  triggerHeaderFunction() {
    this.headerFunctionTriggered.emit();
  }
  
  setHeaderValue(value: string) {
    this.headerValueSubject.next(value);
  }
}
