import { TestBed } from '@angular/core/testing';

import { EmptyState } from './empty-state/empty-state';
import { Loader } from './loader/loader';

describe('Loader', () => {
  it('renders a spinner', async () => {
    const fixture = TestBed.createComponent(Loader);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).not.toBeNull();
  });
});

describe('EmptyState', () => {
  it('renders the icon and title', async () => {
    const fixture = TestBed.createComponent(EmptyState);
    fixture.componentRef.setInput('icon', 'favorite');
    fixture.componentRef.setInput('title', 'Nothing here');
    await fixture.whenStable();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('mat-icon')?.textContent).toBe('favorite');
    expect(el.querySelector('h2')?.textContent).toBe('Nothing here');
  });
});
