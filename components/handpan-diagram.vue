<template>
    <div class="handpan-diagram" v-bind:class="{ bad: selectedChord.type === 'bad', hasBottom: handpan.notesBottom.length > 0 }">
        <div class="handpan-shape is-top" @mousedown="playClacMouse()" @touchstart="playClacTouch()">
            <div
                class="ding"
                v-bind:class="{
                    highlight: isHighlighted(handpan.ding, handpan.dingOctave),
                    highlightplus: isRoot(handpan.ding),
                    highlightless: isNoteInModel(handpan.ding, handpan.dingOctave),
                }"
                @mousedown="playNoteMouse($event, { name: handpan.ding, octave: handpan.dingOctave })"
                @touchstart="playNoteTouch($event, { name: handpan.ding, octave: handpan.dingOctave })"
            >
                <HandpanNoteInside class="inside" :noteName="handpan.ding" :noteOctave="handpan.dingOctave" />
                <div class="animation" :class="{ animated: handpan.dingAnimated }" @animationend="handpan.dingAnimated = false"></div>
            </div>
            <div class="notes" :style="nbNotesTop">
                <div class="note" v-for="note in handpan.notesTop" v-bind:key="note.key">
                    <span
                        v-bind:class="{
                            highlight: isHighlighted(note.name, note.octave),
                            special: isSpecial(note.name),
                            highlightplus: isHighlighted(note.name, note.octave) && isRoot(note.name),
                            highlightless: isNoteInModel(note.name, note.octave),
                        }"
                        @mousedown="playNoteMouse($event, note)"
                        @touchstart="playNoteTouch($event, note)"
                    >
                        <HandpanNoteInside class="inside" :noteName="note.name" :noteOctave="note.octave" />
                        <div class="animation" :class="{ animated: note.animated }" @animationend="note.animated = false"></div>
                    </span>
                </div>
            </div>
        </div>
        <div class="handpan-shape is-bottom" v-if="handpan.notesBottom.length" @mousedown="playClacMouse()" @touchstart="playClacTouch()">
            <div class="gu" @mousedown="playGuMouse($event)" @touchstart="playGuTouch($event)"></div>
            <div class="notes" :style="nbNotesBottom">
                <div class="note" v-for="note in handpan.notesBottom" v-bind:key="note.key">
                    <span
                        v-bind:class="{
                            highlight: isHighlighted(note.name, note.octave),
                            special: isSpecial(note.name),
                            highlightplus: isHighlighted(note.name, note.octave) && isRoot(note.name),
                            highlightless: isNoteInModel(note.name, note.octave),
                        }"
                        @mousedown="playNoteMouse($event, note)"
                        @touchstart="playNoteTouch($event, note)"
                    >
                        <HandpanNoteInside class="inside" :noteName="note.name" :noteOctave="note.octave" />
                        <div class="animation" :class="{ animated: note.animated }" @animationend="note.animated = false"></div>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { default as HandpanNoteInside } from '../components/handpan-note-inside.vue'
import * as DATA from '../data'
import { Chord } from '../models/chord'
import { Handpan } from '../models'
import { flatToSharp, alternateFlatSharp } from '../music'
let isMobile = false
let audioctx: any
let clacBuffer: any
let guBuffer: any
let playInterval: any

