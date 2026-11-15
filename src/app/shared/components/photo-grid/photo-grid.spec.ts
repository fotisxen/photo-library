import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Photo } from '../../../core/models/photo';
import { makePhotos } from '../../../testing/test-helpers';
import { PhotoGrid } from './photo-grid';

describe('PhotoGrid', () => {
  let fixture: ComponentFixture<PhotoGrid>;
  let el: HTMLElement;
  const photos = makePhotos(3);

  beforeEach(async () => {
    fixture = TestBed.createComponent(PhotoGrid);
    fixture.componentRef.setInput('photos', photos);
    fixture.componentRef.setInput('favoriteIds', new Set(['p1']));
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('renders a card for each photo', () => {
    expect(el.querySelectorAll('app-photo-card').length).toBe(3);
  });

  it('marks favorites', () => {
    const cards = el.querySelectorAll('app-photo-card');
    expect(cards[0].querySelector('.badge')).toBeNull();
    expect(cards[1].querySelector('.badge')).not.toBeNull();
  });

  it('emits the clicked photo', () => {
    let clicked: Photo | undefined;
    fixture.componentInstance.photoClick.subscribe((p) => (clicked = p));

    el.querySelectorAll('button')[2].click();
    expect(clicked).toEqual(photos[2]);
  });
});
