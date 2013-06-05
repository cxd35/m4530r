/*
 * This program is copyright � 2008-2011 Eric Bishop and is distributed under the terms of the GNU GPL 
 * version 2.0 with a special clarification/exception that permits adapting the program to 
 * configure proprietary "back end" software provided that all modifications to the web interface
 * itself remain covered by the GPL. 
 * See http://gargoyle-router.com/faq.html#qfoss for more information
 */function resetData(){var a=uptime.split(/[\t ]+/)[0],b=Math.floor(a/86400);a-=b*60*60*24;var c=Math.floor(a/3600);a-=c*60*60;var d=Math.floor(a/60),e=Math.floor((totalMemory-freeMemory)*100*10/totalMemory)/10,f=Math.floor(totalMemory*10/1024)/10,g=Math.floor((totalMemory-freeMemory)*10/1024)/10,h=Math.floor((totalSwap-freeSwap)*100*10/totalSwap)/10,i=Math.floor(totalSwap*10/1024)/10,j=Math.floor((totalSwap-freeSwap)*10/1024)/10;wirelessModes=[],wirelessModes.ap="接入点 (AP)",wirelessModes.sta="Client",wirelessModes["ap+sta"]="AP+Client",wirelessModes["ap+wds"]="AP+WDS",wirelessModes.adhoc="Ad Hoc",wirelessModes.disabled="Disabled";var k=getWirelessMode(uciOriginal),l=wirelessModes[k];qosUploadStatus=qosEnabled&&uciOriginal.get("qos_gargoyle","upload","total_bandwidth")!=""?"已启用":"已禁用",qosDownloadStatus=qosEnabled&&uciOriginal.get("qos_gargoyle","download","total_bandwidth")!=""?"已启用":"已禁用";var m=uciOriginal.getAllSectionsOfType("system","system");setChildText("device_model",model),setChildText("device_name",uciOriginal.get("system",m[0],"hostname")),setChildText("gargoyle_version",gargoyleVersion),setChildText("memory",""+g+"MB / "+f+"MB ("+e+"%)"),i>0?(document.getElementById("swap_container").style.display="block",setChildText("swap",""+j+"MB / "+i+"MB ("+h+"%)")):document.getElementById("swap_container").style.display="none",setChildText("load_avg",loadAvg),setChildText("connections",curConn+"/"+maxConn),setChildText("uptime",b+" 天, "+c+" 小时, "+d+" 分钟"),setChildText("current_time",currentTime);var n=getBridgeSection(uciOriginal);setChildText("device_config",n==""?"Gateway":"Wireless Bridge/Repeater");if(n==""){document.getElementById("bridge_container").style.display="none",setChildText("lan_ip",currentLanIp),setChildText("lan_mask",currentLanMask),setChildText("lan_mac",currentLanMac),uciOriginal.get("network","wan","")==""&&(document.getElementById("wan_container").style.display="none"),setChildText("wan_ip",currentWanIp),setChildText("wan_mask",currentWanMask),setChildText("wan_mac",currentWanMac),setChildText("wan_gateway",currentWanGateway);var o=wanDns.split(/[\t ]+/);o.length>0&&setChildText("wan_dns",o.shift());while(o.length>0){var p=document.createElement("br"),q=document.createElement("span"),r=document.createElement("span");q.className="leftcolumn",q.appendChild(document.createTextNode("invisible")),q.style.visibility="hidden",r.className="rightcolumn",r.appendChild(document.createTextNode(o.shift())),document.getElementById("wan_dns_container").appendChild(p),document.getElementById("wan_dns_container").appendChild(q),document.getElementById("wan_dns_container").appendChild(r)}uciOriginal.get("network","wan","proto")!="3g"&&(document.getElementById("wan_3g_container").style.display="none"),setChildText("wireless_mode",l);if(k!="disabled"){var s=uciOriginal.getAllSectionsOfType("wireless","wifi-iface"),t=[],u=null,v=!1,w;for(w=0;w<s.length;w++){var x=s[w],y=uciOriginal.get("wireless",x,"ssid"),z=uciOriginal.get("wireless",x,"mode");if(z=="ap"){var A=uciOriginal.get("wireless",x,"device"),B="G";A!=""&&uciOriginal.get("wireless",A,"hwmode")=="11na"&&(B="A"),t[B]=y}else otherIsSsid=z=="sta",u=y}t["G"]==null&&t["A"]==null?(document.getElementById("wireless_apssid_div").style.display="none",document.getElementById("wireless_apssid_5ghz_div").style.display="none"):t["G"]!=null&&t["A"]!=null?(document.getElementById("wireless_apssid_div").style.display="block",document.getElementById("wireless_apssid_5ghz_div").style.display="block",setChildText("wireless_apssid_label","2.4 GHz Access Point SSID:"),setChildText("wireless_apssid",t.G),setChildText("wireless_apssid_5ghz",t.A)):(document.getElementById("wireless_apssid_div").style.display="block",document.getElementById("wireless_apssid_5ghz_div").style.display="none",setChildText("wireless_apssid_label","接入点 SSID:"),setChildText("wireless_apssid",t["G"]==null?t.A:t.G)),u==null?document.getElementById("wireless_otherssid_div").style.display="none":(setChildText("wireless_otherssid",u),setChildText("wireless_otherssid_label",v?"SSID:":"SSID Joined by Client:"),currentWirelessMacs.length>0&&v&&setChildText("wan_mac",currentWirelessMacs[0])),setChildText("wireless_mac",currentWirelessMacs.length>0?currentWirelessMacs[0]:"")}else document.getElementById("wireless_mac_div").style.display="none",document.getElementById("wireless_apssid_div").style.display="none",document.getElementById("wireless_apssid_5ghz_div").style.display="none",document.getElementById("wireless_otherssid_div").style.display="none"}else document.getElementById("wan_container").style.display="none",document.getElementById("lan_container").style.display="none",document.getElementById("wifi_container").style.display="none",setChildText("bridge_ip",currentLanIp),setChildText("bridge_mask",currentLanMask),setChildText("bridge_mac",currentLanMac),setChildText("bridge_gateway",uciOriginal.get("network","lan","gateway")),setChildText("bridge_mode",uciOriginal.get("wireless",n,"client_bridge")=="1"?"Client Bridge":"WDS"),setChildText("bridge_ssid",uciOriginal.get("wireless",n,"ssid"));setChildText("qos_upload",qosUploadStatus),setChildText("qos_download",qosDownloadStatus)}function getSsids(){};