function loadSample(path: string, fncb: Function): void {
    const request = new XMLHttpRequest()
    request.open('GET', path)
    request.responseType = 'arraybuffer'
    request.onload = function() {
        let undecodedAudio = request.response
        audioctx.decodeAudioData(undecodedAudio, fncb)
    }
    request.send()
}
if (process.client) {
    audioctx = new AudioContext()
    for (let samplesBank of DATA.samplesBanks) {
        const samplesDispo = samplesBank.samplesDispo
        for (let sampleDispo of samplesDispo) {
            const path = '/' + samplesBank.folder + '/' + sampleDispo.replace('♯', 's') + '.flac'
            loadSample(path, (data: any) => (samplesBank.buffer[sampleDispo] = data))
        }
    }
    loadSample('/gu/D2.flac', (data: any) => (guBuffer = data))
    loadSample('/clac/clac.flac', (data: any) => (clacBuffer = data))
}
export default Vue.extend({
    components: {
        HandpanNoteInside,
    },
    props: {
        handpan: Handpan,
        selectedChord: Object, // TODO typage chords
        selectedPanScale: Object,
        selectedScale: Object,
    },
    computed: {
        nbNotesTop(): any {
            return {
                '--nbnotes': this.handpan.notesTop.length,
            }
        },
        nbNotesBottom(): any {
            return {
                '--nbnotes': this.handpan.notesBottom.length,
            }
        },
    },
    mounted() {
        this.$root.$on('playRecord', (xx: any) => {
            const { record, endTime } = xx
            this.beginPlayback(record, endTime)
        })
        this.$root.$on('stopPlayback', () => {
            clearTimeout(playInterval)
        })
    },
    destroyed() {
        this.$root.$off('playRecord')
        this.$root.$off('stopPlayback')
    },
    methods: {
        beginPlayback(record: any, endTime: any): void {
            record.forEach((elt: any) => {
                setTimeout(() => {
                    this.playNoteByFullname(elt.note)
                }, elt.time)
            })
            playInterval = setTimeout(() => {
                this.beginPlayback(record, endTime)
            }, endTime)
        },
        playClacMouse(): void {
            if (!isMobile) {
                this.playClac()
            }
        },
        playClacTouch(): void {
            this.playClac()
        },
        playClac(): void {
            if (this.$store.state.options.enableClac) {
                this.playSample(clacBuffer)
            }
        },
        playGuMouse(event: Event): void {
            event.stopPropagation() // prevents clac
            if (!isMobile) {
                this.playGu()
            }
        },
        playGuTouch(event: Event): void {
            event.stopPropagation() // prevents clac
            this.playGu()
        },
        playGu(): void {
            this.playSample(guBuffer)
        },
        playNoteTouch(event: Event, note: any): void {
            event.stopPropagation() // prevents clac
            isMobile = true
            this.playNote(note)
        },
        playNoteMouse(event: Event, note: any): void {
            event.stopPropagation() // prevents clac
            if (!isMobile) {
                this.playNote(note)
            }
        },
        playNoteByFullname(noteFullname: string): void {
            let noteFound = null
            if (this.handpan.ding + this.handpan.dingOctave === noteFullname) {
                // TODO : Déplacer le DING dans notesAll
                noteFound = { name: this.handpan.ding, octave: this.handpan.dingOctave }
            } else {
                noteFound = this.handpan.notesAll.find(note => {
                    return note.name + note.octave === noteFullname
                })
            }
            if (noteFound) {
                this.playNote(noteFound)
            } else {
                console.log('note not found in the pan', noteFullname)
            }
        },
        playNote(note: any): void {
            const name = note.name
            const octave = note.octave
            const nameSharp = flatToSharp(name)
            const chosenSamplesBankIndex = this.$store.getters['options/getChosenSamplesBankIndex']
            const noteBuffer: any = DATA.samplesBanks[chosenSamplesBankIndex].buffer[nameSharp + octave]
            if (noteBuffer) {
                this.playSample(noteBuffer)
                this.$store.dispatch('recorder/playNote', nameSharp + octave)
                if (note.animated === undefined) {
                    this.handpan.dingAnimated = false
                    setTimeout(() => {
                        this.handpan.dingAnimated = true
                    }, 0)
                } else {
                    note.animated = false
                    setTimeout(() => {
                        note.animated = true
                    }, 0)
                }
            }
        },
        playSample(sampleBuffer: any): void {
            const gainNode = audioctx.createGain()
            gainNode.gain.value = this.$store.getters['options/getVolume']
            const source = audioctx.createBufferSource()
            source.buffer = sampleBuffer
            gainNode.connect(audioctx.destination)
            source.connect(gainNode)
            source.start(0)
        },
        isSpecial(noteName: string): boolean {
            const otherNote = alternateFlatSharp(noteName)
            return noteName === this.selectedScale?.special || otherNote === this.selectedScale?.special
        },
        isRoot(noteName: string): boolean {
            const otherNote = alternateFlatSharp(noteName)
            const isRoot = noteName === this.selectedChord?.root || otherNote === this.selectedChord?.root
            const isTonic = noteName === this.selectedScale?.tonic || otherNote === this.selectedScale?.tonic
            const isDing = noteName === this.selectedPanScale?.ding || otherNote === this.selectedPanScale?.ding
            return isRoot || isTonic || isDing
        },
        isNoteInModel(noteName: any, octave: number): boolean {
            let isInPanScale = false
            const otherNote = alternateFlatSharp(noteName)
            if (this.selectedPanScale && this.selectedPanScale.notesAll) {
                isInPanScale = this.selectedPanScale.notesAll.some((n: any) => {
                    return n.name === noteName || n.name === otherNote
                })
            }
            return isInPanScale
        },
        isHighlighted(noteName: any, octave: number): boolean {
            const highlightedNotes = this.$store.state.selection.highlightedNotes
            if (highlightedNotes.indexOf(noteName + octave) !== -1) {
                return true
            }
            const otherNote = alternateFlatSharp(noteName)
            let isInScale = false
            let isInPanScale = false
            let isInChord = false
            if (this.selectedChord) {
                isInChord = this.selectedChord.noteNames.indexOf(noteName) !== -1 || this.selectedChord.noteNames.indexOf(otherNote) !== -1
            }
            if (this.selectedScale && this.selectedScale.noteNames) {
                isInScale = this.selectedScale.noteNames.indexOf(noteName) !== -1 || this.selectedScale.noteNames.indexOf(otherNote) !== -1
            }
            if (this.selectedPanScale && this.selectedPanScale.notesAll) {
                isInPanScale = this.selectedPanScale.notesAll.some((n: any) => {
                    return n.octave === octave && (n.name === noteName || n.name === otherNote)
                })
            }
            return isInChord || isInScale || isInPanScale
        },
    },
})
</script>

