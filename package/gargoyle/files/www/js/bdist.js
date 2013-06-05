/*
 * This program is copyright 2008-2011 Eric Bishop and is distributed under the terms of the GNU GPL 
 * version 2.0 with a special clarification/exception that permits adapting the program to 
 * configure proprietary "back end" software provided that all modifications to the web interface
 * itself remain covered by the GPL. 
 * See http://gargoyle-router.com/faq.html#qfoss for more information
 */function initializePlotsAndTable(){updateInProgress=!1,initFunction()}function initFunction(){pieChart=document.getElementById("pie_chart"),pieChart!=null?(doUpdate(),setInterval(doUpdate,2e3)):setTimeout(initFunction,50)}function getEmbeddedSvgPlotFunction(a){return windowElement=getEmbeddedSvgWindow(a),windowElement!=null?windowElement.setPieChartData:null}function getHostDisplay(a){var b=getSelectedValue("host_display"),c=a;return b=="hostname"&&ipToHostname[a]!=null&&(c=ipToHostname[a],c=c.length<25?c:c.substr(0,22)+"..."),c}function getHostList(a){var b=[],c=0;for(c=0;c<a.length;c++)b.push(getHostDisplay(a[c]));return b}function doUpdate(){if(!updateInProgress&&pieChart!=null){var a=getSelectedValue("time_frame"),b="",c="",d=0;for(d=0;d<monitorNames.length;d++){var e=monitorNames[d];e.indexOf(a)>=0&&(e.indexOf("upload")>=0&&(c=""+e),e.indexOf("download")>=0&&(b=""+e))}var f=b+" "+c,g=getParameterDefinition("monitor",f)+"&"+getParameterDefinition("hash",document.cookie.replace(/^.*hash=/,"").replace(/[\t ;]+.*$/,"")),h=function(a){var b=null;if(a.readyState==4){if(!a.responseText.match(/ERROR/)){var d=parseMonitors(a.responseText),e=1,f=0,g=0,h=[];for(f=0;f<d.length;f++){var i=d[f];for(w in i){var j=i[w][0];g=parseInt(i[w][1]),e=j.length>e?j.length:e,h[w]=1}}idList=[];for(w in h)idList.push(w);var k=getSelectedValue("time_interval"),l=getSelectedText("time_interval"),m=[],n=[],o=new Date;o.setTime(g*1e3),o.setUTCMinutes(o.getUTCMinutes()+tzMinutes);var p=o.valueOf()/1e3;timeFrameIntervalData=[];var q=[],r;for(r=0;r<e;r++){var s=[],f,t=[];for(f=0;f<d.length;f++){var i=d[f],u=[],v;for(v=0;v<idList.length;v++){var w=idList[v];w=w==currentWanIp?currentLanIp:w;var x=0;if(i[w]!=null){var j=i[w][0];j!=null&&(x=j[j.length-1-r],x=x==null?0:parseFloat(x))}u.push(x),t[v]=t[v]==null?x:t[v]+x}s.push(u)}s.unshift(t),timeFrameIntervalData.push(s);var y=["January","February","March","April","May","June","July","August","September","October","November","December"],z=function(a){var b=""+a;return b=b.length==1?"0"+b:b,b};o.setTime(parseInt(p)*1e3);var A="";if(c.match("minute"))A=""+z(o.getUTCHours())+":"+z(o.getUTCMinutes()),o.setUTCMinutes(o.getUTCMinutes()-1);else if(c.match("hour"))A=""+z(o.getUTCHours())+":"+z(o.getUTCMinutes()),o.setUTCHours(o.getUTCHours()-1);else if(c.match("day"))A=y[o.getUTCMonth()]+" "+o.getUTCDate(),o.setUTCDate(o.getUTCDate()-1);else if(c.match("month"))A=y[o.getUTCMonth()]+" "+o.getUTCFullYear(),o.setUTCMonth(o.getUTCMonth()-1);else{var B=c.split(/-/),e=B.pop(),C=B.pop();parseInt(C)>=2419200?A=y[o.getUTCMonth()]+" "+o.getUTCFullYear()+" "+z(o.getUTCHours())+":"+z(o.getUTCMinutes()):parseInt(C)>=86400?A=y[o.getUTCMonth()]+" "+z(o.getUTCHours())+":"+z(o.getUTCMinutes()):A=""+z(o.getUTCHours())+":"+z(o.getUTCMinutes()),o.setTime(o.getTime()-parseInt(C)*1e3)}n.push(A),m.push(""+r),p=o.valueOf()/1e3}setAllowableSelections("time_interval",m,n),k==null||k==0?setSelectedValue("time_interval","0"):setSelectedText("time_interval",l)}updateInProgress=!1,resetDisplayInterval()}};runAjax("POST","utility/load_bandwidth.sh",g,h)}}function resetTimeFrame(){resetColors=!0,doUpdate()}function resetDisplayInterval(){var a=getEmbeddedSvgPlotFunction("pie_chart");if(a!=null&&pieChart!=null&&!updateInProgress&&timeFrameIntervalData.length>0){updateInProgress=!0;var b=getSelectedValue("time_interval");b=b==null?0:b;var c=timeFrameIntervalData[b],d=a(idList,["总量","下载","上传"],getHostList(idList),c,0,9,resetColors);resetColors=!1;var e=[],f;for(f=0;f<idList.length;f++)e.push(f);var g=function(a,b){return idList[a]<idList[b]?1:-1};e.sort(g);var h=["总量","下载","上传"],i=[],j;zeroPies=[];for(j=0;j<h.length;j++){f=0;var k=!0;for(f=0;f<idList.length;f++)k=k&&c[j][f]==0;zeroPies.push(k)}var l=[0,0,0];for(f=0;f<e.length;f++){var m=e[f],n=idList[m];n=n==currentWanIp?currentLanIp:n;var o=[getHostDisplay(n)],j,p=!0;for(j=0;j<h.length;j++){var q=parseBytes(c[j][m]);q=q.replace("ytes",""),o.push(q),l[j]=l[j]+c[j][m]}for(j=0;j<h.length;j++){var r=zeroPies[j]?100/idList.length:c[j][m]*100/d[j],s=""+parseInt(r*10)/10+"%";o.push(s)}i.push(o)}i.push(["合计",parseBytes(l[0]),parseBytes(l[1]),parseBytes(l[2]),"","",""]);var t=["主机"];for(j=0;j<h.length;j++)t.push(h[j]);for(j=0;j<h.length;j++)t.push(h[j]+" %");var u=createTable(t,i,"bandwidth_distribution_table",!1,!1),v=document.getElementById("bandwidth_distribution_table_container");v.firstChild!=null&&v.removeChild(v.firstChild),v.appendChild(u),updateInProgress=!1}}function parseMonitors(a){var b=[[],[]],c=a.split("\n"),d=parseInt(c.shift()),e;for(e=0;e<c.length;e++)if(c[e].length>0){var f=c[e].split(/[\t ]+/)[0];f=f.match(/download/)?0:1;var g=c[e].split(/[\t ]+/)[1];e++;var h=c[e];e++;var i=c[e];e++;var j=c[e];e++;var k=c[e].split(",");g!="COMBINED"&&(b[f][g]=[k,j])}return b}var plotsInitializedToDefaults=!1,updateInProgress=!1,pieChart=null,initialized=!1,timeFrameIntervalData=[],idList=[],resetColors=!1;