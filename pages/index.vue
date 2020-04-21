<template>
    <div id="app">
        <h1>Handpaner</h1>
        <div>
            <h3>Absolute scale</h3>
            Notes
            <br />
            <input v-model="inputAbsNotation" size="40" @keyup="relChanged" />
        </div>
        <div>
            <h3>Relative scale</h3>
            Ding
            <select v-model="inputDing" disabled>
                <option v-for="note in notesAll" v-bind:key="note">{{ note }}</option>
            </select>
            <br />Relative scale:
            <input v-model="inputRelNotation" size="40" readonly />
            <br />
        </div>
        <div>
            <h3>Handpan scales</h3>
            <div class="panscales">
                <div v-for="panScale in displayedHandpan.panScales" v-bind:key="panScale.name" class="panscale">
                    {{ panScale.name }}
                </div>
            </div>
        </div>
        <div>
            <h3>Chords</h3>
            <div v-for="chord in displayedHandpan.chords" class="chord-type" v-bind:key="chord.type">
                <div class="chord-type-name">{{ chord.type }}</div>
                <div
                    class="chord"
                    v-for="chordd in chord.chords"
                    v-bind:key="chordd.label"
                    @click="selectChord(chord, chordd)"
                    @mouseover="selectChord(chord, chordd)"
                    @mouseout="unselectChord()"
                    v-bind:class="{
                        highlight: chordd.label === selectedChord.label,
                    }"
                    v-html="chordd.label"
                ></div>
            </div>
        </div>
        <div>
            <h3>Diagram</h3>
            <HandpanDiagram :handpan="displayedHandpan" :selectedChord="selectedChord" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as DATA from '../data'
import { Chord } from '../models/chord'
import { Handpan } from '../models'
import { genChords, relToAbsSharp, relToAbsFlat } from '../music'
import { default as HandpanDiagram } from '../components/handpan-diagram.vue'

export default Vue.extend({
    components: {
        HandpanDiagram,
    },
    data() {
        return {
            displayedHandpanIndex: 0,
            handpans: <Handpan[]>[],
            inputAbsNotation: '',
            inputDing: '',
            inputRelNotation: '',
            notes: <any[]>[],
            abs: '',
            scales: DATA.scales,
            notesAll: DATA.notesAll,
            chords: {},
            selectedChord: {
                label: '',
                root: '',
                type: '',
                noteNames: <any[]>[],
            },
            selectedChordNoteNames: [],
        }
    },
    created() {
        const handpan = new Handpan()
        handpan.loadFromAbsNotation('D/ A C D E F G A C')
        //handpan.loadFromAbsNotation('C#/ (F#) G# A B C# D# E F# G# (A) (B) (C#)') // CUSTOM
        //handpan.loadFromAbsNotation('Eb/ Bb B C# Eb F F# Ab Bb') // CHIANT
        //handpan.loadFromAbsNotation('C#/ G# A B C# D# E F# G#') // C# Annaziska
        //handpan.loadFromAbsNotation('F/ Ab C Db Eb F G Ab C') // F equinox
        //handpan.loadFromAbsNotation('E/ G B C# D E F# G B') // E la sirena
        //handpan.loadFromAbsNotation('A/ C D E F# G A B C') // A Dorian
        //handpan.loadFromAbsNotation('A/ C# D E F# G A B C#') // A mixo
        handpan.genChords()
        handpan.genPanScales()
        
        this.handpans.push(handpan)

        this.displayHandpan()
    },
    computed: {
        displayedHandpan(): Handpan {
            return this.handpans[this.displayedHandpanIndex]
        },
    },
    methods: {
        // genChords() {
        //     const uniqueNotes = [...new Set([...this.abs.matchAll(/[A-G][♯♭]?/g)].map(m => m[0]))]
        //     this.chords = genChords(uniqueNotes)
        // },
        relChanged(): void {
            const displayedHandpan = this.handpans[this.displayedHandpanIndex]
            displayedHandpan.loadFromAbsNotation!(this.inputAbsNotation)
            displayedHandpan.genChords()
            displayedHandpan.genPanScales()
            this.displayHandpan()
        },
        displayHandpan(): void {
            const displayedHandpan = this.handpans[this.displayedHandpanIndex]
            this.inputDing = displayedHandpan.ding
            this.inputRelNotation = displayedHandpan.relNotation
            this.inputAbsNotation = displayedHandpan.absNotationUser
        },
        selectChord(chordType: any, chord: any) {
            this.selectedChord = {
                label: chord.label,
                root: chord.root,
                type: chordType.type,
                noteNames: [
                    ...chord.notes.map((n: any) => relToAbsSharp(chord.root, n)),
                    ...chord.notes.map((n: any) => relToAbsFlat(chord.root, n)),
                ],
            }
        },
        unselectChord() {
            this.selectedChord = {
                label: '',
                type: '',
                root: '',
                noteNames: [],
            }
        },
    },
})
</script>

<style scoped>
.chord-type, .panscales {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
}

.chord-type-name {
    min-width: 28px;
    padding-right: 8px;
    text-align: right;
}
.chord,
.panscale {
    border: 1px solid #333;
    border-radius: 3px;
    padding: 0 5px;
    cursor: pointer;
    min-width: 32px;
    text-align: center;
    margin-left: 4px;
}
.chord.highlight {
    background: #00ffcc80 !important;
}
</style>
