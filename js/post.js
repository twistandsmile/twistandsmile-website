$(function() {
    const slug = getSlug();
    const articleType = getArticleTypeFromUrl();

    const article = articles[articleType].filter(function(el) {
        return el.slug === slug;
    })[0];
    $('#title-area > h2').text(article.title);
    $('#title-area > h4').text(article.description);
    $('#title-area > small').text(new Date(article.date).toDateString() + ' · ' + article.duration + ' read');

    $('.comment-area').load('/html/includes/comment-form.html', function() {
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

        $('.comment-area').append('<div class="comments-wrapper"><div class="comments-container"></div></div>');
        const filteredComments = comments.filter(function(comment) { return comment.slug === slug });
        if (filteredComments.length > 0) {
            for (const comment of filteredComments) {
                $('.comments-container').append('<div class="comment"><div class="comment-header"><span class="comment-name">' + comment.name + '</span><span class="comment-date">' + comment.date + '</span></div><span class="comment-text">' + comment.comment + '</span></div>');
            }
            $(".comment-date").each(function() {
                const iso = $(this).text().trim();
                const date = new Date(iso);

                // put full date in tooltip
                $(this).attr("title", date.toDateString());

                const now = new Date();
                const seconds = Math.floor((now - date) / 1000);
                let display;
                const intervals = {
                    year:   365 * 24 * 60 * 60,
                    month:  30 * 24 * 60 * 60,
                    day:    24 * 60 * 60,
                    hour:   60 * 60,
                    minute: 60,
                    second: 1
                };
                for (const unit in intervals) {
                    const value = Math.floor(seconds / intervals[unit]);
                    if (value >= 1) {
                        display = value + " " + unit + (value > 1 ? "s" : "") + " ago";
                        break;
                    }
                }
                if (!display) {
                    display = "just now";
                }
                $(this).text(display);
            });
        } else {
            $('.comments-container').append('<div style="text-align: center;">There is no comments yet on this article. Be the first to share what you think !</div>');
        }
    });
});

function getSlug() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.html'));
}