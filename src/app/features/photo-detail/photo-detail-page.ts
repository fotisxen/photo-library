import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { FavoritesStore } from '../../core/services/favorites-store';
import { EmptyState } from '../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-photo-detail-page',
  imports: [RouterLink, MatButton, MatIcon, EmptyState],
  templateUrl: './photo-detail-page.html',
  styleUrl: './photo-detail-page.scss',
})
export class PhotoDetailPage {
  // filled from the :id route param
  id = input.required<string>();

  private favorites = inject(FavoritesStore);
  private router = inject(Router);

  photo = computed(() => this.favorites.getById(this.id()));

  remove(): void {
    this.favorites.remove(this.id());
    this.router.navigate(['/favorites']);
  }
}
