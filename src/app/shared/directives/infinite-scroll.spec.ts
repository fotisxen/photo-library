import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockIntersectionObserver } from '../../testing/test-helpers';
import { InfiniteScroll } from './infinite-scroll';

@Component({
  imports: [InfiniteScroll],
  template: `<div appInfiniteScroll [infiniteScrollDisabled]="disabled()" (scrolled)="count = count + 1"></div>`,
})
class TestHost {
  disabled = signal(false);
  count = 0;
}

describe('InfiniteScroll', () => {
  let fixture: ComponentFixture<TestHost>;
  let host: TestHost;

  beforeEach(async () => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    fixture = TestBed.createComponent(TestHost);
    host = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => vi.unstubAllGlobals());

  it('observes the element', () => {
    expect(MockIntersectionObserver.last().elements).toEqual([fixture.nativeElement.querySelector('div')]);
  });

  it('emits when the element becomes visible', () => {
    MockIntersectionObserver.last().trigger(true);
    expect(host.count).toBe(1);
  });

  it('does not emit when the element is not visible', () => {
    MockIntersectionObserver.last().trigger(false);
    expect(host.count).toBe(0);
  });

  it('stops observing while disabled', async () => {
    host.disabled.set(true);
    await fixture.whenStable();
    expect(MockIntersectionObserver.last().disconnected).toBe(true);
  });

  it('observes again after being enabled', async () => {
    host.disabled.set(true);
    await fixture.whenStable();
    host.disabled.set(false);
    await fixture.whenStable();

    expect(MockIntersectionObserver.instances.length).toBe(2);
    MockIntersectionObserver.last().trigger(true);
    expect(host.count).toBe(1);
  });
});
