import { afterRender, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {
  navigator?: Navigator;

  constructor() {
    afterRender(() => {
      this.navigator = navigator;
    });
  }

  isMobile(): boolean {
    if(this.navigator) {
      const ua = this.navigator.userAgent;
      return /Android|webOS|iPhone|iPad|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
    }
    else {
      throw Error('Service not initialized');
    }
  }
}
