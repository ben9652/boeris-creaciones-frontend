import { CanActivateFn } from '@angular/router';
import { DeviceTypeService } from '../services/device-type.service';
import { inject } from '@angular/core';

export const mobileAccessGuard: CanActivateFn = (route, state) => {
  const deviceTypeService: DeviceTypeService = inject(DeviceTypeService);
  let isMobile: boolean = deviceTypeService.isMobile();
  return isMobile;
};