import { TestBed } from '@angular/core/testing';

import { Photo } from '../models/photo';
import { PhotoApi, createPhoto } from './photo-api';

describe('PhotoApi', () => {
  let api: PhotoApi;

  beforeEach(() => {
    vi.useFakeTimers();
    api = TestBed.inject(PhotoApi);
  });

  afterEach(() => vi.useRealTimers());

  it('creates picsum urls using the id as seed', () => {
    expect(createPhoto('abc')).toEqual({
      id: 'abc',
      thumbnailUrl: 'https://picsum.photos/seed/abc/400/600',
      fullUrl: 'https://picsum.photos/seed/abc/1200/1800',
    });
  });

  it('returns the requested number of photos', () => {
    let photos: Photo[] = [];
    api.getRandomPhotos(20).subscribe((result) => (photos = result));
    vi.advanceTimersByTime(300);

    expect(photos.length).toBe(20);
    expect(new Set(photos.map((p) => p.id)).size).toBe(20);
  });

  it('responds after 200-300ms', () => {
    let done = false;
    api.getRandomPhotos(1).subscribe(() => (done = true));

    vi.advanceTimersByTime(199);
    expect(done).toBe(false);
    vi.advanceTimersByTime(101);
    expect(done).toBe(true);
  });
});
