(function () {
    pagination(true);

    var processed = new WeakSet();
    var equalizeTimeout;

    function equalizeCardHeights() {
        var posts = Array.from(document.querySelectorAll('.post-feed .post'));
        if (!posts.length) return;
        posts.forEach(function(p) { p.style.minHeight = ''; });
        var maxH = posts.reduce(function(m, p) { return Math.max(m, p.offsetHeight); }, 0);
        if (maxH > 0) posts.forEach(function(p) { p.style.minHeight = maxH + 'px'; });
    }

    function scheduleEqualize() {
        clearTimeout(equalizeTimeout);
        equalizeTimeout = setTimeout(equalizeCardHeights, 150);
    }

    function applyAspectRatio(img) {
        if (processed.has(img)) return;
        var w = img.naturalWidth;
        var h = img.naturalHeight;
        if (!w || !h) return;
        processed.add(img);

        var figure = img.closest('.post-media');
        if (!figure) return;

        if (w !== h) {
            var placeholder = figure.querySelector('.u-placeholder');
            if (placeholder) {
                placeholder.classList.remove('rectangle');
                placeholder.classList.add('four-three');
                placeholder.style.paddingBottom = '133.33%';
            }

            var article = figure.closest('article');
            var excerpt = article && article.querySelector('.post-excerpt');
            if (excerpt) excerpt.style.display = 'none';
        }

        figure.classList.remove('post-media--pending');
        scheduleEqualize();
    }

    function checkAllCardImages() {
        document.querySelectorAll('.post-media .post-image').forEach(applyAspectRatio);
    }

    checkAllCardImages();
    window.addEventListener('load', checkAllCardImages);
    window.addEventListener('load', scheduleEqualize);
    window.addEventListener('scroll', checkAllCardImages, {passive: true});
    window.addEventListener('resize', scheduleEqualize);
})();
