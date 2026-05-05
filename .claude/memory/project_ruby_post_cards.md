---
name: Ruby theme post card aspect ratio and height equalization
description: How post card images are detected and rendered by aspect ratio, and how card heights are equalized across rows
type: project
originSessionId: d1e3c4da-2181-45c5-8039-b698d5384852
---
Feature images are rendered based on their intrinsic aspect ratio, detected in JS via `img.naturalWidth`/`img.naturalHeight` (Ghost HBS template variables for image dimensions do not work).

- 1:1 images → square placeholder (`u-placeholder rectangle`, `padding-bottom: 100.25%`), excerpt shown
- Non-1:1 images → portrait placeholder (`u-placeholder four-three`, `padding-bottom: 133.33%`), excerpt hidden
- Cards start with `post-media--pending` (opacity: 0) to avoid visible layout shift; class is removed after JS applies the correct aspect ratio

Excerpt is kept on 1:1 cards intentionally — it fills white space that would otherwise appear due to the shorter image.

Card height equalization: JS measures all `.post-feed .post` cards, resets `min-height`, finds the max, and applies it to all cards. Debounced 150ms. Runs on `load`, `scroll` (for lazy images), and `resize`. This ensures all rows match the tallest row (typically the portrait-image row).

Key files:
- `packages/ruby/assets/js/main.js` — aspect ratio detection + equalization
- `packages/ruby/assets/css/misc/utilities.css` — `.u-placeholder.rectangle` and `.u-placeholder.four-three`
- `packages/ruby/assets/css/blog/post.css` — `.post-wrapper` uses `justify-content: flex-start` so text sits below image, not floated to middle
- `packages/ruby/partials/loop.hbs` — `post-media--pending` class on figure

**Why:** Ghost template doesn't expose image dimensions usably. Lazy-loaded images have naturalWidth=0 until scrolled into view, so scroll event listener is needed. `justify-content: flex-start` keeps text anchored below image regardless of equalized card height.
