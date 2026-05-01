(function () {
    pagination(true);

    var processed = new WeakSet();

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
    }

    function checkAllCardImages() {
        document.querySelectorAll('.post-media .post-image').forEach(applyAspectRatio);
    }

    checkAllCardImages();
    window.addEventListener('load', checkAllCardImages);
    window.addEventListener('scroll', checkAllCardImages, {passive: true});
})();
