import { TestBed } from '@angular/core/testing';
import { Router, provideRouter, withComponentInputBinding } from '@angular/router';
import { NEVER } from 'rxjs';

import { App } from './app';
import { routes } from './app.routes';
import { FavoritesStore } from './core/services/favorites-store';
import { PhotoApi, createPhoto } from './core/services/photo-api';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        { provide: PhotoApi, useValue: { getRandomPhotos: () => NEVER } },
      ],
    });
  });

  async function goTo(url: string) {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the photos page at /', async () => {
    const el = await goTo('/');
    expect(el.querySelector('app-header')).not.toBeNull();
    expect(el.querySelector('app-photos-page')).not.toBeNull();
  });

  it('shows the favorites page at /favorites', async () => {
    const el = await goTo('/favorites');
    expect(el.querySelector('app-favorites-page')).not.toBeNull();
  });

  it('shows a single photo at /photos/:id with the header', async () => {
    TestBed.inject(FavoritesStore).add(createPhoto('abc'));
    const el = await goTo('/photos/abc');

    expect(el.querySelector('app-header')).not.toBeNull();
    expect(el.querySelector('app-photo-detail-page img')).not.toBeNull();
  });

  it('redirects unknown urls to /', async () => {
    await goTo('/does-not-exist');
    expect(TestBed.inject(Router).url).toBe('/');
  });
});
