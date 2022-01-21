<template>
    <div
        class="handpan-diagram"
        v-bind:class="{
            bad: selectedChord && selectedChord.type === 'bad',
            hasBottom: nbNotesBottom > 0,
            hasMutant: nbNotesMutant > 0,
            flipHorizontal,
        }"
    >
        <div class="handpan-shape is-top" @mousedown="playClacMouse()" @touchstart="playClacTouch()">
            <div
                class="ding"
                v-bind:class="{
                    highlight: isHighlighted(handpan.getDing()),
                    highlightplus: isRoot(handpan.getDing()),
                    highlightless: isNoteInModel(handpan.getDing()),
                }"
                @mousedown="playNoteMouse($event, handpan.getDing())"
                @touchstart="playNoteTouch($event, handpan.getDing())"
            >
                <HandpanNoteInside class="inside" :note="handpan.getDing()" />
                <div class="animation" :class="{ animated: isAnim(handpan.getDing()) }" @animationend="endAnim(handpan.getDing())"></div>
            </div>
            <div class="notes" :style="cssNbNotesTop">
                <div class="note" v-for="note in handpan.getRestNotesTop()" v-bind:key="note.key">
                    <span
                        v-bind:class="{
                            highlight: isHighlighted(note),
                            special: isSpecial(note),
                            highlightplus: isRoot(note),
                            highlightless: isNoteInModel(note),
                        }"
                        @mousedown="playNoteMouse($event, note)"
                        @touchstart="playNoteTouch($event, note)"
                    >
                        <HandpanNoteInside class="inside" :note="note" />
                        <div class="animation" :class="{ animated: isAnim(note) }" @animationend="endAnim(note)"></div>
                    </span>
                </div>
            </div>
            <div class="notes notes-mutant" :style="cssNbNotesTopMutant">
                <div class="note" v-for="note in handpan.getRestNotesTopMutant()" v-bind:key="note.key">
                    <span
                        v-bind:class="{
                            highlight: isHighlighted(note),
                            special: isSpecial(note),
                            highlightplus: isRoot(note),
                            highlightless: isNoteInModel(note),
                        }"
                        @mousedown="playNoteMouse($event, note)"
                        @touchstart="playNoteTouch($event, note)"
                    >
                        <HandpanNoteInside class="inside" :note="note" />
                        <div class="animation" :class="{ animated: isAnim(note) }" @animationend="endAnim(note)"></div>
                    </span>
                </div>
            </div>
        </div>
        <div class="handpan-shape is-bottom" v-if="nbNotesBottom" @mousedown="playClacMouse()" @touchstart="playClacTouch()">
            <div class="gu" @mousedown="playGuMouse($event)" @touchstart="playGuTouch($event)"></div>
            <div class="notes" :style="cssNbNotesBottom">
                <div class="note" v-for="note in handpan.getRestNotesBottom()" v-bind:key="note.key">
                    <span
                        v-bind:class="{
                            highlight: isHighlighted(note),
                            special: isSpecial(note),
                            highlightplus: isRoot(note),
                            highlightless: isNoteInModel(note),
                        }"
                        @mousedown="playNoteMouse($event, note)"
                        @touchstart="playNoteTouch($event, note)"
                    >
                        <HandpanNoteInside class="inside" :note="note" />
                        <div class="animation" :class="{ animated: isAnim(note) }" @animationend="endAnim(note)"></div>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { default as HandpanNoteInside } from '../components/handpan-note-inside.vue'
import { HandpanNote, HandpanModel } from '@/domain/handpan'
import { flatToSharp, alternateFlatSharp } from '../music'
import { playSample, playGu, playClac } from '@/domain/player'
import * as DATA from '../data'
import { RecordParsed } from '@/data/songs'

let isMobile = false

