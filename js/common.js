    $.urlParam = function(name){
        const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
            return null;
        }
        return decodeURI(results[1]) || 0;
    }

    $(function () {
        document.getElementById("year").textContent = new Date().getFullYear();
        let articleType = $.urlParam("type");
        if(articleType != null) {
            loadNav(articleType);
        } else {
            let articleTypes = ['blog', 'news', 'adventures'];
            let loaded = false;
            for(type of articleTypes) {
                if(window.location.href.indexOf('/' + type + '/') != -1) {
                    loadNav(type);
                    loaded = true;
                    break;
                }
            }
            if(!loaded) {
                loadNav('home');
            }
        }
    });

    function loadNav(toHighlight) {
        $("#nav").load("/html/includes/nav.html", function () {
            $('#menu-link-' + toHighlight).addClass('selected');
        });
    }

    // Smooth scroll helper
    function scrollToSection(id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({behavior: "smooth", block: "start"});
    }
