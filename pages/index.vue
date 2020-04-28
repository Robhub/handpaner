<template>
    <div id="app">
        <h1>Handpaner</h1>
        <div>
            <h3>Absolute input</h3>
            Notes
            <br />
            <input v-model="inputAbsNotation" size="40" @keyup="absChanged" />
        </div>
        <div>
            <h3>Relative input</h3>
            Ding
            <select v-model="inputDing" @change="relChanged">
                <option v-for="note in notesAll" v-bind:key="note">{{ note }}</option>
            </select>
            <br />Relative scale
            <input v-model="inputRelNotation" size="40" @keyup="relChanged" />
            <br />Handpan scale
            <select v-model="inputPanscale" @change="panScaleChanged">
                <option v-for="panScale in panScales" v-bind:key="panScale.name" :value="panScale">{{ panScale.name }}</option>
            </select>
        </div>
        <div v-if="displayedHandpan">
            <div>
                <h3>Handpan scales</h3>
                <div class="panscales">
                    <div
                        v-for="panScale in displayedHandpan.panScales"
                        v-bind:key="panScale.name"
                        class="panscale"
                        @click="selectPanScale(panScale)"
                        @mouseover="selectPanScale(panScale)"
                        @mouseout="unselectPanScale()"
                        v-bind:class="{
                            highlight: panScale.name === selectedPanScale.name,
                        }"
                        v-html="panScale.name"
                    ></div>
                    <div v-if="!displayedHandpan.panScales.length">
                        No handpan scale found.
                    </div>
                </div>
            </div>
            <div>
                <h3>Scales</h3>
                <div class="scales">
                    <div
                        class="scale"
                        v-for="scale in displayedHandpan.scales"
                        v-bind:key="scale.id"
                        @click="selectScale(scale)"
                        @mouseover="selectScale(scale)"
                        @mouseout="unselectScale()"
                        v-bind:class="{
                            highlight: scale.id === selectedScale.id,
                        }"
                    >
                        {{ scale.tonic }} {{ scale.name }}
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
                <HandpanDiagram
                    :handpan="displayedHandpan"
                    :selectedChord="selectedChord"
                    :selectedPanScale="selectedPanScale"
                    :selectedScale="selectedScale"
                />
            </div>
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
            inputPanscale: <any>{},
            inputRelNotation: '',
            notes: <any[]>[],
            abs: '',
            panScales: DATA.panScales,
            scales: DATA.scales,
            notesAll: DATA.notesAll,
            chords: {},
            selectedPanScale: {},
            selectedScale: {},
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
        setTimeout(() => {
            const handpan = new Handpan()
            if (this.$nuxt.$route.hash) {
                handpan.loadFromAbsNotation(this.$nuxt.$route.hash.substr(1).replace(/\%20/g, ' '))
                this.inputDing = handpan.ding
                this.inputAbsNotation = handpan.absNotationUser
                this.inputRelNotation = handpan.relNotation
                this.handpans.push(handpan)
                this.panChanged()
            } else {
                handpan.loadFromAbsNotation('D/ A C D E F G A C')
                this.handpans.push(handpan)
                this.panChanged()
            }
        }, 1)
    },
    computed: {
        displayedHandpan(): Handpan {
            return this.handpans[this.displayedHandpanIndex]
        },
    },
    methods: {
        panScaleChanged(): void {
            this.inputRelNotation = this.inputPanscale.val
            this.relChanged()
        },
        relChanged(): void {
            const displayedHandpan = this.handpans[this.displayedHandpanIndex]
            displayedHandpan.loadFromRelNotation!(this.inputDing.replace(/♯/g, '#').replace(/♭/g, 'b'), this.inputRelNotation)
            this.panChanged()
            this.$nuxt.$router.replace('#' + displayedHandpan.absNotationUser)
        },
        absChanged(): void {
            const displayedHandpan = this.handpans[this.displayedHandpanIndex]
            displayedHandpan.loadFromAbsNotation!(this.inputAbsNotation)
            this.panChanged()
            this.$nuxt.$router.replace('#' + displayedHandpan.absNotationUser)
        },
        panChanged(): void {
            const displayedHandpan = this.handpans[this.displayedHandpanIndex]
            const found = DATA.panScales.find(panScale => {
                return displayedHandpan.relNotation.trim() === panScale.val.trim()
            })
            this.inputPanscale = found ? found : null
            displayedHandpan.genChords()
            displayedHandpan.genPanScales()
            displayedHandpan.genScales()
            this.displayHandpan()
        },
        displayHandpan(): void {
            const displayedHandpan = this.handpans[this.displayedHandpanIndex]
            this.inputDing = displayedHandpan.ding
            this.inputRelNotation = displayedHandpan.relNotation
            this.inputAbsNotation = displayedHandpan.absNotationUser
        },
        selectPanScale(panScale: any) {
            this.selectedPanScale = panScale
        },
        unselectPanScale() {
            this.selectedPanScale = {}
        },
        selectScale(scale: any) {
            this.selectedScale = scale
        },
        unselectScale() {
            this.selectedScale = {}
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
.chord-type,
.panscales,
.scales {
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
.panscale,
.scale {
    border: 1px solid #333;
    border-radius: 3px;
    padding: 0 5px;
    cursor: pointer;
    min-width: 32px;
    text-align: center;
    margin-left: 4px;
}
.chord.highlight,
.panscale.highlight,
.scale.highlight {
    background: #00ffcc80 !important;
}
</style>
