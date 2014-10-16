// ==UserScript==
// @id soupio-filter@psychobpl.wordpress.com
// @name Soup.io Filter Feature
// @namespace http://psychobpl.wordpress.com/
// @author Andrzej "PsychoB" Budzanowski <psychob.pl@gmail.com> http://psychobpl.wordpress.com/
// @version 4.0
// @description Add filter feature to soup.io souplogs.
// @website http://psychobpl.wordpress.com/
// @include *
// @exclude http://www.soup.io/*
// @exclude https://www.soup.io/*
// @exclude http://status.soup.io/*
// @run-at document-start
// @iconURL https://dl.dropbox.com/u/35418266/dev/soupio/logo.png
// ==/UserScript==

//
// soup.io filter ver 4.0
// (c) 2011 - 2012 Andrzej Budznowski
//
//  * Version: 4.0 (29/07/2012)
//    * Rewrite
//    * Added Opera Support
//  * Version: 3.1 (20/06/2012)
//    * Changed method for checking if we are on soup or if we not on soup
//    * Exclude from execution in http://status.soup.io/
//  * Version: 3.0 (7/03/2012)
//    * Rewrite it (again...)
//    * Work on Google Chrome
//    * Added icon
//    * Now work in all soup around the world!
//    * Support filtering your and friends stream
//  * Version: 2.0 (7/07/2011) 
//    * Work with friend and own streams. 
//    * Support since 
//    * Support search   
//  * Version: 1.1 (26/03/2011)  
//  * Version: 1.0 (3/01/2011)  
//

(function (win) {
 var SoupIoFilter =
  {
   SoupIoFilterWindow : null,
   SoupIoTypes        : 
    {
     'text' : '/images/icon_regular.png',
     'link' : '/images/icon_link.png',
     'quote' : '/images/icon_quote.png',
     'image' : '/images/icon_image.png',
     'video' : '/images/icon_video.png',
     'file' : '/images/icon_file_audio.png',
     'review' : '/images/icon_review.png',
     'event' : '/images/icon_event.png'
    },
   
   Init : function ( win )
   {
    SoupIoFilter.SoupIoFilterWindow = win;
    
    // sprawdzamy czy strona jest zdatna do użytku
    if (win.document.readyState == "complete" || 
        win.document.readySate == "loaded" || 
        win.document.readyState == "interactive")
    {
     // dokument jest załadowany
     SoupIoFilter.Init2();
    } else
     // dokument nie jest załadowany, czekamy aż się załaduje
     win.addEventListener("DOMContentLoaded", SoupIoFilter.Init2, false);
   },
   Init2 : function ( )
   {
    // sprawdzamy
    // a) domene, czy jest dobra
    var w = SoupIoFilter.SoupIoFilterWindow;
    if (w.document.location.host.match(/\.soup\.io/) == null)
     // b) czy jest zdefiniowany obiekt SOUP
     if (typeof w.SOUP == "undefined")
      return false;
    
    // jeśli jesteśmy tutaj, to sprawdzamy czy jesteśmy top
    if (w.top.location != w.document.location)
     return false;
    
    // jeśli wszystko się zgadza, to uruchamiamy kolejny rozdział
    SoupIoFilter.ShowMenu(w.document);
    return true;
   },
   ShowMenu : function ( doc )
   {
    var el = doc.createElement("div");
    el.setAttribute("id", "psychob-soup-filter");
    el.setAttribute("class", "psychob-soup-filter-4-0");
    el.style.position = 'fixed';
    el.style.right    = '5px';
    el.style.bottom   = '5px';
    
    for (var k in SoupIoFilter.SoupIoTypes)
     SoupIoFilter.AddNewElementToMenu(doc, el, k, SoupIoFilter.SoupIoTypes[k]);
    
    doc.body.appendChild(el);
   },
   AddNewElementToMenu : function (doc, cont, text, elm)
   {
    var nc = doc.createElement("div");
    var nca = doc.createElement("a");
    var ncimg = doc.createElement("img");
    
    // div
    nc.style.backgroundColor = '#000000';
    nc.style.display         = 'inline-block';
    nc.style.marginRight     = '5px';
    if (typeof nc.style.borderRadius != "undefined")
     nc.style.borderRadius   = '5px';
    
    // a
    nca.setAttribute("href", SoupIoFilter.GenerateUrl(doc, text));
    
    // img
    ncimg.setAttribute("src", elm);
    ncimg.setAttribute("title", text);
    
    nca.appendChild(ncimg);
    nc.appendChild(nca);
    cont.appendChild(nc);
   },
   GenerateUrl : function (doc, text)
   {
    var loc = doc.location;
    
    // pobieramy mode
    var mode = loc.search.match(/mode=([^&]+)/);
    if (mode != null) // znaleźliśmy
     mode = mode[1];
    else if (loc.pathname == '/friends')
     mode = '';
    else
     mode = 'own';
    
    // konstruujemy urla
    if (mode)
     return loc.protocol+'//'+loc.host+loc.pathname+'?type='+text+'&mode='+mode;
    else
     return loc.protocol+'//'+loc.host+loc.pathname+'?type='+text;
   }
  };
 SoupIoFilter.Init(win);
})(window || unsafeWindow)