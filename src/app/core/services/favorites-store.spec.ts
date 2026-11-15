import { TestBed } from '@angular/core/testing';

import { createPhoto } from './photo-api';
import { FavoritesStore, STORAGE_KEY } from './favorites-store';

describe('FavoritesStore', () => {
  beforeEach(() => localStorage.clear());

  const createStore = () => TestBed.inject(FavoritesStore);

  it('starts empty', () => {
    expect(createStore().favorites()).toEqual([]);
  });

  it('adds photos, newest first', () => {
    const store = createStore();
    store.add(createPhoto('a'));
    store.add(createPhoto('b'));

    expect(store.favorites().map((p) => p.id)).toEqual(['b', 'a']);
    expect(store.isFavorite('a')).toBe(true);
  });

  it('does not add the same photo twice', () => {
    const store = createStore();
    store.add(createPhoto('a'));
    store.add(createPhoto('a'));
    expect(store.favorites().length).toBe(1);
  });

  it('removes photos', () => {
    const store = createStore();
    store.add(createPhoto('a'));
    store.add(createPhoto('b'));
    store.remove('a');

    expect(store.favorites().map((p) => p.id)).toEqual(['b']);
  });

  it('finds a photo by id', () => {
    const store = createStore();
    store.add(createPhoto('a'));

    expect(store.getById('a')?.id).toBe('a');
    expect(store.getById('b')).toBeUndefined();
  });

  it('saves to localStorage', () => {
    createStore().add(createPhoto('a'));
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual([createPhoto('a')]);
  });

  it('loads saved favorites (page refresh)', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([createPhoto('x'), createPhoto('y')]));
    expect(createStore().favorites().map((p) => p.id)).toEqual(['x', 'y']);
  });

  it('ignores broken data in localStorage', () => {
    localStorage.setItem(STORAGE_KEY, '{not json');
    expect(createStore().favorites()).toEqual([]);
  });
});
