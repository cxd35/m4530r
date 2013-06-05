/*
 * This program is copyright � 2008,2009 Eric Bishop and is distributed under the terms of the GNU GPL 
 * version 2.0 with a special clarification/exception that permits adapting the program to 
 * configure proprietary "back end" software provided that all modifications to the web interface
 * itself remain covered by the GPL. 
 * See http://gargoyle-router.com/faq.html#qfoss for more information
 */function getEmbeddedSvgSetFunction(a){return windowElement=getEmbeddedSvgWindow(a),windowElement!=null?windowElement.setPieChartData:null}function initializePieCharts(){uploadClassIds=[],downloadClassIds=[],uploadClassNames=[],downloadClassNames=[];var a=[],b=[];for(monitorIndex=0;monitorIndex<monitorNames.length;monitorIndex++){var c=monitorNames[monitorIndex];if(c.match(/qos/)){var d=c.match(/up/),e=c.match(/down/),f=c.split("-");f.shift(),f.shift(),f.pop(),f.pop();var g=f.join("-"),h=uciOriginal.get("qos_gargoyle",g,"name");d&&a[g]==null&&(uploadClassIds.push(g),uploadClassNames.push(h),a[g]=1),e&&b[g]==null&&(downloadClassIds.push(g),downloadClassNames.push(h),b[g]=1)}}uciOriginal.get("qos_gargoyle","upload","total_bandwidth")==""&&(document.getElementById("upload_container").style.display="none"),uciOriginal.get("qos_gargoyle","download","total_bandwidth")==""&&(document.getElementById("download_container").style.display="none"),setTimeout(initializePies,150),setInterval("updatePieCharts()",2e3)}function initializePies(){setUploadPie==null&&(setUploadPie=getEmbeddedSvgSetFunction("upload_pie")),setDownloadPie==null&&(setDownloadPie=getEmbeddedSvgSetFunction("download_pie")),setUploadPie==null||setDownloadPie==null?setTimeout("initializePies()",100):setQosTimeframes()}function setQosTimeframes(){if(!!updateInProgress||setUploadPie==null&&uciOriginal.get("qos_gargoyle","upload","total_bandwidth")!=""||setDownloadPie==null&&uciOriginal.get("qos_gargoyle","download","total_bandwidth")!=""){setTimeout("setQosTimeframes()",100);if(setUploadPie==null||setDownloadPie==null)setUploadPie=getEmbeddedSvgSetFunction("upload_pie"),setDownloadPie=getEmbeddedSvgSetFunction("download_pie")}else updatePieCharts()}function getMonitorId(a,b,c,d,e){var f,g=null,h="",i="";c=="total"?h=e?"total"+b+"B":"total"+b+"A":c.match(/qos/)?(h="qos"+b,i=d):c=="ip"&&(h="bdist"+b);if(c!="none")for(f=0;f<monitorNames.length&&g==null;f++){var j=monitorNames[f];(j.match("up")&&a||j.match("down")&&!a)&&(h==""||j.match(h))&&(i==""||j.match(i))&&(g=j)}return g}function updatePieCharts(){if(!updateInProgress){updateInProgress=!0;var a=["up","down"],b=[];for(directionIndex=0;directionIndex<a.length;directionIndex++){var c=a[directionIndex],d=c=="up"?uploadClassIds:downloadClassIds,e=parseInt(getSelectedValue(c+"_timeframe"));for(classIndex=0;classIndex<d.length;classIndex++)b.push(getMonitorId(c=="up"?!0:!1,e,"qos",d[classIndex],!0))}var f=getParameterDefinition("monitor",b.join(" "))+"&"+getParameterDefinition("hash",document.cookie.replace(/^.*hash=/,"").replace(/[\t ;]+.*$/,"")),g=function(a){if(a.readyState==4){var c=parseMonitors(a.responseText),d=["up","down"],e=[],f=[],g=[],h=[];for(directionIndex=0;directionIndex<d.length;directionIndex++){var i=d[directionIndex],j=[],k=0,l=[],m=[];for(nameIndex=0;nameIndex<b.length;nameIndex++)if(b[nameIndex].match(i)){var n=0,o=c[b[nameIndex]];if(o!=null){var p=o[0];n=parseInt(p[p.length-1])}j.push(n),k+=n}var q=k==0?!0:!1;if(q){var r;for(r=0;r<j.length;r++)j[r]=1,k++}for(nameIndex=0;nameIndex<j.length;nameIndex++){var s=i.match("up")?uploadClassNames:downloadClassNames;className=s[nameIndex];if(q){var t="("+truncateDecimal(100*(1/j.length))+"%)";l.push(className+" - "+parseBytes(j[nameIndex]-1)+" "+t)}else{var t="("+truncateDecimal(100*j[nameIndex]/k)+"%)";l.push(className+" - "+parseBytes(j[nameIndex])+" "+t)}}e=i.match("up")?j:e,f=i.match("up")?l:f,g=i.match("down")?j:g,h=i.match("down")?l:h}e.length>0&&setUploadPie!=null&&uciOriginal.get("qos_gargoyle","upload","total_bandwidth")!=""&&setUploadPie(e,f),g.length>0&&setDownloadPie!=null&&uciOriginal.get("qos_gargoyle","download","total_bandwidth")!=""&&setDownloadPie(g,h),updateInProgress=!1}};runAjax("POST","utility/load_bandwidth.sh",f,g)}}function parseMonitors(a){var b=new Array,c=a.split("\n"),d=parseInt(c.shift());for(lineIndex=0;lineIndex<c.length;lineIndex++)c[lineIndex].length>0&&(monitorName=c[lineIndex],monitorName=monitorName.replace(/[\t ]+.*$/,""),lineIndex++,lineIndex++,lineIndex++,lastTimePoint=c[lineIndex],lineIndex++,points=c[lineIndex].split(","),b[monitorName]=[points,lastTimePoint]);return b}function parseBytes(a){var b;return a>1099511627776?b=truncateDecimal(a/1099511627776)+"TB":a>1073741824?b=truncateDecimal(a/1073741824)+"GB":a>1048576?b=truncateDecimal(a/1048576)+"MB":a>1024?b=truncateDecimal(a/1024)+"KB":b=a+"B",b}function truncateDecimal(a){return result=""+Math.ceil(a*10)/10,result}var uploadClassIds=[],downloadClassIds=[],uploadClassNames=[],downloadClassNames=[],uploadUpdateInProgress=!1,downloadUpdateInProgress=!1,updateInProgress=!1,setUploadPie=null,setDownloadPie=null;