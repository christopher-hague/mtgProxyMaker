$( document ).ready(function() {
    // google tracking
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-64784451-1', 'auto');
    ga('send', 'pageview');

    // pls
    if (window.canRunAds === undefined) {
        $("#pls").show();
    }

    // Search submit on click
    $("span.glyphicon").click(function() {
        console.log($(this).parent().parent().submit());
    });

    // Typeahead
    $.get('/js/typeahead.json', function(data){
        $('.typeahead').typeahead({ source:data });
    },'json');

    // Filter panel slide
    $("#ftitle").click(function() {
        $("#fpanel").slideToggle("fast");
    });

    // Filter panel help
    $("a#fhelp").click(function() {
        $("div#fhelp").toggle();
        return false;
    });

    // Filter panel submit actions
    $("form#filter").submit(function(event) {
        var str = ''
        $("#fnpanel").find(":text.box, :text.searchbox").each(function() {
            if ($(this).val()) {
                str += $(this).parent().parent().find("select").val() + '=' + $(this).val() + ';';
            }
        });

        // Error handling
        $("#fcpanel").find("select.type").each(function() {
            $("#ferror").text("");

            var num = $(this).parent().parent().find(".box");
            if (num != null) { num = num.val(); }

            // Check for unselected type
            if ($(this).val() == null && num) {
                $("#ferror").text("Please choose a card type");
                event.preventDefault();
            } else if (num) {
                // Ensure each non-empty count filter has a number between 0 and 100
                $(this).parent().parent().find("select").each(function() {
                    if ($.isArray($(this).val())) {
                        str += $(this).val().sort().join('') + ':';
                    } else {
                        str += $(this).val() + ':';
                    }
                });
                str = str.substring(0, str.length - 1);
                str += '=' + num + ';';
            }
        });

        // If default wasn't prevented, disable empty inputs so they aren't submitted
        if (!event.isDefaultPrevented()) {
            str = str.substring(0, str.length - 1);
            $(this).find(':input[name != "url"]').attr('disabled', true);
            $(this).append('<input type="hidden" name="f" value="' + str + '" />');
            return true;
        }
    });

    // Creates additional filter panel rows based on URL queries
    var first_n = true;
    var first_c = true;
    var uri = decodeURIComponent(document.URL).split('?')[1];
    if (uri != undefined) {
        $.each(uri.split("&"), function(index, chunk) {
            var chunk = chunk.replace(/\+/g, " ");
            var key = chunk.split("=")[0];

            if (key == 'f') {
                value = chunk.substring(2);

                $.each(decodeURIComponent(value).split(";"), function(index, chunk) {
                    var key = chunk.split("=")[0];
                    var value = chunk.split("=")[1];

                    if (key == 'in' || key == 'out') {
                        if (first_n) {
                            first_n = false;
                            $("#fnpanel").find("select").val(key);
                            $("#fnpanel").find(".searchbox").val(value);
                        } else {
                            $("#fnpanel").find("tr").last().after('<tr><td><select class="chosen-select name"><option value="in">With</option><option value="out">Without</option></select></td><td><input type="text" class="searchbox" name="in"></td><td><button type="button" class="btn btn-danger btn-sm fmbutton">-</button></td></tr>');
                            $("#fnpanel").find("tr").last().find("select").val(key);
                            $("#fnpanel").find("tr").last().find(".searchbox").val(value);
                        }
                    } else {
                        types = []
                        type = key.split(":")[0];
                        op = key.split(":")[1];
                        if (type.includes("c")) { types.push("c"); }
                        if (type.includes("i")) { types.push("i"); }
                        if (type.includes("s")) { types.push("s"); }
                        if (type.includes("a")) { types.push("a"); }
                        if (type.includes("e")) { types.push("e"); }
                        if (type.includes("p")) { types.push("p"); }
                        if (type.includes("l")) { types.push("l"); }
                        if (type.includes("d")) { types.push("d"); }

                        if (first_c) {
                            first_c = false;
                            $("#fcpanel").find("select.type").val(types);
                            $("#fcpanel").find("select.op").val(op);
                            $("#fcpanel").find(".box").val(value);
                        } else {
                            $("#fcpanel").find("tr").last().after('<tr><td><select class="chosen-select type" data-placeholder="Choose a card type" multiple><option value="c">Creatures</option><option value="i">Instants</option><option value="s">Sorceries</option><option value="a">Artifacts</option><option value="e">Enchantments</option><option value="p">Planeswalkers</option><option value="lands">Lands</option></select></td><td><select class="chosen-select op"><option value="gt">&gt;</option><option value="lt">&lt;</option><option value="eq">=</option><option value="ne">&ne;</option></select></td><td><input type="text" class="box" name="filtcount"></td><td><button type="button" class="btn btn-danger btn-sm fmbutton">-</button></td></tr>');
                            $("#fcpanel").find("tr").last().find("select.type").val(types);
                            $("#fcpanel").find("tr").last().find("select.op").val(op);
                            $("#fcpanel").find("tr").last().find(".box").val(value);
                        }
                    }
                });
            }
        });
    }

    $("#fpanel").find("select").chosen();
    if (first_n && first_c) {
        $("#fpanel").slideUp(0);
    }
});

// Delete a filter row
$( document ).on('click', '.fmbutton', function() {
    $(this).parent().parent().remove();
});

// Add a name filter row
$( document ).on('click', '.filtname', function() {
    $(this).parent().parent().parent().find("tr").last().after('<tr><td><select class="chosen-select name"><option value="in">With</option><option value="out">Without</option></select></td><td><input type="text" class="searchbox typeahead" data-provide="typeahead" autocomplete="off" name="in"></td><td><button type="button" class="btn btn-danger btn-sm fmbutton">-</button></td></tr>');
    $.get('/js/typeahead.json', function(data){
        $('input.typeahead').typeahead({ source:data });
    },'json');
    $("#fpanel").find("select").chosen()
});

// Add a count filter row
$( document ).on('click', '.filtcount', function() {
    $(this).parent().parent().parent().find("tr").last().after('<tr><td><select class="chosen-select type" data-placeholder="Choose a card type" multiple><option value="c">Creatures</option><option value="i">Instants</option><option value="s">Sorceries</option><option value="a">Artifacts</option><option value="e">Enchantments</option><option value="p">Planeswalkers</option><option value="l">Lands</option></select></td><td><select class="chosen-select op"><option value="gt">&gt;</option><option value="lt">&lt;</option><option value="eq">=</option><option value="ne">&ne;</option></select></td><td><input type="text" class="box" name="nullgt"></td><td><button type="button" class="btn btn-danger btn-sm fmbutton">-</button></td></tr>');
    $.get('/js/typeahead.json', function(data){
        $('input.typeahead').typeahead({ source:data });
    },'json');
    $("#fpanel").find("select").chosen()
});

// Update text input name upon select box change based on select box values
$( document ).on('change', 'select', function() {
    var str = ''
    $(this).parent().parent().find('select').each(function() {
       str += $(this).val();
    });
    $(this).parent().parent().find('.box, .searchbox').attr('name', str);
});
