---
name: Ruby theme review page portrait cards
description: Review tag page forces all cards to 3:4 portrait regardless of image aspect ratio or featured status
type: project
---
The `/tag/review/` page uses a custom template and CSS to force all cards to 3:4 portrait format.

All review posts have the Ghost "Featured" toggle on, which normally renders a bare `<img>` with no `.post-media` wrapper (featured layout with title overlaid). To bypass this:

- `partials/loop-portrait.hbs` — always uses `<figure class="post-media">` with `<div class="u-placeholder four-three" style="padding-bottom: 133.33%;">`, ignoring the `{{#if featured}}` branch entirely
- `tag-review.hbs` — uses `loop-portrait` instead of `loop`
- `assets/css/blog/review.css` — imported last in `screen.css` (after `utilities.css`); cancels all featured CSS overrides for `.tag-review .featured`: removes gradient overlay, shows the image inside post-media, restores text colors, restores background colors, resets `justify-content` to `flex-start`

**Why:** Ghost's `featured.css` hides `.post-media .post-image` (`display: none`) and adds a gradient overlay for featured cards. Without the CSS overrides, the image would be invisible even though the markup was correct.

**How to apply:** If adding new card layouts for other tag pages, check whether posts on that page have the Featured toggle on — if so, the featured CSS overrides must be cancelled via `.tag-{slug} .featured` rules.
