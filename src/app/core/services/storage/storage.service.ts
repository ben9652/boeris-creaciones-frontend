import { inject, Injectable } from '@angular/core';
import { SESSION_STORAGE } from '../../../tokens';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage = inject(SESSION_STORAGE);

  getItem<T>(key: string): T | null {
    const storedValue = this.storage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : null;
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  constructor() { }
}
