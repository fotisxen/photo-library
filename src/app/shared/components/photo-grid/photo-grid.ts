import { Component, input, output } from '@angular/core';

import { Photo } from '../../../core/models/photo';
import { PhotoCard } from '../photo-card/photo-card';

@Component({
  selector: 'app-photo-grid',
  imports: [PhotoCard],
  template: `
    <div class="grid">
      @for (photo of photos(); track photo.id) {
        <app-photo-card
          [photo]="photo"
          [favorite]="favoriteIds().has(photo.id)"
          (selected)="photoClick.emit($event)"
        />
      }
    </div>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }

    @media (max-width: 599px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
    }
  `,
})
export class PhotoGrid {
  photos = input.required<Photo[]>();
  favoriteIds = input<Set<string>>(new Set());
  photoClick = output<Photo>();
}
