import { Directive, ElementRef, effect, inject, input, output } from '@angular/core';

// Put this on an empty element below the list. When the element gets close to
// the screen, `scrolled` is emitted.
// A new observer is created each time the directive is enabled again. A new
// observer reports right away if the element is visible, so if the new photos
// didn't fill the screen the next page still loads.
@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScroll {
  disabled = input(false, { alias: 'infiniteScrollDisabled' });
  scrolled = output<void>();

  private el = inject(ElementRef);

  constructor() {
    effect((onCleanup) => {
      if (this.disabled()) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            this.scrolled.emit();
          }
        },
        { rootMargin: '400px' },
      );
      observer.observe(this.el.nativeElement);
      onCleanup(() => observer.disconnect());
    });
  }
}
