// src/app/grid-js.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { GridJsModel } from './gridjs.model';
import { SortColumn, SortDirection } from '../table/listjs/listjs-sortable.directive';


interface SearchResult {
  countries: GridJsModel[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

export class GridJsService {
  // private _loading$ = new BehaviorSubject<boolean>(true);
  // private _gridData$ = new BehaviorSubject<any[]>([]);
  // private _totalRecords$ = new BehaviorSubject<number>(0);

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<GridJsModel[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0
  };

  constructor() {}

  getData(page: number, pageSize: number): Observable<any> {
    // Replace this with your data fetching logic.
    // You should fetch data for the specified page and page size.
    // Calculate the total number of records for pagination.
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    // Simulate data loading
    const data = this.generateData(start, end);

    return of({ gridData: data, totalRecords: 100 }); // Replace with actual data and total records
  }

  // Replace this with actual data generation logic
  generateData(start: number, end: number): any[] {
    const data = [];
    for (let i = start + 1; i <= end; i++) {
      data.push({ id: i, name: `Item ${i}` });
    }
    return data;
  }
}
