import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { FavoritesStore } from '../../core/services/favorites-store';
import { createPhoto } from '../../core/services/photo-api';
import { FavoritesPage } from './favorites-page';

describe('FavoritesPage', () => {
  let store: FavoritesStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    store = TestBed.inject(FavoritesStore);
  });

  async function render() {
    const fixture = TestBed.createComponent(FavoritesPage);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows a message when there are no favorites', async () => {
    const el = await render();
    expect(el.textContent).toContain('No favorites yet');
  });

  it('lists the favorites', async () => {
    store.add(createPhoto('a'));
    store.add(createPhoto('b'));
    const el = await render();

    expect(el.querySelectorAll('app-photo-card').length).toBe(2);
  });

  it('opens the photo page on click', async () => {
    store.add(createPhoto('abc'));
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const el = await render();

    el.querySelector('button')!.click();
    expect(navigate).toHaveBeenCalledWith(['/photos', 'abc']);
  });
});
