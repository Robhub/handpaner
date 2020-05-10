<template>
    <div class="handpan-diagram" v-bind:class="{ bad: selectedChord.type === 'bad' }">
        <div class="handpan-shape is-top">
            <div
                class="ding"
                v-bind:class="{
                    highlight: isHighlighted(handpan.ding, 3),
                    isroot: isRoot(handpan.ding),
                }"
            >
                {{ handpan.ding }}<sub>3</sub>
            </div>
            <div class="notes" :style="nbNotesTop">
                <div class="note" v-for="note in handpan.notesTop" v-bind:key="note.key">
                    <span
                        v-bind:class="{
                            highlight: isHighlighted(note.name, note.octave),
                            special: isSpecial(note.name),
                            isroot: isRoot(note.name),
                        }"
                        >{{ note.name }}<sub>{{ note.octave }}</sub></span
                    >
                </div>
            </div>
        </div>
        <div class="handpan-shape is-bottom" v-if="handpan.notesBottom.length">
            <div class="gu"></div>
            <div class="notes" :style="nbNotesBottom">
                <div class="note" v-for="note in handpan.notesBottom" v-bind:key="note.key">
                    <span
                        v-bind:class="{
                            highlight: isHighlighted(note.name, note.octave),
                            special: isSpecial(note.name),
                            isroot: isRoot(note.name, note.octave),
                        }"
                        >{{ note.name }}<sub>{{ note.octave }}</sub></span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Chord } from '../models/chord'
import { Handpan } from '../models'
import { alternateFlatSharp } from '../music'
export default Vue.extend({
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
    methods: {
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
        isHighlighted(noteName: any, octave: number): boolean {
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
    width: 200px;
    height: 200px;
    border-radius: 200px;
    background: #ccc;
}
.handpan-shape.is-bottom {
    margin-left: 25px;
    width: 150px;
    height: 150px;
    border-radius: 150px;
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
    border: 1px solid #333;
    background: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 999px;
    margin-left: -20px;
    margin-top: -20px;
}

.gu {
    background: #333;
}

.note {
    position: absolute;
    top: 90px;
    padding-left: 175px;
}

.is-bottom .note {
    top: 65px;
    padding-left: 125px;
}

sub {
    margin-bottom: -10px;
    font-size: 11px;
}

.handpan-shape .highlight {
    background: #00ff0080 !important;
}
.handpan-shape .isroot {
    background: #00ffcc80 !important;
}
.handpan-shape .special {
    border-color: #ff00ff !important;
}
.bad .highlight {
    background: #ff000080 !important;
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
</style>
