import { Injectable, inject, signal } from '@angular/core';

import { Photo } from '../models/photo';
import { PhotoApi } from './photo-api';

export const PAGE_SIZE = 12;

// Provided in root so the loaded photos are kept when going to favorites and back.
@Injectable({ providedIn: 'root' })
export class PhotoStreamStore {
  private api = inject(PhotoApi);

  private _photos = signal<Photo[]>([]);
  private _loading = signal(false);

  readonly photos = this._photos.asReadonly();
  readonly loading = this._loading.asReadonly();

  loadMore(): void {
    if (this._loading()) {
      return;
    }
    this._loading.set(true);

    this.api.getRandomPhotos(PAGE_SIZE).subscribe((photos) => {
      this._photos.update((current) => [...current, ...photos]);
      this._loading.set(false);
    });
  }
}
