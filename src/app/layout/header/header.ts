import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatToolbar, MatButton, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
