import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { makePhotos } from '../../testing/test-helpers';
import { Photo } from '../models/photo';
import { PhotoApi } from './photo-api';
import { PAGE_SIZE, PhotoStreamStore } from './photo-stream-store';

describe('PhotoStreamStore', () => {
  let store: PhotoStreamStore;
  let requests: Subject<Photo[]>[];
  let getRandomPhotos: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    requests = [];
    getRandomPhotos = vi.fn(() => {
      const request = new Subject<Photo[]>();
      requests.push(request);
      return request;
    });
    TestBed.configureTestingModule({
      providers: [{ provide: PhotoApi, useValue: { getRandomPhotos } }],
    });
    store = TestBed.inject(PhotoStreamStore);
  });

  function respond(photos: Photo[]) {
    requests[requests.length - 1].next(photos);
  }

  it('loads a page', () => {
    store.loadMore();
    expect(getRandomPhotos).toHaveBeenCalledWith(PAGE_SIZE);
    expect(store.loading()).toBe(true);

    respond(makePhotos(3));
    expect(store.loading()).toBe(false);
    expect(store.photos().length).toBe(3);
  });

  it('appends the next pages', () => {
    store.loadMore();
    respond(makePhotos(2, 'a'));
    store.loadMore();
    respond(makePhotos(2, 'b'));

    expect(store.photos().map((p) => p.id)).toEqual(['a0', 'a1', 'b0', 'b1']);
  });

  it('does not start a second request while loading', () => {
    store.loadMore();
    store.loadMore();
    expect(getRandomPhotos).toHaveBeenCalledTimes(1);
  });
});
