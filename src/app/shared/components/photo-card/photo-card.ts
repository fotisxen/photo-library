import { Component, input, output } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

import { Photo } from '../../../core/models/photo';

@Component({
  selector: 'app-photo-card',
  imports: [MatRipple, MatIcon],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.scss',
})
export class PhotoCard {
  photo = input.required<Photo>();
  favorite = input(false);
  selected = output<Photo>();
}
