import { Component, inject } from '@angular/core';

import { FavoritesStore } from '../../core/services/favorites-store';
import { PhotoStreamStore } from '../../core/services/photo-stream-store';
import { Loader } from '../../shared/components/loader/loader';
import { PhotoGrid } from '../../shared/components/photo-grid/photo-grid';
import { InfiniteScroll } from '../../shared/directives/infinite-scroll';

@Component({
  selector: 'app-photos-page',
  imports: [PhotoGrid, Loader, InfiniteScroll],
  template: `
    <app-photo-grid
      [photos]="stream.photos()"
      [favoriteIds]="favorites.ids()"
      (photoClick)="favorites.add($event)"
    />

    <div appInfiniteScroll [infiniteScrollDisabled]="stream.loading()" (scrolled)="stream.loadMore()"></div>

    @if (stream.loading()) {
      <app-loader />
    }
  `,
})
export class PhotosPage {
  stream = inject(PhotoStreamStore);
  favorites = inject(FavoritesStore);

  constructor() {
    if (!this.stream.photos().length) {
      this.stream.loadMore();
    }
  }
}
