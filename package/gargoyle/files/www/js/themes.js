/*
 * Copyright (c) 2011 Eric Bishop and Cezary Jackiewicz <cezary@eko.one.pl>  
 * and is distributed under the terms of the GNU GPL 
 * version 2.0 with a special clarification/exception that permits adapting the program to 
 * configure proprietary "back end" software provided that all modifications to the web interface
 * itself remain covered by the GPL. 
 * See http://gargoyle-router.com/faq.html#qfoss for more information
 *
 */function createUseButton(){var a=createInput("button");return a.value="选择",a.className="default_button",a.onclick=useTheme,a}function resetData(){var a=["主题","",""],b=new Array,c=uciOriginal.get("gargoyle","global","theme"),d="";for(idx=0;idx<themes.length;idx++)d=themes[idx]==c?"*":"",b.push([themes[idx],d,createUseButton()]);var e=createTable(a,b,"themes_table",!1,!1),f=document.getElementById("themes_table_container");f.firstChild!=null&&f.removeChild(f.firstChild),f.appendChild(e)}function useTheme(a,b){var a=this.parentNode.parentNode,c=a.firstChild.firstChild.data,d=[];d.push('uci set gargoyle.global.theme="'+c+'"'),d.push("uci commit"),d.push("sleep 1"),commands=d.join("\n");var e=getParameterDefinition("commands",commands)+"&"+getParameterDefinition("hash",document.cookie.replace(/^.*hash=/,"").replace(/[\t ;]+.*$/,""));setControlsEnabled(!1,!0,"Please wait...");var f=function(a){a.readyState==4&&(setControlsEnabled(!0),location.reload(!0))};runAjax("POST","utility/run_commands.sh",e,f)};