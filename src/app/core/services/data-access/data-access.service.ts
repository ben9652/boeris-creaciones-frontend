import { Injectable, signal, WritableSignal } from '@angular/core';
import { createEmptyUser, User } from '../../models/user.entities';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  token: WritableSignal<string | null> = signal(null);
  user: WritableSignal<User | null> = signal(null);
  roles: WritableSignal<string[] | null> = signal(null);
  
  constructor(
    private storageService: StorageService
  ) {
    
  }

  private loadUser(): void {
    let userString: string | null;
    userString = this.storageService.getItem('user');
    if(userString !== null) {
      this.user.set(JSON.parse(userString));
    }
  }

  private loadToken(): void {
    this.token.set(this.storageService.getItem('token'));
  }

  private loadRoles(): void {
    let rolesString: string | null;
    rolesString = this.storageService.getItem('roles');
    if(rolesString !== null) {
      this.roles.set(JSON.parse(rolesString));
    }
  }

  getUser(): User | null {
    if(this.user() !== null) {
      return this.user();
    }
    this.loadUser();
    return this.user();
  }

  getToken(): string | null {
    if(this.token() !== null) {
      return this.token();
    }
    this.loadToken();
    return this.token();
  }

  getRoles(): string[] | null {
    if(this.roles() !== null) {
      return this.roles();
    }
    this.loadRoles();
    return this.roles();
  }

  setUser(user: User | null): void {
    let userString: unknown = this.storageService.getItem('user');
    if(userString) {
      if (user === null) {
        this.storageService.removeItem('user');
        this.user.set(null);
      }
      return;
    }
    else if(user === null) {
      this.user.set(null);
      return;
    }

    this.storageService.setItem('user', JSON.stringify(user));
    this.user.set(user);
  }

  setToken(token: string | null): void {
    const tokenString = this.storageService.getItem('token');
    if(this.storageService.getItem('token')) {
      if(token === null) {
        this.storageService.removeItem('token');
        this.token.set(null);
      }
      return;
    }
    else if(token === null) {
      this.token.set(null);
      return;
    }

    this.storageService.setItem('token', token);
    this.token.set(token);
  }

  setRoles(roles: string[] | null): void {
    if(this.storageService.getItem('roles')) {
      if(roles === null) {
        this.storageService.removeItem('roles');
        this.roles.set(null);
      }
      return;
    }
    else if(roles === null) {
      this.roles.set(null);
      return;
    }

    this.storageService.setItem('roles', JSON.stringify(roles));
    this.roles.set(roles);
  }
}
