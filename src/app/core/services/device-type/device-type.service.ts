import { afterRender, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {
  navigator?: Navigator;
  ownSessionStorage?: Storage;

  constructor() {
    afterRender(() => {
      this.navigator = navigator;
      this.ownSessionStorage = sessionStorage;
    });
  }

  isMobile(): boolean {
    if(this.ownSessionStorage && this.ownSessionStorage.getItem('isMobile') !== null) {
      return true;
    }
    if(this.navigator) {
      const ua = this.navigator.userAgent;
      const isMobile: boolean = /Android|webOS|iPhone|iPad|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
      if(this.ownSessionStorage && isMobile) {
        this.ownSessionStorage.setItem('isMobile', 'true');
      }
      return isMobile;
    }
    else {
      throw Error('Service not initialized');
    }
  }
}
