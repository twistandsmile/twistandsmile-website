$(function() {
    const slug = getSlug();
    const articleType = getArticleTypeFromUrl();

    const article = articles[articleType].filter(function(el) {
        return el.slug === slug;
    })[0];
    $('#title-area > h2').text(article.title);
    $('#title-area > h4').text(article.description);
    $('#title-area > small').text(new Date(article.date).toDateString() + ' · ' + article.duration + ' read');

    $('.comment-form-area').load('/html/includes/comment-form.html', function() {
        $('input[name="slug"]').val(slug);
        document.getElementById("comment-form").addEventListener("submit", async (e) => {
            e.preventDefault();

            const data = Object.fromEntries(new FormData(e.target).entries());

            const res = await fetch("https://twistandsmile-comment.delicate-queen-35a1.workers.dev/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                alert("Comment submitted and awaiting moderation!");
                e.target.reset();
            } else {
                alert("Error submitting comment.");
            }
        });

    });
});

function getSlug() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.html'));
}