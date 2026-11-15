import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { Photo } from '../models/photo';

const MIN_DELAY = 200;
const MAX_DELAY = 300;

export function createPhoto(id: string): Photo {
  return {
    id,
    thumbnailUrl: `https://picsum.photos/seed/${id}/400/600`,
    fullUrl: `https://picsum.photos/seed/${id}/1200/1800`,
  };
}

// Fake backend: returns random photos after a random 200-300ms delay.
@Injectable({ providedIn: 'root' })
export class PhotoApi {
  getRandomPhotos(count: number): Observable<Photo[]> {
    const photos = Array.from({ length: count }, () => createPhoto(randomId()));
    const ms = MIN_DELAY + Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1));
    return of(photos).pipe(delay(ms));
  }
}

function randomId(): string {
  return Math.random().toString(36).slice(2, 12);
}
