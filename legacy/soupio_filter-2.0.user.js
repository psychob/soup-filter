// ==UserScript==
// @name           Soup.io filter
// @namespace      psychobs-den
// @description    This script show in bottom left corner few icons that help you filter soup
// @include        http://*.soup.io/*
// @exclude        http://www.soup.io/*
// ==/UserScript==

/**
 * This script is (c) by andrzej budzanowski 2011
 * All rights reserved!
 *
 * This is 2.0 version
 *
 * @link http://psychobpl.wordpress.com/
 * @link http://psychob.soup.io/
 */
(function (_window) {
 if (_window.top != _window.self)
  return ;
 _window.addEventListener("DOMContentLoaded", function () {
   SOUP = {
   'text' : '/images/icon_regular.png',
   'link' : '/images/icon_link.png',
   'quote' : '/images/icon_quote.png',
   'image' : '/images/icon_image.png',
   'video' : '/images/icon_video.png',
   'file' : '/images/icon_file_audio.png',
   'review' : '/images/icon_review.png',
   'event' : '/images/icon_event.png'
  };
  //budujemy div-a
  var d = document.createElement('div');
  d.setAttribute('id', 'psychobs-den-filter');
  //style dla kontenera
  d.style.position = 'fixed';
  d.style.bottom = '10px';
  d.style.right = '10px';
  d.style.zIndex = '100';
  var add = '';
  if (document.location.href.indexOf('mode=friends') != -1)
   add = '&amp;mode=firends';
  else add = '&amp;mode=own';
  //sprawdzamy czy cos wyszukiwalismy
  if (document.location.href.indexOf('search=') != -1)
   {
    var t = document.location.href.indexOf('search=') + 7;
    var ta = '';
    //sprawdzamy czy nie ma tam jeszcze & po naszym szukaniu
    if (document.location.href.indexOf('&', t) != -1)
     {
      //jest
      ta = document.location.href.substr(t, document.location.href.indexOf('&', t) - t);
     } else
     {
      //nie ma
      ta = document.location.href.substr(t);
     }
    add = add + '&amp;search=' + ta;
   }
  for (var prop in SOUP)
   {
    //tworzymy nowy obiekt
    var tmp = document.createElement('div');
    tmp.innerHTML = //jako ze nie chce tutaj tworzyc niewiadomo czego..
    '<a href="?type=' + prop + add + '" title="Filter by: ' + prop + '"><img border="0" src="' +
	SOUP[prop] + '" alt="' + prop +'" /></a>';
    tmp.style.backgroundColor = '#000';
    tmp.style.marginBottom = '2px';
    if (typeof(tmp.style.borderRadius) != 'undefined')
     tmp.style.borderRadius = '10px';
    d.appendChild(tmp);
   }
  document.body.appendChild(d);
 }, true);
})(unsafeWindow);
