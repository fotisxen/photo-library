import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
  `,
  styles: `
    main {
      max-width: 1400px;
      margin: 0 auto;
      padding: var(--page-padding);
    }
  `,
})
export class App {}
