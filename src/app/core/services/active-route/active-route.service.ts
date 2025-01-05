import { afterRender, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveRouteService {  
  private _route: WritableSignal<string | null> = signal(null);

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    afterRender(() => {
      this._route.set(storageService.getItem('currentRoute'));
    })
  }

  setRoute(route: string) {
    this._route.set(route);
    this.storageService.setItem('currentRoute', route);
  }

  get route(): string | null {
    if(this._route() === null) {
      const route: string | null = this.storageService.getItem('currentRoute');
      this._route.set(route);
    }
    
    return this._route();
  }
}
