// src/app/data.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData(): Observable<any[]> {
    return of([
      { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Manager', company: 'ABC Inc.', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Developer', company: 'XYZ Corp.', status: 'Active' },

      { id: 3, name: 'abha', email: 'abha@example.com', position: 'designer', company: 'XYZ Corp.', status: 'Inactive' },

      { id: 4, name: 'avi', email: 'avi@example.com', position: 'tester', company: 'XYZ Corp.', status: 'Active' },

      { id: 5, name: 'saurabh', email: 'saurabh@example.com', position: 'coder', company: 'XYZ Corp.', status: 'Inactive' },
      // Add more data rows as needed
      { id: 6, name: 'test', email: 'test@example.com', position: 'tester', company: 'XYZ Corp.', status: 'Inactive' },
      { id: 7, name: 'dg', email: 'dg@example.com', position: 'seo', company: 'XYZ Corp.', status: 'Inactive' },
      { id: 8, name: 'asdasd', email: 'jane@example.com', position: 'Developer', company: 'XYZ Corp.', status: 'Active' },
      { id: 9, name: 'komal', email: 'jane@example.com', position: 'Developer', company: 'XYZ Corp.', status: 'Inactive' },
      { id: 10, name: 'priya', email: 'jane@example.com', position: 'Developer', company: 'XYZ Corp.', status: 'Active' },
      { id: 11, name: 'priyanka', email: 'jane@example.com', position: 'Developer', company: 'XYZ Corp.', status: 'Active' },
      { id: 12, name: 'sharma', email: 'jane@example.com', position: 'Developer', company: 'XYZ Corp.', status: 'Inactive' },
      { id: 13, name: 'kumar', email: 'jane@example.com', position: 'Developer', company: 'XYZ Corp.', status: 'Inactive' },
      { id: 14, name: 'singh', email: 'jane@example.com', position: 'Developer', company: 'XYZ Corp.', status: 'Active' },

    ]);
  }
}
