/* @preserve
 * https://github.com/Elkfox/Ajaxinate
 * Copyright (c) 2017 Elkfox Co Pty Ltd (elkfox.com)
 * MIT License (do not remove above copyright!)
 */
"use strict";function Ajaxinate(e){var t=e||{};this.settings=Object.assign({method:"scroll",container:"#AjaxinateContainer",pagination:"#AjaxinatePagination",offset:0,loadingText:"Loading",callback:null},t),this.addScrollListeners=this.addScrollListeners.bind(this),this.addClickListener=this.addClickListener.bind(this),this.checkIfPaginationInView=this.checkIfPaginationInView.bind(this),this.preventMultipleClicks=this.preventMultipleClicks.bind(this),this.removeClickListener=this.removeClickListener.bind(this),this.removeScrollListener=this.removeScrollListener.bind(this),this.removePaginationElement=this.removePaginationElement.bind(this),this.destroy=this.destroy.bind(this),this.containerElement=document.querySelector(this.settings.container),this.paginationElement=document.querySelector(this.settings.pagination),this.initialize()}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Ajaxinate=Ajaxinate,Ajaxinate.prototype.initialize=function(){this.containerElement&&{click:this.addClickListener,scroll:this.addScrollListeners}[this.settings.method]()},Ajaxinate.prototype.addScrollListeners=function(){this.paginationElement&&(document.addEventListener("scroll",this.checkIfPaginationInView),window.addEventListener("resize",this.checkIfPaginationInView),window.addEventListener("orientationchange",this.checkIfPaginationInView))},Ajaxinate.prototype.addClickListener=function(){this.paginationElement&&(this.nextPageLinkElement=this.paginationElement.querySelector("a"),this.clickActive=!0,void 0!==this.nextPageLinkElement&&null!==this.nextPageLinkElement&&this.nextPageLinkElement.addEventListener("click",this.preventMultipleClicks))},Ajaxinate.prototype.preventMultipleClicks=function(e){e.preventDefault(),this.clickActive&&(this.nextPageLinkElement.innerText=this.settings.loadingText,this.nextPageUrl=this.nextPageLinkElement.href,this.clickActive=!1,this.loadMore())},Ajaxinate.prototype.checkIfPaginationInView=function(){var e=this.paginationElement.getBoundingClientRect().top-this.settings.offset,t=this.paginationElement.getBoundingClientRect().bottom+this.settings.offset;e<=window.innerHeight&&t>=0&&(this.nextPageLinkElement=this.paginationElement.querySelector("a"),this.removeScrollListener(),this.nextPageLinkElement&&(this.nextPageLinkElement.innerText=this.settings.loadingText,this.nextPageUrl=this.nextPageLinkElement.href,this.loadMore()))},Ajaxinate.prototype.loadMore=function(){this.request=new XMLHttpRequest,this.request.onreadystatechange=function(){if(4===this.request.readyState&&200===this.request.status){var e=(new DOMParser).parseFromString(this.request.responseText,"text/html"),t=e.querySelectorAll(this.settings.container)[0],i=e.querySelectorAll(this.settings.pagination)[0];this.containerElement.insertAdjacentHTML("beforeend",t.innerHTML),this.paginationElement.innerHTML=i.innerHTML,this.settings.callback&&"function"==typeof this.settings.callback&&this.settings.callback(this.request.responseXML),this.initialize()}}.bind(this),this.request.open("GET",this.nextPageUrl,!1),this.request.send()},Ajaxinate.prototype.removeClickListener=function(){this.nextPageLinkElement.removeEventListener("click",this.preventMultipleClicks)},Ajaxinate.prototype.removePaginationElement=function(){this.paginationElement.innerHTML="",this.destroy()},Ajaxinate.prototype.removeScrollListener=function(){document.removeEventListener("scroll",this.checkIfPaginationInView),window.removeEventListener("resize",this.checkIfPaginationInView),window.removeEventListener("orientationchange",this.checkIfPaginationInView)},Ajaxinate.prototype.destroy=function(){return{click:this.removeClickListener,scroll:this.removeScrollListener}[this.settings.method](),this},exports.default=Ajaxinate;
