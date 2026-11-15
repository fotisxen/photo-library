# Photo Library

Infinite stream of random photos with a Favorites library.

Built with Angular 22, Angular Material and SCSS. Unit tests run with Vitest.

## Running it

```bash
npm install
npm start
```

Then open http://localhost:4200.

```bash
npm test     # unit tests
npm run build
```

## Pages

- `/` - random photos, loads more while you scroll. Click a photo to add it to favorites.
- `/favorites` - your favorite photos. Click one to open it.
- `/photos/:id` - one photo in full screen with a "Remove from favorites" button.

Favorites are saved in localStorage so they stay after a refresh.

## Notes

- Photos come from picsum.photos (`/seed/<id>/400/600`). Using the id as seed means a saved photo always shows the same image.
- `PhotoApi` fakes a real backend: every request takes a random 200-300ms.
- Infinite scroll is implemented in `shared/directives/infinite-scroll.ts` with an IntersectionObserver on an empty element below the grid. No libraries.

## Structure

```
src/app
  core/        photo model and services (api, favorites, photo stream)
  layout/      header
  shared/      reusable components (photo card, photo grid, loader, empty state) and the infinite scroll directive
  features/    one folder per page, lazy loaded
  testing/     helpers for the unit tests
```
