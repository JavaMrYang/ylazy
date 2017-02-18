/* See license.txt for terms of usage */

define("domplate/tableView",["domplate/domplate","core/lib","i18n!nls/tableView","domplate/domTree","core/trace"],function(Domplate,Lib,Strings,DomTree,Trace){with(Domplate){var TableView=domplate({className:"table",tag:DIV({"class":"dataTableSizer",tabindex:"-1"},TABLE({"class":"dataTable",cellspacing:0,cellpadding:0,width:"100%",role:"grid"},THEAD({"class":"dataTableThead",role:"presentation"},TR({"class":"headerRow focusRow dataTableRow subFocusRow",role:"row",onclick:"$onClickHeader"},FOR("column","$object.columns",TH({"class":"headerCell a11yFocus",role:"columnheader",$alphaValue:"$column.alphaValue"},DIV({"class":"headerCellBox"},"$column.label"))))),TBODY({"class":"dataTableTbody",role:"presentation"},FOR("row","$object.data|getRows",TR({"class":"focusRow dataTableRow subFocusRow",role:"row"},FOR("column","$row|getColumns",TD({"class":"a11yFocus dataTableCell",role:"gridcell"},TAG("$column|getValueTag",{object:"$column"})))))))),getValueTag:function(e){var t=typeof e;if(t=="object")return DomTree.Reps.Tree.tag;var n=DomTree.Reps.getRep(e);return n.shortTag||n.tag},getRows:function(e){var t=this.getProps(e);return t.length?t:[]},getColumns:function(e){if(typeof e!="object")return[e];var t=[];for(var n=0;n<this.columns.length;n++){var r=this.columns[n].property;if(!r)s=e;else if(typeof e[r]=="undefined"){var i=typeof r=="string"?r.split("."):[r],s=e;for(var o in i)s=s&&s[i[o]]||undefined}else s=e[r];t.push(s)}return t},getProps:function(e){if(typeof e!="object")return[e];if(e.length)return Lib.cloneArray(e);var t=[];for(var n in e){var r=e[n];this.domFilter(r,n)&&t.push(r)}return t},onClickHeader:function(e){var t=Lib.getAncestorByClass(e.target,"dataTable"),n=Lib.getAncestorByClass(e.target,"headerCell");if(!n)return;var r=!Lib.hasClass(n,"alphaValue"),i=0;for(n=n.previousSibling;n;n=n.previousSibling)++i;this.sort(t,i,r)},sort:function(e,t,n){var r=Lib.getChildByClass(e,"dataTableTbody"),i=Lib.getChildByClass(e,"dataTableThead"),s=[];for(var o=r.childNodes[0];o;o=o.nextSibling){var u=o.childNodes[t],a=n?parseFloat(u.textContent):u.textContent;s.push({row:o,value:a})}s.sort(function(e,t){return e.value<t.value?-1:1});var f=i.firstChild,l=Lib.getChildByClass(f,"headerSorted");Lib.removeClass(l,"headerSorted"),l&&l.removeAttribute("aria-sort");var c=f.childNodes[t];Lib.setClass(c,"headerSorted");if(!c.sorted||c.sorted==1){Lib.removeClass(c,"sortedDescending"),Lib.setClass(c,"sortedAscending"),c.setAttribute("aria-sort","ascending"),c.sorted=-1;for(var h=0;h<s.length;++h)r.appendChild(s[h].row)}else{Lib.removeClass(c,"sortedAscending"),Lib.setClass(c,"sortedDescending"),c.setAttribute("aria-sort","descending"),c.sorted=1;for(var h=s.length-1;h>=0;--h)r.appendChild(s[h].row)}},getHeaderColumns:function(e){var t;for(var n in e){t=e[n];break}if(typeof t!="object")return[{label:Strings.objectProperties}];var r=[];for(var n in t){var i=t[n];if(!this.domFilter(i,n))continue;r.push({property:n,label:n,alphaValue:typeof i!="number"})}return r},domFilter:function(e,t){return!0},render:function(e,t,n){if(!t)return;var r=[];for(var i=0;n&&i<n.length;i++){var s=n[i],o=typeof s.property!="undefined"?s.property:s,u=typeof s.label!="undefined"?s.label:o;r.push({property:o,label:u,alphaValue:!0})}r.length||(r=this.getHeaderColumns(t));try{this.columns=r;var a={data:t,columns:r},f=this.tag.append({object:a,columns:r},e),l=Lib.getElementByClass(f,"dataTableTbody"),c=200;c>0&&l.clientHeight>c&&(l.style.height=c+"px")}catch(h){Trace.exception("tableView.render; EXCEPTION "+h,h)}finally{delete this.columns}}});return TableView}});