export default Vue.extend({
    components: {
        HandpanNoteInside,
    },
    props: {
        handpan: HandpanModel,
    },
    data() {
        return {
            playInterval: null as any,
            notesTimeouts: [] as any[],
            animatedNote: null as any,
            animatedNotes: [] as any[],
        }
    },
    computed: {
        selectedPanScale(): any {
            return this.$store.state.selection.selectedPanScale
        },
        selectedScale(): any {
            return this.$store.state.selection.selectedScale
        },
        selectedChord(): any {
            return this.$store.state.selection.selectedChord
        },
        nbNotesTop(): number {
            return this.handpan.getRestNotesTop().length
        },
        nbNotesBottom(): number {
            return this.handpan.getRestNotesBottom().length
        },
        nbNotesMutant(): number {
            return this.handpan.getRestNotesTopMutant().length
        },
        cssNbNotesTop(): any {
            return {
                '--nbnotes': this.nbNotesTop,
            }
        },
        cssNbNotesTopMutant(): any {
            return {
                '--nbnotes': 7,
            }
        },
        cssNbNotesBottom(): any {
            return {
                '--nbnotes': this.nbNotesBottom,
            }
        },
        recordPlaying: {
            get() {
                return this.$store.state.player.recordPlaying
            },
            set(value: any) {
                this.$store.commit('player/setRecordPlaying', value)
            },
        },
        flipHorizontal(): boolean {
            return this.$store.state.options.flipHorizontal
        },
    },
    watch: {
        recordPlaying(recordPlaying) {
            if (recordPlaying !== null) {
                this.beginPlayback(recordPlaying)
            } else {
                clearTimeout(this.playInterval)
                this.notesTimeouts.forEach((noteTimeout) => clearTimeout(noteTimeout))
            }
        },
    },
    methods: {
        endAnim(note: HandpanNote): void {
            this.animatedNotes = this.animatedNotes.filter((n) => n !== note)
        },
        isAnim(note: HandpanNote): boolean {
            return this.animatedNotes.indexOf(note) !== -1
        },
        beginPlayback(recordParsed: RecordParsed): void {
            const speedRatio = this.$store.state.options.playbackSpeed
            const playbackStart = recordParsed.record[this.$store.state.selection.playbackStart].time
            // const playbackEnd = recordParsed.endTime
            const endIndex = this.$store.state.selection.playbackEnd + 1
            const playbackEnd = endIndex < recordParsed.record.length ? recordParsed.record[endIndex].time : recordParsed.endTime
            const playbackDuration = playbackEnd - playbackStart
            this.notesTimeouts = []
            recordParsed.record.forEach((elt: any, i: number) => {
                const noteTimeout = (elt.time - playbackStart) / speedRatio
                if (noteTimeout < 0 || noteTimeout >= playbackDuration / speedRatio) {
                    return
                }
                this.notesTimeouts.push(
                    setTimeout(() => {
                        this.playNoteByFullname(elt.note)
                    }, noteTimeout),
                )
            })
            this.playInterval = setTimeout(() => {
                this.beginPlayback(recordParsed)
            }, playbackDuration / speedRatio)
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
                const volume = this.$store.getters['options/getVolume']
                playClac(volume)
            }
        },
        playGuMouse(event: Event): void {
            event.stopPropagation()
            if (!isMobile) {
                this.playGu()
            }
        },
        playGuTouch(event: Event): void {
            event.stopPropagation()
            this.playGu()
        },
        playGu(): void {
            const volume = this.$store.getters['options/getVolume']
            playGu(volume)
        },
        playNoteTouch(event: Event, note: HandpanNote): void {
            event.stopPropagation()
            isMobile = true
            this.playNote(note)
        },
        playNoteMouse(event: Event, note: HandpanNote): void {
            event.stopPropagation()
            if (!isMobile) {
                this.playNote(note)
            }
        },
        playNoteByFullname(noteFullname: string): void {
            const noteFound = this.handpan.notes.find((note) => {
                return note.noteName + note.octave === noteFullname
            })
            if (noteFound) {
                this.playNote(noteFound)
            } else {
                console.log('note not found in the pan', noteFullname)
            }
        },
        playNote(note: HandpanNote): void {
            const name = note.noteName
            const octave = note.octave
            const nameSharp = flatToSharp(name)
            const chosenSamplesBankIndex = this.$store.getters['options/getChosenSamplesBankIndex']
            const noteBuffer: any = DATA.samplesBanks[chosenSamplesBankIndex].buffer[nameSharp + octave]
            if (noteBuffer) {
                this.playSample(noteBuffer)
                this.$store.dispatch('recorder/playNote', nameSharp + octave)
                this.animatedNotes = this.animatedNotes.filter((n) => n !== note)
                setTimeout(() => {
                    this.animatedNotes.push(note)
                }, 1)
            }
        },
        playSample(sampleBuffer: any): void {
            const volume = this.$store.getters['options/getVolume']
            playSample(sampleBuffer, volume)
        },
        isSpecial(note: HandpanNote): boolean {
            const otherNote = alternateFlatSharp(note.noteName)
            return note.noteName === this.selectedScale?.special || otherNote === this.selectedScale?.special
        },
        isRoot(note: HandpanNote): boolean {
            const otherNote = alternateFlatSharp(note.noteName)
            const isRoot = note.noteName === this.selectedChord?.root || otherNote === this.selectedChord?.root
            const isTonic = note.noteName === this.selectedScale?.tonic || otherNote === this.selectedScale?.tonic
            let isDing = false
            if (this.selectedPanScale) {
                isDing =
                    note.noteName === this.selectedPanScale.getDing().noteName || otherNote === this.selectedPanScale.getDing().noteName
            }
            return isRoot || isTonic || isDing
        },
        isNoteInModel(note: HandpanNote): boolean {
            let isInPanScale = false
            const noteName = note.noteName
            const otherNote = alternateFlatSharp(noteName)
            if (this.selectedPanScale && this.selectedPanScale.notes) {
                isInPanScale = this.selectedPanScale.notes.some((n: HandpanNote) => {
                    return n.noteName === noteName || n.noteName === otherNote
                })
            }
            return isInPanScale
        },
        isHighlighted(note: HandpanNote): boolean {
            const noteName = note.noteName
            const octave = note.octave
            const highlightedNotes = this.$store.state.selection.highlightedNotes
            if (highlightedNotes.indexOf(noteName + octave) !== -1) {
                return true
            }
            const otherNote = alternateFlatSharp(noteName)
            let isInScale = false
            let isInPanScale = false
            let isInChord = false
            if (this.selectedChord && this.selectedChord.noteNames) {
                isInChord = this.selectedChord.noteNames.indexOf(noteName) !== -1 || this.selectedChord.noteNames.indexOf(otherNote) !== -1
            }
            if (this.selectedScale && this.selectedScale.noteNames) {
                isInScale = this.selectedScale.noteNames.indexOf(noteName) !== -1 || this.selectedScale.noteNames.indexOf(otherNote) !== -1
            }
            if (this.selectedPanScale && this.selectedPanScale.notes) {
                isInPanScale = this.selectedPanScale.notes.some((n: HandpanNote) => {
                    return n.octave === octave && (n.noteName === noteName || n.noteName === otherNote)
                })
            }
            return isInChord || isInScale || isInPanScale
        },
    },
})
</script>

<style scoped>
.handpan-diagram.flipHorizontal {
    transform: scale(-1, 1);
}

.handpan-diagram.flipHorizontal /deep/ .inside {
    transform: scale(-1, 1);
}

.handpan-shape {
    position: relative;
    background: radial-gradient(#fdfdfd, #606060);
}

.handpan-diagram.flipHorizontal .handpan-shape {
    background: radial-gradient(#606060, #fdfdfd);
}

.notes {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
}

.notes-mutant {
    --deg: 0deg;
}
.notes-mutant .note {
    height: 55%;
}

.handpan-shape.is-bottom {
    background: #666;
    --deg: 150deg; /* décalage car souvent double bottoms graves ? */
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

.handpan-diagram.flipHorizontal .ding {
    background: #606060;
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
        width: 50px;
        height: 50px;
    }
    50% {
        width: 60px;
        height: 60px;
    }
    100% {
        width: 50px;
        height: 50px;
    }
}

.animation {
    background: white;
    position: absolute;
    border-radius: 100px;
    display: block;
}

.animated {
    animation: noteanim 0.1s;
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
