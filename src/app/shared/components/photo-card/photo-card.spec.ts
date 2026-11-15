import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Photo } from '../../../core/models/photo';
import { createPhoto } from '../../../core/services/photo-api';
import { PhotoCard } from './photo-card';

describe('PhotoCard', () => {
  let fixture: ComponentFixture<PhotoCard>;
  let el: HTMLElement;
  const photo = createPhoto('abc');

  beforeEach(async () => {
    fixture = TestBed.createComponent(PhotoCard);
    fixture.componentRef.setInput('photo', photo);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('shows the thumbnail', () => {
    expect(el.querySelector('img')?.src).toBe(photo.thumbnailUrl);
  });

  it('emits the photo on click', () => {
    let clicked: Photo | undefined;
    fixture.componentInstance.selected.subscribe((p) => (clicked = p));

    el.querySelector('button')!.click();
    expect(clicked).toEqual(photo);
  });

  it('shows the heart only for favorites', async () => {
    expect(el.querySelector('.badge')).toBeNull();

    fixture.componentRef.setInput('favorite', true);
    await fixture.whenStable();
    expect(el.querySelector('.badge')).not.toBeNull();
  });
});
