(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{124:function(e,n,t){var content=t(184);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(40).default)("932a8f60",content,!0,{sourceMap:!1})},125:function(e,n,t){var content=t(186);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(40).default)("1f93b0e0",content,!0,{sourceMap:!1})},131:function(e,n,t){"use strict";var o=[function(){var e=this.$createElement,n=this._self._c||e;return n("a",{attrs:{href:"https://play.google.com/store/apps/details?id=com.handpaner.pro",target:"_blank"}},[n("img",{attrs:{src:t(181)}})])},function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("a",{attrs:{href:"https://www.facebook.com/Handpaner/",target:"_blank"}},[o("img",{attrs:{src:t(182)}}),o("span",[e._v("Handpaner")])])}],r=t(105),c=t(0).a.extend({data:function(){return{menuOpened:!1,isWeb:!1}},mounted:function(){this.$store.commit("selection/setSelectedPanScale",null),this.$store.commit("player/setRecordPlaying",null),this.isWeb="web"===r.a.getPlatform(),document.addEventListener("click",this.onClickDocument)},beforeDestroy:function(){document.removeEventListener("click",this.onClickDocument)},computed:{hideFooter:function(){return this.$store.state.options.hideFooter}},methods:{toggleMenu:function(){this.menuOpened=!this.menuOpened},onClickDocument:function(e){e.target!==this.$refs.burger&&(this.menuOpened=!1)}}}),l=(t(183),t(19)),component=Object(l.a)(c,(function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",{staticClass:"layout-default"},[o("div",{staticClass:"header"},[o("nuxt-link",{attrs:{to:"/"}},[o("img",{attrs:{src:t(180)}})]),e._v(" "),o("div",{staticClass:"menu",class:{"is-open":e.menuOpened}},[o("nuxt-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" "),o("nuxt-link",{attrs:{to:"help"}},[e._v("Help")]),e._v(" "),o("nuxt-link",{attrs:{to:"options"}},[e._v("Options")]),e._v(" "),o("nuxt-link",{attrs:{to:"about"}},[e._v("About")])],1),e._v(" "),o("div",{ref:"burger",staticClass:"burger",on:{click:function(n){return e.toggleMenu()}}},[e._v("☰")])],1),e._v(" "),o("nuxt"),e._v(" "),e.menuOpened?o("div",{staticClass:"overlay"}):e._e(),e._v(" "),e.isWeb&&!e.hideFooter?o("div",{staticClass:"footer"},[e._m(0),e._v(" "),e._m(1)]):e._e()],1)}),o,!1,null,null,null);n.a=component.exports},132:function(e,n,t){"use strict";t(185);var o=t(19),component=Object(o.a)({},(function(){var e=this.$createElement;return(this._self._c||e)("nuxt")}),[],!1,null,null,null);n.a=component.exports},144:function(e,n,t){e.exports=t(145)},178:function(e,n,t){var content=t(179);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(40).default)("43dee4e4",content,!0,{sourceMap:!1})},179:function(e,n,t){var o=t(39)(!1);o.push([e.i,"body{touch-action:pan-x pan-y}a{color:#00c;text-decoration:none}a:hover{color:#0cc}",""]),e.exports=o},180:function(e,n,t){e.exports=t.p+"img/handpaner.191876f.png"},181:function(e,n,t){e.exports=t.p+"img/google-play-sm.748b20a.png"},182:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEE0AABBNAWeMAeAAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAAB1ElEQVRYR+1VvUoDQRgMWoqNIj6Aio1PYBu9vcbYJLldoiC+hZVaigp3uzFFFP+wMY2NNgEfQbBQC30AUQsLGxvRCX7cmctnjLm7gJKB4Y7dmW9nf24v1UUYtlNMC+VtWNJsxUpl1izHm6RheAipS0KZ90Qp9SoNVw8hTYY1JEB2JZBslxMnwdp20LABsE8VTpwQyzRsgKgBMKtTIYv56bw7MaXcsRpFoTRuKX3F6OMLAN+bcPQClWmAULrK+GJcAWkMlWCReADb8UaohI9crtI7Pbfel1nc6ccWXDC+mAJI/UB2H1iRJZyHV1YfMJ4AmN0N2X2g7Z7ThhhTAGmuye4DK/DMaUP80wH0C547YBlcIbsPS2qX+sp4366dE7yH60QIIM0ZWVoCAu8zddoPgFn9MoA5D9cAI21BlSwtAZ67xhrRDuHljHSH7aw3ZGU3B8juIz1vBmt9n/3F0W/uhEgBAkpzS3YfGPCR1dbzPweQ5onV1jO5AGjr3E2IL6LhX9DRAPDEdxXDeMAIm7LdALjMNkkewFZGcuJmbDeAXSimSf4Fy8s9+ISOOcN3bCuANCWSMkAI/L0UlugQwpMfqbQmpw+0HzXoQITdE443S7IuCKnUB2xIZt5P9TIPAAAAAElFTkSuQmCC"},183:function(e,n,t){"use strict";t(124)},184:function(e,n,t){var o=t(39)(!1);o.push([e.i,"body{font-family:sans-serif;background:#f5f5f5}.header{position:relative;display:flex;align-items:center;justify-content:space-between}.toggle{font-size:32px}h1,h2,h3{margin:16px 0 4px}.layout-default{margin:auto;border-radius:3px;padding:8px;--deg:174deg;--nbnotes:6}.burger{text-align:center;cursor:pointer;position:absolute;width:60px;height:40px;right:0;font-size:26px}.burger:hover{color:#0cc}@media screen and (min-width:500px){.menu>*{padding:20px;margin:0 10px;font-size:20px;font-weight:700}.burger{display:none}.layout-default{max-width:1000px;padding:16px}}@media screen and (max-width:500px){.menu:not(.is-open){display:none}.menu{position:absolute;right:0;top:100%;z-index:1;display:flex;flex-direction:column;background:#fff;border:1px solid #000;font-size:18px;font-weight:700}.menu>*{padding:18px 50px}}.overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.25);z-index:0}.footer{justify-content:center;margin-top:20px}.footer,.footer a{display:flex;align-items:center}.footer a{margin:0 10px}.footer span{margin-left:5px}",""]),e.exports=o},185:function(e,n,t){"use strict";t(125)},186:function(e,n,t){var o=t(39)(!1);o.push([e.i,"body{margin:0}",""]),e.exports=o},187:function(e,n,t){"use strict";t.r(n),t.d(n,"state",(function(){return c})),t.d(n,"getters",(function(){return l})),t.d(n,"mutations",(function(){return m}));t(20),t(15);var o=t(0),r=t(94),c=function(){return{handpans:"",volume:1,enableClac:!0,chosenSamplesBankIndex:0,samplesBanks:r.e,showBebop:!1,customPanScales:[],hideFooter:!1,playbackSpeed:1,flipHorizontal:!1,arpeggioMode:"up"}},l={getVolume:function(e){return e.volume},getChosenSamplesBankIndex:function(e){return e.chosenSamplesBankIndex}},m={addCustomPanScale:function(e,n){e.customPanScales.push(n)},removeCustomPanScale:function(e,n){e.customPanScales=e.customPanScales.filter((function(e){return e.name!==n}))},setVolume:function(e,n){o.a.set(e,"volume",n)},setChosenSamplesBankIndex:function(e,n){o.a.set(e,"chosenSamplesBankIndex",n)},enableClac:function(e,n){o.a.set(e,"enableClac",n)},setShowBebop:function(e,n){o.a.set(e,"showBebop",n)},setHideFooter:function(e,n){o.a.set(e,"hideFooter",n)},setPlaybackSpeed:function(e,n){o.a.set(e,"playbackSpeed",n)},setFlipHorizontal:function(e,n){o.a.set(e,"flipHorizontal",n)},setArpeggioMode:function(e,n){o.a.set(e,"arpeggioMode",n)}}},188:function(e,n,t){"use strict";t.r(n),t.d(n,"state",(function(){return r})),t.d(n,"getters",(function(){return c})),t.d(n,"mutations",(function(){return l})),t.d(n,"actions",(function(){return m}));var o=t(0),r=function(){return{recordPlaying:null,recordQueued:null}},c={getRecordPlaying:function(e){return e.recordPlaying}},l={setRecordPlaying:function(e,n){o.a.set(e,"recordPlaying",n)},setRecordQueued:function(e,n){o.a.set(e,"recordQueued",n)}},m={restartRecordPlaying:function(e){var n=e.commit,t=e.state.recordPlaying;n("setRecordPlaying",null),setTimeout((function(){n("setRecordPlaying",t)}),1)}}},189:function(e,n,t){"use strict";t.r(n),t.d(n,"state",(function(){return c})),t.d(n,"mutations",(function(){return l}));t(21),t(140);var o=t(0),r=t(75),c=function(){return{handpansDefinition:[],handpansUser:[],highlightedNotes:[],relativeNoteBase:"",showRelative:!1,selectedPanScale:null,selectedScale:{},selectedChord:{},selectedSong:null,selectedSongParsed:null,selectedSongCategory:null,playbackStart:0,playbackEnd:0}},l={setHandpansUser:function(e,n){e.handpansUser=n,n.length&&(e.handpansDefinition=n.map((function(e){return e.handpanModel.getDefinition()})))},setShowRelative:function(e,n){e.showRelative=n},setRelativeNoteBase:function(e,n){e.relativeNoteBase=n},setHighlightedNotes:function(e,n){o.a.set(e,"highlightedNotes",n)},setSelectedPanScale:function(e,n){o.a.set(e,"selectedPanScale",n)},setSelectedScale:function(e,n){o.a.set(e,"selectedScale",n)},setSelectedChord:function(e,n){o.a.set(e,"selectedChord",n)},setSelectedSongCategory:function(e,n){o.a.set(e,"selectedSongCategory",n)},setSelectedSong:function(e,n){if(e.selectedSong=n,null!==n&&n.recording){var t=Object(r.parseRecord)(n.recording);o.a.set(e,"selectedSongParsed",t),o.a.set(e,"playbackStart",0),o.a.set(e,"playbackEnd",t.record.length-1)}else e.selectedSongParsed=null},loadFromDefinition:function(e,n){var t=n.id,o=n.definition,r=n.dingWanted,c=e.handpansUser.find((function(e){return e.id===t}));c&&c.loadFromDefinition(o,r),e.handpansDefinition=e.handpansUser.map((function(e){return e.handpanModel.getDefinition()}))},setPlaybackStart:function(e,n){o.a.set(e,"playbackStart",n)},setPlaybackEnd:function(e,n){o.a.set(e,"playbackEnd",n)}}},75:function(e,n,t){"use strict";t.r(n),t.d(n,"stringifyStateRecord",(function(){return o})),t.d(n,"stringifyRecord",(function(){return r})),t.d(n,"parseRecord",(function(){return c})),t.d(n,"state",(function(){return l})),t.d(n,"mutations",(function(){return m})),t.d(n,"actions",(function(){return d}));t(21),t(71),t(20);function o(e){return e.record.map((function(e){return e.note+"@"+e.time})).join(",")+",end@"+(e.endTime-e.startTime)}function r(e,n){return e.map((function(e){return e.note+"@"+e.time})).join(",")+",end@"+n}function c(e){var n=e.split(",").map((function(e){return e.split("@")}));return{record:n.filter((function(e){return"end"!==e[0]})).map((function(e){return{note:e[0],time:parseInt(e[1],10)}})),endTime:parseInt(n.filter((function(e){return"end"===e[0]}))[0][1],10)}}var l=function(){return{isListening:!1,isRecording:!1,startTime:0,endTime:0,record:[]}},m={startListening:function(e){e.isListening=!0},newRecord:function(e){e.record=[],e.isListening=!1,e.isRecording=!0,e.startTime=(new Date).getTime(),e.endTime=0},stopRecord:function(e){e.isRecording=!1,e.endTime=(new Date).getTime()},addNote:function(e,n){var t=(new Date).getTime()-e.startTime;e.record.push({time:t,note:n})}},d={playNote:function(e,n){var t=e.commit,o=e.state;o.isListening&&t("newRecord"),o.isRecording&&t("addNote",n)}}},93:function(e,n,t){"use strict";var o=t(128);n.a=function(e){var n=e.store;new o.a({}).plugin(n)}},94:function(e,n,t){"use strict";t.d(n,"d",(function(){return o})),t.d(n,"c",(function(){return r})),t.d(n,"f",(function(){return c})),t.d(n,"b",(function(){return l})),t.d(n,"a",(function(){return m})),t.d(n,"e",(function(){return d}));var o=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],r=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],c=[{name:"Bebop major",ecarts:["1","2","3","4","5","6m","6","7"],special:"6m",category:"bebop"},{name:"Bebop dorian",ecarts:["1","2","3m","3","4","5","6","7m"],special:"3",category:"bebop"},{name:"Bebop dominant",ecarts:["1","2","3","4","5","6","7m","7"],special:"7",category:"bebop"},{name:"Bebop phrygian dominant",ecarts:["1","2m","3","4","5","6m","7m","7"],special:"7",category:"bebop"},{name:"Bebop locrian",ecarts:["1","2m","3m","4","T","5","6m","7m"],special:"5",category:"bebop"},{name:"Major/Ionian",ecarts:["1","2","3","4","5","6","7"]},{name:"Dorian",ecarts:["1","2","3m","4","5","6","7m"],special:"6"},{name:"Phrygian",ecarts:["1","2m","3m","4","5","6m","7m"],special:"2m"},{name:"Lydian",ecarts:["1","2","3","T","5","6","7"],special:"T"},{name:"Mixolydian",ecarts:["1","2","3","4","5","6","7m"],special:"7m"},{name:"Minor/Aeolian",ecarts:["1","2","3m","4","5","6m","7m"]},{name:"Locrian",ecarts:["1","2m","3m","4","T","6m","7m"]},{name:"Harmonic minor",ecarts:["1","2","3m","4","5","6m","7"],special:"7"},{name:"Phrygian dominant/Hijaz",ecarts:["1","2m","3","4","5","6m","7m"],special:"3"},{name:"Romanian minor/Ukrainian dorian",ecarts:["1","2","3m","T","5","6","7m"],special:"T"},{name:"Melodic minor (asc)",ecarts:["1","2","3m","4","5","6","7"],special:"3m"},{name:"Hexatonic major",ecarts:["1","2","3","4","5","6"]},{name:"Hexatonic major Blues",ecarts:["1","2","3m","3","5","6"],special:"3m"},{name:"Hexatonic minor",ecarts:["1","2","3m","4","5","7m"]},{name:"Hexatonic minor Blues T",ecarts:["1","3m","4","T","5","7m"],special:"T"},{name:"Hexatonic minor Blues 3",ecarts:["1","3m","3","4","5","7m"],special:"3"},{name:"Pentatonic major",ecarts:["1","2","3","5","6"]},{name:"Pentatonic minor",ecarts:["1","3m","4","5","7m"]},{name:"Hirajoshi",ecarts:["1","2","3m","5","6m"]},{name:"Iwato",ecarts:["1","2m","4","T","7m"]},{name:"Insen",ecarts:["1","2m","4","5","7m"]},{name:"Yo",ecarts:["1","2","4","5","6"]},{name:"Kumoï",ecarts:["1","2","3m","5","6"]},{name:"Pygmy",ecarts:["1","2","3m","5","7m"]}],l=["1","2m","2","3m","3","4","T","5","6m","6","7m","7"],m=[{type:"maj",chords:[{val:"1 3 5",name:"Major",abbr:""}]},{type:"min",chords:[{val:"1 3m 5",name:"Minor",abbr:"m"}]},{type:"5th",chords:[{val:"1 5",name:"Fifth",abbr:"⁵"}]},{type:"7th",chords:[{val:"1 3 5 7m",name:"Dominant seventh",abbr:"⁷"},{val:"1 3 5 7",name:"Major seventh",abbr:"M⁷"},{val:"1 3m 5 7m",name:"Minor seventh",abbr:"m⁷"}]},{type:"sus",chords:[{val:"1 4 5",name:"Suspended 4",abbr:"<sup>sus4</sup>"}]},{type:"diss",chords:[{val:"1 2m",name:"second minor",abbr:"m²"},{val:"1 T",name:"tritone",abbr:"<sub>tt</sub>"},{val:"1 3m T",name:"Diminished",abbr:"<sub>dim</sub>"}]}],d=[{name:"Shellopan",website:"www.shellopan.fr",folder:"shellopan",samplesDispo:["E2","F2","F#2","G2","G#2","A2","A#2","B2","C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5"],buffer:{},logo:"/shellopan_sm.png"},{name:"Various",folder:"various",samplesDispo:["C3","C#3","D3","E3","F3","G3","G#3","A3","B3","C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5"],buffer:{}}]}},[[144,15,4,16]]]);