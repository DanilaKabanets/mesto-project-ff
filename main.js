/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function r(){r=function(){return n};var e,n={},o=Object.prototype,a=o.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",l=c.asyncIterator||"@@asyncIterator",s=c.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(e){f=function(t,e,r){return t[e]=r}}function p(t,e,r,n){var o=e&&e.prototype instanceof _?e:_,a=Object.create(o.prototype),c=new I(n||[]);return i(a,"_invoke",{value:q(t,r,c)}),a}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}n.wrap=p;var h="suspendedStart",y="suspendedYield",m="executing",v="completed",b={};function _(){}function g(){}function S(){}var L={};f(L,u,(function(){return this}));var w=Object.getPrototypeOf,E=w&&w(w(A([])));E&&E!==o&&a.call(E,u)&&(L=E);var k=S.prototype=_.prototype=Object.create(L);function C(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function x(e,r){function n(o,i,c,u){var l=d(e[o],e,i);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==t(f)&&a.call(f,"__await")?r.resolve(f.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):r.resolve(f).then((function(t){s.value=t,c(s)}),(function(t){return n("throw",t,c,u)}))}u(l.arg)}var o;i(this,"_invoke",{value:function(t,e){function a(){return new r((function(r,o){n(t,e,r,o)}))}return o=o?o.then(a,a):a()}})}function q(t,r,n){var o=h;return function(a,i){if(o===m)throw Error("Generator is already running");if(o===v){if("throw"===a)throw i;return{value:e,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=j(c,n);if(u){if(u===b)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=m;var l=d(t,r,n);if("normal"===l.type){if(o=n.done?v:y,l.arg===b)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=v,n.method="throw",n.arg=l.arg)}}}function j(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,j(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),b;var a=d(o,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,b;var i=a.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,b):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,b)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function A(r){if(r||""===r){var n=r[u];if(n)return n.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var o=-1,i=function t(){for(;++o<r.length;)if(a.call(r,o))return t.value=r[o],t.done=!1,t;return t.value=e,t.done=!0,t};return i.next=i}}throw new TypeError(t(r)+" is not iterable")}return g.prototype=S,i(k,"constructor",{value:S,configurable:!0}),i(S,"constructor",{value:g,configurable:!0}),g.displayName=f(S,s,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,S):(t.__proto__=S,f(t,s,"GeneratorFunction")),t.prototype=Object.create(k),t},n.awrap=function(t){return{__await:t}},C(x.prototype),f(x.prototype,l,(function(){return this})),n.AsyncIterator=x,n.async=function(t,e,r,o,a){void 0===a&&(a=Promise);var i=new x(p(t,e,r,o),a);return n.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},C(k),f(k,s,"Generator"),f(k,u,(function(){return this})),f(k,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},n.values=A,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(P),!t)for(var r in this)"t"===r.charAt(0)&&a.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=a.call(i,"catchLoc"),l=a.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,b):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),b},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),b}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;P(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:A(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),b}},n}function n(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-29",headers:{authorization:"382fc823-0b92-407b-a41f-addf43256902","Content-Type":"application/json"}},a=function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))},i=function(t){return fetch(t,{method:"HEAD"}).then((function(e){if(!e.ok)return Promise.reject("URL недоступен");var r=e.headers.get("content-type");return r&&r.startsWith("image/")?t:Promise.reject("URL не является изображением")}))},c=function(){var t,e=(t=r().mark((function t(e){return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i(e);case 2:return t.abrupt("return",fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:e})}).then(a));case 3:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(o,a){var i=t.apply(e,r);function c(t){n(i,o,a,c,u,"next",t)}function u(t){n(i,o,a,c,u,"throw",t)}c(void 0)}))});return function(t){return e.apply(this,arguments)}}(),u=document.querySelector("#card-template").content;function l(t,e,r){var n=e.dataset.cardId;(t.classList.contains("card__like-button_is-active")?function(t){return fetch("".concat(o.baseUrl,"/cards/").concat(t,"/likes"),{method:"DELETE",headers:o.headers}).then(a)}(n):function(t){return fetch("".concat(o.baseUrl,"/cards/").concat(t,"/likes"),{method:"PUT",headers:o.headers}).then(a)}(n)).then((function(e){t.classList.toggle("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(t){return console.log("Ошибка при обработке лайка: ".concat(t))}))}function s(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",p)}function f(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",p)}function p(t){if("Escape"===t.key){var e=document.querySelector(".popup_is-opened");e&&f(e)}}function d(t){t.target.classList.contains("popup")&&f(t.target)}var h=function(t,e,r){var n=t.querySelector("#".concat(e.name,"-error"));n&&(e.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent="")},y=function(t,e,r){t.some((function(t){return!t.validity.valid}))?(e.disabled=!0,e.classList.add(r.inactiveButtonClass)):(e.disabled=!1,e.classList.remove(r.inactiveButtonClass))},m=function(t,e){var r=Array.from(t.querySelectorAll(e.inputSelector)),n=t.querySelector(e.submitButtonSelector);y(r,n,e),r.forEach((function(o){o.addEventListener("input",(function(){!function(t,e,r){if(e.validity.valid)e.setCustomValidity(""),h(t,e,r);else{var n="";e.validity.valueMissing?n=e.dataset.errorEmpty:e.validity.tooShort||e.validity.tooLong?n=e.dataset.errorLength:(e.validity.patternMismatch||e.validity.typeMismatch)&&(n=e.dataset.errorMessage),e.setCustomValidity(n),function(t,e,r){var n=t.querySelector("#".concat(e.name,"-error"));n||(n=function(t,e){var r=document.createElement("span");return r.classList.add("popup__error"),r.id="".concat(e.name,"-error"),e.after(r),r}(0,e)),e.classList.add(r.inputErrorClass),n.classList.add(r.errorClass),n.textContent=e.validationMessage}(t,e,r)}}(t,o,e),y(r,n,e)}))}))},v=function(t,e){Array.from(t.querySelectorAll(e.inputSelector)).forEach((function(r){h(t,r,e)}))};function b(t){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function _(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function g(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?_(Object(r),!0).forEach((function(e){S(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function S(t,e,r){return(e=function(t){var e=function(t){if("object"!=b(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=b(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==b(e)?e:e+""}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var L,w={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},E=document.querySelector(".popup_type_edit"),k=document.querySelector(".popup_type_new-card"),C=document.querySelector(".popup_type_image"),x=document.querySelector(".popup_type_edit-avatar"),q=x.querySelector(".popup__form"),j=q.querySelector(".popup__input_type_url"),O=document.querySelector(".profile__image"),P=document.querySelector(".popup_type_delete-card"),I=[E,k,C,x,P],A=E.querySelector(".popup__form"),D=k.querySelector(".popup__form"),T=A.querySelector(".popup__input_type_name"),U=A.querySelector(".popup__input_type_description"),N=D.querySelector(".popup__input_type_card-name"),B=D.querySelector(".popup__input_type_url"),F=document.querySelector(".profile__title"),G=document.querySelector(".profile__description"),M=document.querySelector(".profile__edit-button"),H=document.querySelector(".profile__add-button"),J=C.querySelector(".popup__image"),R=C.querySelector(".popup__caption"),V=document.querySelector(".places__list");function Y(t){var e=function(t,e){var r=e.handleDeleteCard,n=e.handleLikeCard,o=e.handleImageClick,a=u.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__image"),c=a.querySelector(".card__like-button"),l=a.querySelector(".card__like-count"),s=a.querySelector(".card__delete-button"),f=a.querySelector(".card__title");return a.dataset.cardId=t._id,i.src=t.link,i.alt=t.name,f.textContent=t.name,l.textContent=t.likes.length,t.likes.some((function(e){return e._id===t.currentUserId}))&&c.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(){return o(t)})),c.addEventListener("click",(function(){return n(c,a,l)})),t.owner._id!==t.currentUserId?s.style.display="none":s.addEventListener("click",(function(){return r(a,t._id)})),a}(g(g({},t),{},{currentUserId:L}),{handleDeleteCard:W,handleLikeCard:l,handleImageClick:z});return e}function z(t){J.src=t.link,J.alt=t.name,R.textContent=t.name,s(C)}function W(t,e){var r=document.querySelector(".popup_type_delete-card"),n=r.querySelector(".popup__form");n.onsubmit=function(i){return function(t,e,r,n){t.preventDefault();var i=t.submitter;i.textContent="Удаление...",function(t){return fetch("".concat(o.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:o.headers}).then(a)}(r).then((function(){e.remove(),f(n)})).catch((function(t){return console.log("Ошибка при удалении карточки: ".concat(t))})).finally((function(){i.textContent="Да"}))}(i,t,e,r),n.onsubmit=null,!1},s(r)}Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then(a),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then(a)]).then((function(t){var r,n,o=(n=2,function(t){if(Array.isArray(t))return t}(r=t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,l=!1;try{if(a=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(r,n)||function(t,r){if(t){if("string"==typeof t)return e(t,r);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[0],i=o[1];return{userData:{name:a.name,about:a.about,avatar:a.avatar,_id:a._id},cards:i.map((function(t){return{name:t.name,link:t.link,likes:t.likes,owner:t.owner,_id:t._id}}))}})).catch((function(t){return console.log("Ошибка при получении начальных данных:",t),Promise.reject(t)})).then((function(t){var e=t.userData,r=t.cards;L=e._id,F.textContent=e.name,G.textContent=e.about,O.style.backgroundImage="url('".concat(e.avatar,"')"),r.forEach((function(t){var e=Y(t);V.append(e)}))})).catch((function(t){console.log("Ошибка при инициализации страницы: ".concat(t))})),M.addEventListener("click",(function(){return function(t,e,r,n,o,a,i){t.value=r.textContent,e.value=n.textContent,i(a,w),s(o)}(T,U,F,G,E,A,v)})),H.addEventListener("click",(function(){return function(t,e,r){var n=t.querySelector(w.submitButtonSelector);t.reset(),r(t,w),n.classList.add(w.inactiveButtonClass),n.disabled=!0,s(e)}(D,k,v)})),O.addEventListener("click",(function(){return function(t,e,r,n){var o=r.querySelector(w.submitButtonSelector);t.value="",n(r,w),o.classList.add(w.inactiveButtonClass),o.disabled=!0,s(e)}(j,x,q,v)})),A.addEventListener("submit",(function(t){return function(t,e){var r=e.nameInput,n=e.jobInput,i=e.profileTitle,c=e.profileDescription,u=e.editPopup;t.preventDefault();var l,s=t.submitter;s.textContent="Сохранение...",(l={name:r.value,about:n.value},fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:l.name,about:l.about})}).then(a)).then((function(t){i.textContent=t.name,c.textContent=t.about,f(u)})).catch((function(t){console.log("Ошибка при обновлении профиля: ".concat(t))})).finally((function(){s.textContent="Сохранить"}))}(t,{nameInput:T,jobInput:U,profileTitle:F,profileDescription:G,editPopup:E})})),D.addEventListener("submit",(function(t){return function(t,e){var r=e.placeNameInput,n=e.placeLinkInput,i=e.addCardPopup,c=e.addCardForm,u=e.renderCard;t.preventDefault();var l,s=t.submitter;s.textContent="Сохранение...",(l={name:r.value,link:n.value},fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:l.name,link:l.link})}).then(a)).then((function(t){var e=u(t);V.prepend(e),f(i),c.reset()})).catch((function(t){console.log("Ошибка при добавлении карточки: ".concat(t))})).finally((function(){s.textContent="Создать"}))}(t,{placeNameInput:N,placeLinkInput:B,addCardPopup:k,addCardForm:D,renderCard:Y})})),q.addEventListener("submit",(function(t){return function(t,e){var r=e.avatarInput,n=e.profileImage,o=e.editAvatarPopup,a=e.editAvatarForm;t.preventDefault();var i=t.submitter;i.textContent="Сохранение...",c(r.value).then((function(t){n.style.backgroundImage="url('".concat(t.avatar,"')"),f(o),a.reset()})).catch((function(t){console.log("Ошибка при обновлении аватара: ".concat(t))})).finally((function(){i.textContent="Сохранить"}))}(t,{avatarInput:j,profileImage:O,editAvatarPopup:x,editAvatarForm:q})})),I.forEach((function(t){t.querySelector(".popup__close").addEventListener("click",(function(){return f(t)})),t.addEventListener("mousedown",d)})),function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){m(e,t)}))}(w)})();