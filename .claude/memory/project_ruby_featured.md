---
name: Ruby theme featured post layout
description: Ghost "Featured" toggle posts have title pinned to the bottom of the image; separate from aspect ratio logic
type: project
originSessionId: d1e3c4da-2181-45c5-8039-b698d5384852
---
Posts marked as "Featured" in Ghost (the toggle, not a tag) use a different layout: title overlaid at the bottom of the full-bleed image with a gradient.

They are excluded from aspect ratio detection — featured posts use a bare `<img>` without the `.post-media` wrapper, so the JS `img.closest('.post-media')` check naturally skips them.

In CSS (`packages/ruby/assets/css/blog/featured.css`), the `.post-feed .featured .post-wrapper` override uses `justify-content: flex-end` to pin content to the bottom. Do NOT add `align-items: flex-end` — in a flex column, that pushes content to the right edge.

Global `.post-wrapper` uses `justify-content: flex-start`; featured override uses `justify-content: flex-end`.

**Why:** `align-items` controls cross-axis (horizontal in a column), not vertical. Adding `align-items: flex-end` caused the featured post title to appear on the right side of the card.
