    $(function () {
        let articleType = $.urlParam("type");

        $('.hero-title').text(articleType.toUpperCase());
        $('.hero-sub').text(articleType === 'blog' ? 'Personal thoughts & stories, travels and more !' :
                            articleType === 'news' ? 'Motorcycle news, bike culture and events !' :
                            articleType === 'adventures' ? 'Off-road escapes, moto camping, and freedom !' :
                                                     '');

        for(const article of articles[articleType]) {
            const element = '<article class="article-card" data-slug="' + article.slug + '">' +
                '                <div style="height: 185px">' +
                '                    <img height=185 src="/img/' + articleType + '/' + article.slug + '/' + article.img + '">' +
                '                </div>' +
                '                <aside style="align-content: center">' +
                '                    <h2 class="article-title">' + article.title + '</h2>' +
                '                    <div class="article-meta">' + new Date(article.date).toDateString() + ' · ' + article.duration + ' read</div>' +
                '                    <p>' + article.description + '</p>' +
                '                </aside>' +
                '            </article>';
            $("#articles-container").append(element);
        }

        $(".article-card").each(function() {
            $(this).click(function() {
                location.href='/html/' + articleType + '/' + $(this).data('slug') + '.html';
            });
        });

    });
