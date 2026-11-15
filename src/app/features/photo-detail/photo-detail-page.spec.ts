import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FavoritesStore } from '../../core/services/favorites-store';
import { createPhoto } from '../../core/services/photo-api';
import { PhotoDetailPage } from './photo-detail-page';

@Component({ template: '' })
class Empty {}

describe('PhotoDetailPage', () => {
  let store: FavoritesStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter(
          [
            { path: 'photos/:id', component: PhotoDetailPage },
            { path: 'favorites', component: Empty },
          ],
          withComponentInputBinding(),
        ),
      ],
    });
    store = TestBed.inject(FavoritesStore);
    store.add(createPhoto('abc'));
  });

  async function open(id: string) {
    const harness = await RouterTestingHarness.create(`/photos/${id}`);
    return { harness, el: harness.routeNativeElement! };
  }

  it('shows the photo with a remove button', async () => {
    const { el } = await open('abc');
    expect(el.querySelector('img')?.src).toBe(createPhoto('abc').fullUrl);
    expect(el.querySelector('.remove')?.textContent).toContain('Remove from favorites');
  });

  it('shows "not found" for a photo that is not a favorite', async () => {
    const { el } = await open('other');
    expect(el.textContent).toContain('Photo not found');
  });

  it('removes the photo and goes back to favorites', async () => {
    const { harness, el } = await open('abc');

    el.querySelector<HTMLButtonElement>('.remove')!.click();
    await harness.fixture.whenStable();

    expect(store.isFavorite('abc')).toBe(false);
    expect(TestBed.inject(Router).url).toBe('/favorites');
  });
});
