/**
 * Angular-swx-session-storage - $sessionStorage service for use in your AngularJS applications.
 * @author Paul Massey, paul.massey@scriptwerx.io
 * @version v0.0.5
 * @build 11 - Wed Mar 11 2015 12:05:44 GMT+0000 (GMT)
 * @link http://www.scriptwerx.io
 * @license http://opensource.org/licenses/MIT
 */
!function(e){"use strict";function t(t,n,o){var r=n.host().substring(0,n.host().indexOf("."))+"_",s=!0,i=t.sessionStorage,a=o("session-cache"),c=this;c.prefix=function(e){r=e+"_",a.destroy(),a=o(r+"cache")},c.put=function(t,n){var o={data:n};return arguments.length>2&&e.isNumber(arguments[2])&&(o.expires=(new Date).getTime()+6e4*arguments[2]),a.put(t,o),s&&i.setItem(r+t,e.toJson(o,!1)),n},c.get=function(t){var n;if(a.get(t)?n=a.get(t):s&&(n=e.fromJson(i.getItem(r+t))),n){if(!(n.expires&&n.expires<(new Date).getTime()))return a.put(t,n),n.data;c.remove(t)}},c.remove=function(e){s&&i.removeItem(r+e),a.remove(e)},c.empty=function(){s&&i.clear(),a.removeAll()},function(){if(i)try{var e="swxTest_"+Math.round(1e7*Math.random());i.setItem(e,"test"),i.removeItem(e)}catch(e){s=!1}else s=!1}()}t.$inject=["$window","$location","$cacheFactory"],e.module("swxSessionStorage",[]).service("$sessionStorage",t)}(window.angular);