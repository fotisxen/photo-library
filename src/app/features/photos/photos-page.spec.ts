import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { Photo } from '../../core/models/photo';
import { FavoritesStore } from '../../core/services/favorites-store';
import { PhotoApi } from '../../core/services/photo-api';
import { MockIntersectionObserver, makePhotos } from '../../testing/test-helpers';
import { PhotosPage } from './photos-page';

describe('PhotosPage', () => {
  let fixture: ComponentFixture<PhotosPage>;
  let el: HTMLElement;
  let requests: Subject<Photo[]>[];
  let page = 0;

  beforeEach(async () => {
    localStorage.clear();
    requests = [];
    MockIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: PhotoApi,
          useValue: {
            getRandomPhotos: () => {
              const request = new Subject<Photo[]>();
              requests.push(request);
              return request;
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(PhotosPage);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  afterEach(() => vi.unstubAllGlobals());

  async function respond(count: number) {
    requests[requests.length - 1].next(makePhotos(count, `page${page++}-`));
    await fixture.whenStable();
  }

  const cards = () => el.querySelectorAll<HTMLButtonElement>('app-photo-card button');

  it('loads photos on start and shows a loader', async () => {
    expect(requests.length).toBe(1);
    expect(el.querySelector('app-loader')).not.toBeNull();

    await respond(4);
    expect(cards().length).toBe(4);
    expect(el.querySelector('app-loader')).toBeNull();
  });

  it('loads more photos when scrolled to the bottom', async () => {
    await respond(4);

    MockIntersectionObserver.last().trigger(true);
    await fixture.whenStable();
    expect(el.querySelector('app-loader')).not.toBeNull();

    await respond(4);
    expect(cards().length).toBe(8);
  });

  it('adds a photo to favorites on click', async () => {
    await respond(2);
    cards()[1].click();
    await fixture.whenStable();

    const clicked = fixture.componentInstance.stream.photos()[1];
    expect(TestBed.inject(FavoritesStore).isFavorite(clicked.id)).toBe(true);
    expect(el.querySelectorAll('app-photo-card')[1].querySelector('.badge')).not.toBeNull();
  });
});
