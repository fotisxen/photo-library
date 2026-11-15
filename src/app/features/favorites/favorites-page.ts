import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

import { Photo } from '../../core/models/photo';
import { FavoritesStore } from '../../core/services/favorites-store';
import { EmptyState } from '../../shared/components/empty-state/empty-state';
import { PhotoGrid } from '../../shared/components/photo-grid/photo-grid';

@Component({
  selector: 'app-favorites-page',
  imports: [PhotoGrid, EmptyState, RouterLink, MatButton],
  template: `
    @if (favorites.favorites().length) {
      <app-photo-grid [photos]="favorites.favorites()" (photoClick)="open($event)" />
    } @else {
      <app-empty-state icon="favorite_border" title="No favorites yet">
        <a mat-flat-button routerLink="/">Browse photos</a>
      </app-empty-state>
    }
  `,
})
export class FavoritesPage {
  favorites = inject(FavoritesStore);
  private router = inject(Router);

  open(photo: Photo): void {
    this.router.navigate(['/photos', photo.id]);
  }
}
