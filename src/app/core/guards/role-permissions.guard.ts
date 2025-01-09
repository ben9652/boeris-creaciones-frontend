import { CanActivateFn } from '@angular/router';
import { DataAccessService } from '../services/data-access/data-access.service';
import { inject } from '@angular/core';
import { User } from '../models/user.entities';

export const adminPermissionsGuard: CanActivateFn = (route, state) => {
  const dataAccessService: DataAccessService = inject(DataAccessService);
  const user: User | null = dataAccessService.getUser();
  const roles: string[] | null = dataAccessService.getRoles();

  if(user === null) {
    return false;
  }
  
  if(user.role === 'a') {
    return true;
  }

  if(roles === null) {
    return false;
  }
  
  if(user.role !== 's' || !(roles.includes('sa'))) {
    return false;
  }
  
  return true;
};

export const provisionerPermissionsGuard: CanActivateFn = (route, state) => {
  const dataAccessService: DataAccessService = inject(DataAccessService);
  const user: User | null = dataAccessService.getUser();
  const roles: string[] | null = dataAccessService.getRoles();

  if(user === null) {
    return false;
  }

  if(user.role === 'a') {
    return true;
  }

  if(roles === null) {
    return false;
  }

  if(user.role !== 's' || !(roles.includes('sa') || roles.includes('ss'))) {
    return false;
  }
  
  return true;
}

export const makerPermissionsGuard: CanActivateFn = (route, state) => {
  const dataAccessService: DataAccessService = inject(DataAccessService);
  const user: User | null = dataAccessService.getUser();
  const roles: string[] | null = dataAccessService.getRoles();

  if(user === null) {
    return false;
  }

  if(user.role === 'a') {
    return true;
  }

  if(roles === null) {
    return false;
  }

  if(user.role !== 's' || !(roles.includes('sa') || roles.includes('se'))) {
    return false;
  }
  
  return true;
}

export const logisticPermissionsGuard: CanActivateFn = (route, state) => {
  const dataAccessService: DataAccessService = inject(DataAccessService);
  const user: User | null = dataAccessService.getUser();
  const roles: string[] | null = dataAccessService.getRoles();

  if(user === null) {
    return false;
  }

  if(user.role === 'a') {
    return true;
  }

  if(roles === null) {
    return false;
  }

  if(user.role !== 's' || !(roles.includes('sa') || roles.includes('sl'))) {
    return false;
  }
  
  return true;
}

export const sellerPermissionsGuard: CanActivateFn = (route, state) => {
  const dataAccessService: DataAccessService = inject(DataAccessService);
  const user: User | null = dataAccessService.getUser();
  const roles: string[] | null = dataAccessService.getRoles();

  if(user === null) {
    return false;
  }

  if(user.role === 'a') {
    return true;
  }

  if(roles === null) {
    return false;
  }

  if(user.role !== 's' || !(roles.includes('sa') || roles.includes('sv'))) {
    return false;
  }
  
  return true;
}
