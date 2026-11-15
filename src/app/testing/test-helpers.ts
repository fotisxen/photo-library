import { Photo } from '../core/models/photo';
import { createPhoto } from '../core/services/photo-api';

export function makePhotos(count: number, prefix = 'p'): Photo[] {
  return Array.from({ length: count }, (_, i) => createPhoto(prefix + i));
}

// jsdom has no IntersectionObserver, this one lets tests trigger it by hand
export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  elements: Element[] = [];
  disconnected = false;

  constructor(private callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }

  static last() {
    return MockIntersectionObserver.instances[MockIntersectionObserver.instances.length - 1];
  }

  observe(el: Element) {
    this.elements.push(el);
  }

  disconnect() {
    this.disconnected = true;
  }

  trigger(isIntersecting: boolean) {
    const entries = this.elements.map((target) => ({ target, isIntersecting }) as IntersectionObserverEntry);
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}
