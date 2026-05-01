(function () {
    pagination(true);

    document.querySelectorAll('.post-media').forEach(function (figure) {
        var img = figure.querySelector('.post-image');
        if (!img) return;

        function applyAspectRatio() {
            var w = img.naturalWidth;
            var h = img.naturalHeight;
            if (!w || !h || w === h) return;

            var placeholder = figure.querySelector('.u-placeholder');
            if (placeholder) {
                placeholder.classList.remove('rectangle');
                placeholder.classList.add('four-three');
            }

            var article = figure.closest('article');
            var excerpt = article && article.querySelector('.post-excerpt');
            if (excerpt) {
                excerpt.style.display = 'none';
            }
        }

        if (img.complete && img.naturalWidth) {
            applyAspectRatio();
        } else {
            img.addEventListener('load', applyAspectRatio);
        }
    });
})();