<style scoped>
.handpan-shape {
    position: relative;
    background: radial-gradient(#fdfdfd, #606060);
}
.handpan-shape.is-bottom {
    background: #666;
}

.ding,
.gu {
    position: absolute;
    left: 50%;
    top: 50%;
}

.ding,
.gu,
.note span {
    border: 1px solid #808080;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    pointer-events: all;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

.inside {
    background: radial-gradient(#ccc, #a9a9a9);
    border: 1px solid #808080;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ding .inside {
    background: radial-gradient(#fcfcfc, #a9a9a9);
}

.ding {
    background: #e6e6e6;
}

.note span {
    background: #aaa;
}

.gu {
    background: #333;
}

.note {
    user-select: none;
    pointer-events: none;
    position: absolute;
}

.handpan-shape .highlightless {
    background: #ffff0080 !important;
}
.handpan-shape .highlight {
    background: #00ff0080 !important;
}
.handpan-shape .highlightplus {
    background: #00ffcc80 !important;
}
.handpan-shape .special {
    border-color: #ff00ff !important;
}
.bad .highlight {
    background: #ff000080 !important;
}

@keyframes noteanim {
    0% {
        background: #ffffff00;
        width: 0px;
        height: 0px;
    }
    10% {
        background: #ffffffa0;
        width: 60px;
        height: 60px;
    }
    100% {
        background: #ffffff00;
    }
}

.animation {
    position: absolute;
    border-radius: 100px;
    display: block;
}

.animated {
    animation: noteanim 0.2s;
}

.note:nth-child(1) {
    transform: rotate(var(--deg));
}
.note:nth-child(1) span {
    transform: rotate(calc(var(--deg) * -1));
}

.note:nth-child(2) {
    transform: rotate(calc(var(--deg) + 360deg / var(--nbnotes)));
}
.note:nth-child(2) span {
    transform: rotate(calc((var(--deg) + 360deg / var(--nbnotes)) * -1));
}

.note:nth-child(3) {
    transform: rotate(calc(var(--deg) - 360deg / var(--nbnotes)));
}
.note:nth-child(3) span {
    transform: rotate(calc((var(--deg) - 360deg / var(--nbnotes)) * -1));
}

.note:nth-child(4) {
    transform: rotate(calc(var(--deg) + 360deg / var(--nbnotes) * 2));
}
.note:nth-child(4) span {
    transform: rotate(calc((var(--deg) + 360deg / var(--nbnotes) * 2) * -1));
}

.note:nth-child(5) {
    transform: rotate(calc(var(--deg) - 360deg / var(--nbnotes) * 2));
}
.note:nth-child(5) span {
    transform: rotate(calc((var(--deg) - 360deg / var(--nbnotes) * 2) * -1));
}

.note:nth-child(6) {
    transform: rotate(calc(var(--deg) + 360deg / var(--nbnotes) * 3));
}
.note:nth-child(6) span {
    transform: rotate(calc((var(--deg) + 360deg / var(--nbnotes) * 3) * -1));
}

.note:nth-child(7) {
    transform: rotate(calc(var(--deg) - 360deg / var(--nbnotes) * 3));
}
.note:nth-child(7) span {
    transform: rotate(calc((var(--deg) - 360deg / var(--nbnotes) * 3) * -1));
}

.note:nth-child(8) {
    transform: rotate(calc(var(--deg) + 360deg / var(--nbnotes) * 4));
}
.note:nth-child(8) span {
    transform: rotate(calc((var(--deg) + 360deg / var(--nbnotes) * 4) * -1));
}

.note:nth-child(9) {
    transform: rotate(calc(var(--deg) - 360deg / var(--nbnotes) * 4));
}
.note:nth-child(9) span {
    transform: rotate(calc((var(--deg) - 360deg / var(--nbnotes) * 4) * -1));
}

.note:nth-child(10) {
    transform: rotate(calc(var(--deg) + 360deg / var(--nbnotes) * 5));
}
.note:nth-child(10) span {
    transform: rotate(calc((var(--deg) + 360deg / var(--nbnotes) * 5) * -1));
}

.note:nth-child(11) {
    transform: rotate(calc(var(--deg) - 360deg / var(--nbnotes) * 5));
}
.note:nth-child(11) span {
    transform: rotate(calc((var(--deg) - 360deg / var(--nbnotes) * 5) * -1));
}

.note:nth-child(12) {
    transform: rotate(calc(var(--deg) + 360deg / var(--nbnotes) * 6));
}
.note:nth-child(12) span {
    transform: rotate(calc((var(--deg) + 360deg / var(--nbnotes) * 6) * -1));
}

.note:nth-child(13) {
    transform: rotate(calc(var(--deg) - 360deg / var(--nbnotes) * 6));
}
.note:nth-child(13) span {
    transform: rotate(calc((var(--deg) - 360deg / var(--nbnotes) * 6) * -1));
}

.note:nth-child(14) {
    transform: rotate(calc(var(--deg) + 360deg / var(--nbnotes) * 7));
}
.note:nth-child(14) span {
    transform: rotate(calc((var(--deg) + 360deg / var(--nbnotes) * 7) * -1));
}

.note:nth-child(15) {
    transform: rotate(calc(var(--deg) - 360deg / var(--nbnotes) * 7));
}
.note:nth-child(15) span {
    transform: rotate(calc((var(--deg) - 360deg / var(--nbnotes) * 7) * -1));
}

.note:nth-child(16) {
    transform: rotate(calc(var(--deg) + 360deg / var(--nbnotes) * 8));
}
.note:nth-child(16) span {
    transform: rotate(calc((var(--deg) + 360deg / var(--nbnotes) * 8) * -1));
}

.note:nth-child(17) {
    transform: rotate(calc(var(--deg) - 360deg / var(--nbnotes) * 8));
}
.note:nth-child(17) span {
    transform: rotate(calc((var(--deg) - 360deg / var(--nbnotes) * 8) * -1));
}

.note:nth-child(18) {
    transform: rotate(calc(var(--deg) + 360deg / var(--nbnotes) * 9));
}
.note:nth-child(18) span {
    transform: rotate(calc((var(--deg) + 360deg / var(--nbnotes) * 9) * -1));
}

.note:nth-child(19) {
    transform: rotate(calc(var(--deg) - 360deg / var(--nbnotes) * 9));
}
.note:nth-child(19) span {
    transform: rotate(calc((var(--deg) - 360deg / var(--nbnotes) * 9) * -1));
}
</style>
