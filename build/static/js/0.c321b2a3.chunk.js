(this.webpackJsonpvouch=this.webpackJsonpvouch||[]).push([[0],{188:function(t,e,n){"use strict";n.r(e),n.d(e,"createSwipeBackGesture",(function(){return c}));var r=n(24),a=(n(35),n(49)),c=function(t,e,n,c,i){var o=t.ownerDocument.defaultView;return Object(a.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return t.startX<=50&&e()},onStart:n,onMove:function(t){var e=t.deltaX/o.innerWidth;c(e)},onEnd:function(t){var e=t.deltaX,n=o.innerWidth,a=e/n,c=t.velocityX,u=n/2,s=c>=0&&(c>.2||t.deltaX>u),h=(s?1-a:a)*n,d=0;if(h>5){var v=h/Math.abs(c);d=Math.min(v,540)}i(s,a<=0?.01:Object(r.c)(0,a,.9999),d)}})}}}]);
//# sourceMappingURL=0.c321b2a3.chunk.js.map