// ==UserScript==
// @id soupio-filter@psychobpl.wordpress.com
// @name Soup.io Filter Feature
// @namespace http://psychobpl.wordpress.com/
// @author Andrzej "PsychoB" Budzanowski <psychob.pl@gmail.com> http://psychobpl.wordpress.com/
// @version 3.0
// @description Add filter feature to soup.io souplogs.
// @website http://psychobpl.wordpress.com/
// @include *
// @exclude http://www.soup.io/*
// @run-at document-start
// @iconURL https://dl.dropbox.com/u/35418266/dev/soupio/logo.png
// ==/UserScript==

//
// soup.io filter ver 3.0
// (c) 2011 - 2012 Andrzej Budznowski
//
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

var _sif = {
 soup_images : {
   'text' : '/images/icon_regular.png',
   'link' : '/images/icon_link.png',
   'quote' : '/images/icon_quote.png',
   'image' : '/images/icon_image.png',
   'video' : '/images/icon_video.png',
   'file' : '/images/icon_file_audio.png',
   'review' : '/images/icon_review.png',
   'event' : '/images/icon_event.png'
  },
  _canYouRunIt : true,
  init : function ()
  {
   if (document !== "undefined" && document.readyState == "complete") /// @todo 
    _sif.pre_req();
   else
    window.addEventListener("DOMContentLoaded", _sif.pre_req, false);
  },
  pre_req : function ()
  {
   if (!_sif._canYouRunIt)
    return ;
   console.log('Check if SOUP!');
   
   var ct = false;
   for (var it = 0; it < document.styleSheets.length; ++it)
    if (/http:\/\/static.soup.io\//.test(document.styleSheets[it].href))
     {
      ct = true;
      break;
     }
   if (!ct)
   {
    _sif._canYouRunIt = false;
    return ;
   }
   _sif.show_blob();
  },
  show_blob : function ()
  {
   if (!_sif._canYouRunIt)
    return ;
	
   // dodajemy linki
   var ele = document.createElement("div");
   ele.setAttribute("id", "__soupio_filter_cont");
   ele.style.position = 'fixed';
   ele.style.bottom = '2px';
   ele.style.right = '2px';
   ele.style.zIndex = '1999';
   
   _sif.addElement('text', ele);
   _sif.addElement('link', ele);
   _sif.addElement('quote', ele);
   _sif.addElement('image', ele);
   _sif.addElement('video', ele);
   _sif.addElement('file', ele);
   _sif.addElement('review', ele);
   _sif.addElement('event', ele);
   
   document.body.appendChild(ele);
  },
  addElement : function (elementId, tocont)
  {
   var _l = document.createElement("div");
   _l.style.display = "inline-block";
   _l.style.backgroundColor = '#000';
   if (!_l.style.borderRadius)
    _l.style.borderRadius = '10px';
   _l.style.margin = '2px';
   //tworzymy a i img'a
    var a_link = document.createElement("a");
    a_link.style.display = 'inline-block';
     var img = document.createElement("img");
     img.setAttribute("src", _sif.soup_images[elementId]);
     img.style.width = '32px';
     img.style.height = '32px';
    a_link.appendChild(img);
    a_link.setAttribute('href', _sif.generate_link(elementId));
   _l.appendChild(a_link);
   tocont.appendChild(_l);
  },
  generate_link : function (id)
  {
   var hrf = document.location;
   if (hrf.pathname == "/" &&
       hrf.search == "")
   {
    return "/?type=" + id;
   } else
   {
    //jeśli nie to sprawdzamy sobie spokojnie w czym jesteśmy...
    //najpierw since, i friends
    if (/mode=own/.test(hrf.search))
     {
      //jeśli jesteśmy w naszej przeszłości, to nic nie robimy
      return hrf.pathname + "?type=" + id + "&mode=own";
     } else if (/mode=friends/.test(hrf.search))
     {
      return hrf.pathname + "?type=" + id + "&mode=friends";
     } else
     {
      //dwie możliwości, albo mamy search, albo nie wiemy nic
      //pierwsza
      var r = /search=([^&]+)/;
      var match = r.exec(hrf.search);
      if (match != null)
       {
        return hrf.pathname + "?type=" + id + "&search=" + match[1];
       } else
       {
        return hrf.pathname + "?type=" + id; //nie wiem co sie dzieje
       }
     }
   }
  }
};

_sif.init();