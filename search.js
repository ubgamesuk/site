doSearch= function() {
    const val= $("#searchbar").val().trim().replace(/ /g, "-");
    if (val!= "") {
        window.location= "/search.html?q="+ val;
    }
}

$("#searchbar").on('keydown', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {        
        doSearch();
    }
});

$( "#searchbutton" ).on( "click", function() {  
    doSearch();
});

$( document ).ready(function() {
    $("#searchbar").focus();
});
document.addEventListener("DOMContentLoaded", function(event) {
    const q= (window.location.href.split("?q=")?.[1]?? "").replace(/ /g, "").replace(/\+/g, "").replace(/-/g, "");
    let found= false;
    let cnt= 0;
    console.log("q", q);
    for (const gameitem of document.querySelectorAll(".azgame")) {
        const title= $(gameitem).find("h1").text();
        let match= true;
        let pos= 0;
        console.log("title", title);
        for (i=0; i< q.length; i++) {
            let newPos= title.toLowerCase().indexOf(q[i], pos);
            if (newPos< 0) {
                match= false;
                break;
            } else {
                pos= newPos+ 1;
            }
        }
        if (match && cnt< 10) {
            cnt++;
            found= true;
            console.log("match", title);
            $(gameitem).show();
        }
    }
    if (!found) {
        $("#searchError").show();
    }
});