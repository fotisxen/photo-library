import { Injectable, computed, signal } from '@angular/core';

import { Photo } from '../models/photo';

export const STORAGE_KEY = 'favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesStore {
  private items = signal<Photo[]>(load());

  readonly favorites = this.items.asReadonly();
  readonly ids = computed(() => new Set(this.items().map((photo) => photo.id)));

  isFavorite(id: string): boolean {
    return this.ids().has(id);
  }

  getById(id: string): Photo | undefined {
    return this.items().find((photo) => photo.id === id);
  }

  add(photo: Photo): void {
    if (!this.isFavorite(photo.id)) {
      this.save([photo, ...this.items()]);
    }
  }

  remove(id: string): void {
    this.save(this.items().filter((photo) => photo.id !== id));
  }

  private save(photos: Photo[]): void {
    this.items.set(photos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  }
}

function load(): Photo[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}
