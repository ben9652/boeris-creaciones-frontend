import { afterRender, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveRouteService {
  private ownSessionStorage?: Storage;
  
  private _route: string | null = null;

  constructor(
    private router: Router
  ) {
    afterRender(() => {
      this.ownSessionStorage = sessionStorage;
    })
  }

  setRoute(route: string) {
    this._route = route;
    if(this.ownSessionStorage) {
      this.ownSessionStorage.setItem('currentRoute', route);
    }
  }

  get route(): string | null {
    if(this.ownSessionStorage) {
      const route: string | null = this.ownSessionStorage.getItem('currentRoute');
      if(route !== null) {
        this._route = route;
      }
    }
    return this._route;
  }
}
