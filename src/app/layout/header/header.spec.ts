import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { Header } from './header';

@Component({ template: '' })
class Empty {}

describe('Header', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: Empty },
          { path: 'favorites', component: Empty },
        ]),
      ],
    });
  });

  async function setup(url: string) {
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    const [photosLink, favoritesLink] = fixture.nativeElement.querySelectorAll('nav a');
    return { harness, fixture, photosLink, favoritesLink };
  }

  it('has links to both pages', async () => {
    const { photosLink, favoritesLink } = await setup('/');
    expect(photosLink.getAttribute('href')).toBe('/');
    expect(favoritesLink.getAttribute('href')).toBe('/favorites');
  });

  it('highlights the current page', async () => {
    const { harness, fixture, photosLink, favoritesLink } = await setup('/');
    expect(photosLink.classList).toContain('active');
    expect(favoritesLink.classList).not.toContain('active');

    await harness.navigateByUrl('/favorites');
    await fixture.whenStable();
    expect(photosLink.classList).not.toContain('active');
    expect(favoritesLink.classList).toContain('active');
  });
});
