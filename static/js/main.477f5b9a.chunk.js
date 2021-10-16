(this.webpackJsonprainstorm=this.webpackJsonprainstorm||[]).push([[0],{104:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/day_clear_sky.3cec5a70.svg"},126:function(e,t,a){},127:function(e,t,a){},134:function(e,t,a){},135:function(e,t,a){},137:function(e,t,a){},208:function(e,t,a){var r={"./day_clear_sky.svg":104,"./day_cloudy_sky.svg":209,"./day_half_clear_sky.svg":210,"./day_light_rain.svg":211,"./day_moderate_rain.svg":212,"./day_moderate_rain_showers.svg":213,"./day_moderate_sleet.svg":214,"./day_nearly_clear_sky.svg":215,"./day_overcast.svg":216,"./day_thunder.svg":217,"./day_thunderstorm.svg":218,"./day_unknown.svg":219};function n(e){var t=s(e);return a(t)}function s(e){if(!a.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}n.keys=function(){return Object.keys(r)},n.resolve=s,e.exports=n,n.id=208},209:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/day_cloudy_sky.28c5a064.svg"},210:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/day_half_clear_sky.f2367887.svg"},211:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/day_light_rain.8de418d1.svg"},212:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/day_moderate_rain.1ac9a777.svg"},213:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/day_moderate_rain_showers.5bdbfbe3.svg"},214:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/day_moderate_sleet.b195ed64.svg"},215:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/day_nearly_clear_sky.9a7090ce.svg"},216:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/day_overcast.062fc05d.svg"},217:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/day_thunder.08acff3b.svg"},218:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/day_thunderstorm.fb8d6c57.svg"},219:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/day_unknown.d6ceac86.svg"},220:function(e,t,a){},221:function(e,t,a){},227:function(e,t,a){"use strict";a.r(t);var r,n=a(0),s=a.n(n),c=a(18),o=a.n(c),i=(a(126),a(127),a(25)),u=a(26),l=a(32),d=a(31),h=a(54),f=a(19),p=a.n(f),v=a(30),b="FORECAST_FETCH_START",m="FORECAST_FETCH_SUCCESS",j="FORECAST_FETCH_FAILURE",y="SET_DISPLAY_TIMES",g=a.p+"static/media/SMHI.147242e8.jpg";!function(e){e.unknown="unknown",e.clear_sky="clear_sky",e.nearly_clear_sky="nearly_clear_sky",e.half_clear_sky="half_clear_sky",e.cloudy_sky="cloudy_sky",e.overcast="overcast",e.light_rain="light_rain",e.moderate_rain="moderate_rain",e.heavy_rain="heavy_rain"}(r||(r={}));var w=function(){function e(t,a){Object(i.a)(this,e),this.name=void 0,this.logo=void 0,this.name=t,this.logo=a}return Object(u.a)(e,[{key:"fetchForecast",value:function(){var e=Object(v.a)(p.a.mark((function e(t,a,r){var n,s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.requestData(t.lat.toString(),t.long.toString());case 3:return s=e.sent,e.next=6,this.formatResponse(s);case 6:n=e.sent,e.next=14;break;case 9:return e.prev=9,e.t0=e.catch(0),console.error(e.t0),r(e.t0),e.abrupt("return");case 14:a(n);case 15:case"end":return e.stop()}}),e,this,[[0,9]])})));return function(t,a,r){return e.apply(this,arguments)}}()}]),e}(),O=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this,"Yr",g)).icons={lightrain:r.light_rain,rain:r.moderate_rain,clearsky_night:r.clear_sky,partlycloudy_day:r.half_clear_sky,partlycloudy_night:r.half_clear_sky,cloudy:r.cloudy_sky},e}return Object(u.a)(a,[{key:"requestData",value:function(){var e=Object(v.a)(p.a.mark((function e(t,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat="+t+"&lon="+a);case 2:if((r=e.sent).ok){e.next=5;break}throw new Error("Weather response error! status: "+r.status);case 5:return e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"formatResponse",value:function(){var e=Object(v.a)(p.a.mark((function e(t){var a,n,s,c,o,i,u,l,d;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={weatherPoints:[]},e.next=3,t.json();case 3:n=e.sent,s=n.properties.timeseries,c=(new Date).getTime(),o=0;case 7:if(!(o<s.length)){e.next=33;break}if(i=s[o],!((u=new Date(i.time)).getTime()<c)){e.next=12;break}return e.abrupt("continue",30);case 12:if(l=void 0,!i.data.next_1_hours){e.next=17;break}l=i.data.next_1_hours.summary.symbol_code,e.next=26;break;case 17:if(!i.data.next_6_hours){e.next=21;break}l=i.data.next_6_hours.summary.symbol_code,e.next=26;break;case 21:if(!i.data.next_12_hours){e.next=25;break}l=i.data.next_12_hours.summary.symbol_code,e.next=26;break;case 25:return e.abrupt("continue",30);case 26:(this.icons[l]||r.unknown)===r.unknown&&console.warn("Unknown symbol",l),d={temperature:i.data.instant.details.air_temperature,wind:i.data.instant.details.wind_speed,gust:NaN,symbol:this.icons[l]||r.unknown},a.weatherPoints.push({time:u,weather:d});case 30:o++,e.next=7;break;case 33:return e.abrupt("return",a);case 34:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),a}(w),_=[new(function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this,"SMHI",g)).icons={1:r.clear_sky,2:r.nearly_clear_sky,3:r.half_clear_sky,4:r.half_clear_sky,5:r.cloudy_sky,6:r.overcast,18:r.light_rain,19:r.moderate_rain},e}return Object(u.a)(a,[{key:"requestData",value:function(){var e=Object(v.a)(p.a.mark((function e(t,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return 9,e.next=3,fetch("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/"+a.substr(0,9)+"/lat/"+t.substr(0,9)+"/data.json");case 3:if((r=e.sent).ok){e.next=6;break}throw new Error("Weather response error! status: ' + result.status");case 6:return e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"formatResponse",value:function(){var e=Object(v.a)(p.a.mark((function e(t){var a,n,s,c,o=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={weatherPoints:[]},e.next=3,t.json();case 3:return n=e.sent,s=n.timeSeries,c=(new Date).getTime(),s.forEach((function(e){var t=new Date(e.validTime);if(t.getTime()>=c){var n=e.parameters,s={temperature:NaN,wind:NaN,gust:NaN,symbol:r.unknown};n.forEach((function(e){var t=e.values[0];switch(e.name){case"t":s.temperature=t;break;case"ws":s.wind=t;break;case"gust":s.gust=t;break;case"Wsymb2":if(!o.icons[t]){console.warn("Unknown symbol value",t),s.symbol=r.unknown;break}s.symbol=o.icons[t]}})),a.weatherPoints.push({time:t,weather:s})}})),e.abrupt("return",a);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),a}(w)),new O];function x(){return _}function k(e){return{type:b,provider:e}}function S(e,t){return{type:m,forecast:t,provider:e}}function T(e,t){return{type:j,errorMessage:t,provider:e}}a(134),a(135);var N=a(6),E=function(e){return Object(N.jsx)("div",{className:"paper",style:e.style,children:e.children})},D=a(231),L=(a(137),D.a.Text);console.log(a(104));var C=function(e){return Object(N.jsx)("div",{className:"weather_cell",children:void 0!=e.weather&&Object(N.jsxs)(s.a.Fragment,{children:[Object(N.jsxs)(L,{strong:!0,children:[Math.round(e.weather.temperature)," \xb0C"]}),e.weather.symbol&&Object(N.jsx)("img",{className:"weather_symbol",src:a(208)("./day_"+e.weather.symbol+".svg").default}),Object(N.jsxs)("div",{children:[Object(N.jsx)(L,{strong:!0,children:Math.round(e.weather.wind)}),Object(N.jsxs)(L,{type:"secondary",children:[" (",Math.round(e.weather.gust),") "]}),Object(N.jsx)(L,{strong:!0,children:"m/s"})]})]})})},F=a(229),M=(a(220),D.a.Text),R=function(e){return Object(N.jsx)("div",{className:"time_cell",children:Object(N.jsx)(M,{strong:!0,children:("0"+e.time.getHours()).slice(-2)})})},A=(a(221),function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return Object(N.jsxs)("div",{children:[this.props.name,Object(N.jsxs)("div",{className:"columns",children:[Object(N.jsx)("div",{className:"right-column",children:Object(N.jsx)("div",{className:"time-row",style:{width:"100%"},children:Object(N.jsx)(E,{style:{width:"100%",height:"100%"}})})}),Object(N.jsxs)("div",{className:"all-columns",children:[Object(N.jsx)("div",{className:"time-row"}),this.props.tableData.providers.map((function(e,t){return Object(N.jsx)("div",{className:"weather-row",children:Object(N.jsx)(E,{style:{width:"100%",height:"100%"}})},t)}))]}),Object(N.jsxs)("div",{className:"left-column",children:[Object(N.jsx)("div",{className:"time-row"}),this.props.tableData.providers.map((function(e,t){return Object(N.jsx)("div",{className:"weather-row",children:Object(N.jsx)(D.a,{className:"weather-provider-name",children:e.name})},t)}))]}),Object(N.jsxs)("div",{className:"divider-column",children:[Object(N.jsx)("div",{className:"time-row"}),this.props.tableData.providers.map((function(e,t){return Object(N.jsx)("div",{className:"weather-row",children:Object(N.jsx)(F.a,{type:"vertical",style:{height:"calc(100% - 5px)",margin:0}})},t)}))]}),Object(N.jsxs)("div",{className:"right-column",style:{overflowX:"auto"},children:[Object(N.jsx)("div",{className:"time-row",children:this.props.tableData.columns.map((function(e,t){return Object(N.jsx)(R,{time:e.date},t)}))}),this.props.tableData.providers.map((function(t,a){return Object(N.jsx)("div",{className:"weather-row",children:e.props.tableData.columns.map((function(e,a){return Object(N.jsx)(C,{weather:e.weatherMap.get(t)},a)}))},a)}))]})]})]})}}]),a}(s.a.Component));a(119);function P(e,t,a){for(var r=[],n=0;n<a;n++)r.push(new Date(e.getTime()+n*t));return r}function U(e){var t=new Date;t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0);var a=e.getTime()-t.getTime();return Math.floor(a/864e5)}var I=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"getTableData",value:function(){for(var e=[],t=this.props.weatherStateForecasts,a=t.map((function(e){return e.weatherProvider})),r=0;r<t.length;r++){var n=t[r];if(!n.loading)for(var s=0;s<n.forecast.weatherPoints.length;s++){var c=n.forecast.weatherPoints[s],o=void 0,i=U(o="string"===typeof c.time?new Date(c.time):c.time);if(i<0)console.warn("Old weather data");else{i>=e.length&&e.push({columns:[],providers:a});var u=e[i],l=o.getTime();0===u.columns.length&&u.columns.push({date:o,weatherMap:new Map});for(var d=u.columns.length-1;d>=0;d--){var h=u.columns[d],f=h.date.getTime();if(f===l){h.weatherMap.set(n.weatherProvider,c.weather);break}f<l&&(u.columns.splice(d+1,0,{date:o,weatherMap:new Map}),d+=2)}}}}return e}},{key:"getTableName",value:function(e,t){var a="";if(!t)return a;switch(e){case 0:a+="Idag, ";break;case 1:a+="Imorgon, "}switch(t.getDay()){case 1:a+="M\xe5ndag";break;case 2:a+="Tisdag";break;case 3:a+="Onsdag";break;case 4:a+="Torsdag";break;case 5:a+="Fredag";break;case 6:a+="L\xf6rdag";break;case 0:a+="S\xf6ndag"}return a}},{key:"render",value:function(){var e=this,t=this.getTableData();return Object(N.jsx)("div",{className:"list",children:t.map((function(t,a){return Object(N.jsx)(A,{tableData:t,name:e.getTableName(a,t.columns.length?t.columns[0].date:void 0)},a)}))})}}]),a}(s.a.Component),H=a(20),q=a(69),J=a(232),W=a(230),X=a(112),Y="UPDATE_USER_LOCATION",B="SELECT_LOCATION",z="SEARCH_START",G="SEARCH_SUCCESS",V="SEARCH_FAILURE",$=Date.now(),K="";function Q(e){return{type:G,results:e}}function Z(e){return{type:V,errorMessage:e}}function ee(e,t){Date.now()<$||function(e,t){te.apply(this,arguments)}(e,t)}function te(){return(te=Object(v.a)(p.a.mark((function e(t,a){var r,n,s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"pk.4b179e38c5f1f5a80ad572c3bb3c0309","https://api.locationiq.com/v1/autocomplete.php",e.next=4,fetch("".concat("https://api.locationiq.com/v1/autocomplete.php","?key=").concat("pk.4b179e38c5f1f5a80ad572c3bb3c0309","&q=").concat(t,"&accept-language=sv"));case 4:return r=e.sent,e.next=7,r.json();case 7:n=e.sent,r.ok?(s=ae(n),a(Q(s))):"Unable to geocode"==n.error?a(Q([])):(console.error("Geocode response error! status: "+r.statusText),a(Z(r.status.toString())));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ae(e){var t=[];try{var a,r=Object(X.a)(e);try{for(r.s();!(a=r.n()).done;){var n=a.value;t.push({country:n.display_address,name:n.display_place,lat:Number(n.lat),long:Number(n.lon),alt:0})}}catch(s){r.e(s)}finally{r.f()}return console.log(t),t}catch(c){return console.error(c.message),[]}}var re=J.a.Option,ne=D.a.Text,se=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(i.a)(this,a),(r=t.call(this,e)).state={searchText:""},r.handleTextChange=r.handleTextChange.bind(Object(q.a)(r)),r}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){var a={country:"",name:"Your Location",lat:t.coords.latitude,long:t.coords.longitude,alt:t.coords.altitude?t.coords.altitude:0};e.props.updateUserLocation(a),e.props.selectLocation(a),e.props.fetchForecasts(a)}),(function(e){}))}},{key:"handleTextChange",value:function(e){this.setState(Object(H.a)(Object(H.a)({},this.state),{},{searchText:e}))}},{key:"handleSearch",value:function(e){e&&this.props.searchLocations(e)}},{key:"handleSelect",value:function(e){for(var t=this.props.locationResults,a=0;a<t.length;a++)if(t[a].name===e){this.props.selectLocation(t[a]),this.props.fetchForecasts(t[a]);break}}},{key:"render",value:function(){var e=this,t=[];if(this.props.isLoading)t.push(ce(Object(N.jsx)(W.a,{}),"spin",0));else if(this.props.errorMessage)t.push(ce(Object(N.jsxs)(ne,{type:"danger",children:["Error! Response status: ",this.props.errorMessage]}),"error",0));else if(0===this.props.locationResults.length)t.push(ce(Object(N.jsx)(ne,{children:"No locations found."}),"no locations",0));else for(var a=this.props.locationResults,r=0;r<a.length;r++){var n=a[r];t.push(ce(Object(N.jsxs)("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[Object(N.jsxs)(ne,{strong:!0,children:[n.name,"  "]}),Object(N.jsx)(ne,{type:"secondary",children:n.country})]}),n.name,r))}return Object(N.jsx)(J.a,{showSearch:!0,style:this.props.style,value:this.state.searchText?this.state.searchText:void 0,placeholder:"S\xf6k",size:"large",defaultActiveFirstOption:!1,showArrow:!1,filterOption:!1,onSearch:function(t){return e.handleSearch(t)},onChange:function(t){return e.handleTextChange(t)},onSelect:function(t){return e.handleSelect(t)},notFoundContent:null,children:t})}}]),a}(s.a.Component);function ce(e,t,a){return Object(N.jsx)(re,{value:t,children:e},a)}var oe=Object(h.b)((function(e){return{selectedLocation:e.locationSearch.selectedLocation,locationResults:e.locationSearch.searchResults,isLoading:e.locationSearch.isLoading,errorMessage:e.locationSearch.errorMessage}}),(function(e){return{selectLocation:function(t){return e(function(e){return{type:B,selectedLocation:e}}(t))},searchLocations:function(t){return e(function(e){return function(){var t=Object(v.a)(p.a.mark((function t(a){var r;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if((r=e.trim())!==K){t.next=3;break}return t.abrupt("return");case 3:K=r,a({type:z}),$=Date.now()+1e3,setTimeout((function(){return ee(e,a)}),1001);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(t))},fetchForecasts:function(t){return e(function(e){return function(){var t=Object(v.a)(p.a.mark((function t(a){var r,n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=function(e,t){return a(S(e,t))},n=function(e,t){return a(T(e,t.message))},x().forEach((function(t){a(k(t)),t.fetchForecast(e,(function(e){return r(t,e)}),(function(e){return n(t,e)}))}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(t))},updateUserLocation:function(t){return e(function(e){return{type:Y,location:e}}(t))}}}))(se),ie=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return console.log("Render!!"),Object(N.jsxs)("div",{children:[Object(N.jsx)(oe,{style:{width:"100%"}}),Object(N.jsx)(I,{weatherStateForecasts:this.props.weatherStateForecasts})]})}}]),a}(s.a.Component);var ue=Object(h.b)((function(e){return{location:e.locationSearch.selectedLocation,displayTimes:e.forecasts.displayTimes,weatherStateForecasts:e.forecasts.weatherStateForecasts}}),(function(e){return{setDisplayTimes:function(t){return e({type:y,displayTimes:t})}}}))(ie);var le=function(){return Object(N.jsx)("div",{id:"app",children:Object(N.jsx)("div",{className:"page",children:Object(N.jsx)(ue,{})})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var de=a(58),he={selectedLocation:void 0,searchResults:[],isLoading:!1,errorMessage:"",userLocation:void 0};var fe=a(115),pe={weatherStateForecasts:function(){var e=[];return x().forEach((function(t){var a={weatherProvider:t,loading:!0,forecast:{weatherPoints:[]}};e.push(a)})),console.log("Initial forecasts:",e),e}(),displayTimes:function(e){var t=new Date;return t.setHours(t.getHours()+1),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),P(t,36e5,e)}(24),nothing:1};var ve=Object(de.b)({locationSearch:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:he,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Y:return Object(H.a)(Object(H.a)({},e),{},{userLocation:t.location});case B:return Object(H.a)(Object(H.a)({},e),{},{selectedLocation:t.selectedLocation});case z:return Object(H.a)(Object(H.a)({},e),{},{isLoading:!0});case G:return Object(H.a)(Object(H.a)({},e),{},{isLoading:!1,searchResults:t.results,errorMessage:""});case V:return Object(H.a)(Object(H.a)({},e),{},{isLoading:!1,searchResults:[],errorMessage:t.errorMessage});default:return e}},forecasts:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b:return console.log("Fetch start!!"),void 0!==(r=(a=JSON.parse(JSON.stringify(e.weatherStateForecasts))).find((function(e){return e.weatherProvider.name===t.provider.name})))&&(r.loading=!0),Object(H.a)(Object(H.a)({},e),{},{weatherStateForecasts:a});case m:var a,r;return console.log("Fetch success!!"),void 0!==(r=(a=JSON.parse(JSON.stringify(e.weatherStateForecasts))).find((function(e){return e.weatherProvider.name===t.provider.name})))&&(r.loading=!1,r.forecast=t.forecast),Object(H.a)(Object(H.a)({},e),{},{weatherStateForecasts:a});case j:return console.log("Fetch fail"),Object(H.a)({},e);case y:default:return e}}}),be=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||de.c,me=Object(de.d)(ve,{},Object(de.c)(Object(de.a)(fe.a),be()));o.a.render(Object(N.jsx)(h.a,{store:me,children:Object(N.jsx)(le,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[227,1,2]]]);
//# sourceMappingURL=main.477f5b9a.chunk.js.map