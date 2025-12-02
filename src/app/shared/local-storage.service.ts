import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  public writeEntry<T>(key: string, data: T): void {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
    } catch (error) {
      console.log('Error writing to local storage', error);
    }
  }

  public readEntry<T>(key: string): T | null {
    try {
      const jsonData = localStorage.getItem(key);
      if (jsonData) {
        return JSON.parse(jsonData) as T;
      }
      return null;
    } catch (error) {
      console.log('Error reading from local storage', error);
      return null;
    }
  }

  public removeEntry(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log('Error removing from local storage', error);
    }
  }
}
