<template>
    <div id="app">
        <div class="config">
            <div class="toggle">☰</div>
        </div>
        <img src="../static/handpaner.png" />
        <div class="tabs">
            <div
                class="tab"
                v-for="(handpan, index) in handpans"
                v-bind:key="handpan.id"
                @click="selectHandpan(index)"
                v-bind:class="{ selected: displayedHandpanIndex === index }"
            >
                Pan n°{{ index + 1 }}
                <span class="delete" @click="removeHandpan($event, index)" v-if="handpans.length > 1">×</span>
            </div>
            <div class="tab" @click="addHandpan()">+</div>
        </div>
        <div class="tab-content">
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
                <select v-model="inputDingOctave" @change="relChanged">
                    <option>2</option>
                    <option>3</option>
                </select>
                <br />Relative scale
                <input v-model="inputRelNotation" size="40" @keyup="relChanged" />
                <br />Handpan scale
                <select v-model="inputPanscale" @change="panScaleChanged">
                    <option v-for="panScale in allPanScalesSorted" v-bind:key="panScale.name" :value="panScale">{{ panScale.name }}</option>
                </select>
                <br /><a :href="playPath">Play in full page</a>
            </div>
        </div>
        <div v-if="displayedHandpan">
            <div class="zone">
                <div class="tabs">
                    <div class="tab" @click="displayMode = 'panScales'" v-bind:class="{ selected: displayMode === 'panScales' }">
                        Models
                    </div>
                    <div class="tab" @click="displayMode = 'scales'" v-bind:class="{ selected: displayMode === 'scales' }">Scales</div>
                    <div class="tab" @click="displayMode = 'chords'" v-bind:class="{ selected: displayMode === 'chords' }">Chords</div>
                    <div class="tab" @click="displayMode = 'songs'" v-bind:class="{ selected: displayMode === 'songs' }">Songs</div>
                </div>
                <div class="tab-content" v-if="displayMode === 'panScales'">
                    <div class="panscales">
                        <div
                            v-for="panScale in displayedPanScales"
                            v-bind:key="panScale.ding + panScale.name"
                            class="panscale"
                            @click="selectPanScale(panScale)"
                            @mouseover="selectPanScale(panScale)"
                            @mouseout="unselectPanScale()"
                            v-bind:class="{
                                highlight: panScale.ding === selectedPanScale.ding && panScale.name === selectedPanScale.name,
                            }"
                        >
                            <span v-if="handpans.length > 1">{{ panScale.ding }}</span> {{ panScale.name }}
                        </div>
                        <div v-if="!displayedPanScales.length">
                            Nothing…
                        </div>
                    </div>
                </div>
                <div class="tab-content" v-if="displayMode === 'scales'">
                    <div class="scales">
                        <div
                            class="scale"
                            v-for="scale in displayedScalesSorted"
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
                        <div v-if="!displayedScales.length">
                            Nothing…
                        </div>
                    </div>
                </div>
                <div class="tab-content" v-if="displayMode === 'chords'">
                    <div v-for="chord in displayedChords" class="chord-type" v-bind:key="chord.type">
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
                <div class="tab-content" v-if="displayMode === 'songs'">
                    Coming soon!
                </div>
            </div>
            <div class="zone">
                Sample bank
                <select v-model="samplesBank">
                    <option v-for="samplesBank in samplesBanks" v-bind:key="samplesBank.name" :value="samplesBank">
                        {{ samplesBank.name }}
                    </option>
                </select>
                <span v-if="samplesBank.website && samplesBank.logo">
                    <a v-if="samplesBank.website" :href="'//' + samplesBank.website"
                        ><img v-if="samplesBank.logo" :src="samplesBank.logo"
                    /></a>
                </span>
                <span v-if="samplesBank.website && !samplesBank.logo">
                    <a v-if="samplesBank.website" :href="'//' + samplesBank.website">{{ samplesBank.website }}</a>
                </span>
            </div>
            <div class="zone handpans">
                <HandpanDiagram
                    v-for="handpan in handpans"
                    v-bind:key="handpan.id"
                    :handpan="handpan"
                    :selectedChord="selectedChord"
                    :selectedPanScale="selectedPanScale"
                    :selectedScale="selectedScale"
                    :samplesBank="samplesBank"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as DATA from '../data'
import sortBy from 'lodash'
import { Chord } from '../models/chord'
import { Handpan } from '../models'
import { genChords, relToAbsSharp, relToAbsFlat, genScales, genPanScales } from '../music'
import { default as HandpanDiagram } from '../components/handpan-diagram.vue'

export default Vue.extend({
    components: {
        HandpanDiagram,
    },
    data() {
        return {
            displayMode: 'panScales',
            displayedHandpanIndex: 0,
            handpans: <Handpan[]>[],
            inputAbsNotation: '',
            inputDing: '',
            inputDingOctave: 3,
            inputPanscale: <any>{},
            inputRelNotation: '',
            notes: <any[]>[],
            abs: '',
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
            displayedScales: <any>[],
            displayedChords: <any>[],
            displayedPanScales: <any>[],
            ignoreNextHashChange: false,
            samplesBank: DATA.samplesBanks[0],
            samplesBanks: DATA.samplesBanks,
        }
    },
    created() {
        setTimeout(() => {
            if (this.$nuxt.$route.hash) {
                this.loadHandpansFromHash()
            } else {
                let handpan = new Handpan()
                handpan.loadFromAbsNotation('D/ A C D E F G A C')
                this.handpans.push(handpan)
                this.genScalesAndChords(handpan)
                this.panChanged()
            }
        }, 1)
    },
    computed: {
        playPath(): string {
            if (this.displayedHandpan) {
                return 'play#' + this.displayedHandpan.absNotationUser.replace(/ /g, '-')
            } else {
                return 'play'
            }
        },
        allPanScalesSorted(): any[] {
            return DATA.panScales.sort((a: any, b: any) => a.name.localeCompare(b.name))
        },
        displayedScalesSorted(): any[] {
            return this.displayedScales.sort((a: any, b: any) => b.totalNotes - a.totalNotes)
        },
        displayedHandpan(): Handpan {
            return this.handpans[this.displayedHandpanIndex]
        },
    },
    watch: {
        $route() {
            if (this.ignoreNextHashChange) {
                this.ignoreNextHashChange = false
                return
            }
            this.handpans = []
            this.loadHandpansFromHash()
        },
    },
    methods: {
        loadHandpansFromHash(): void {
            const panStrings = this.$nuxt.$route.hash.substr(1).split('_')
            let handpan: Handpan
            panStrings.forEach(panString => {
                handpan = new Handpan()
                handpan.loadFromAbsNotation(panString.replace(/-/g, ' '))
                this.handpans.push(handpan)
                this.panChanged()
            })
        },
        removeHandpan(event: Event, index: number): void {
            event.stopPropagation() // On ne veut pas clic sur le tab qui va être supprimé
            this.handpans.splice(index, 1)
            if (this.displayedHandpanIndex >= this.handpans.length) {
                this.selectHandpan(this.handpans.length - 1)
            }
            this.genScalesAndChordsAllPans()
            this.displayHandpan()
            this.updateHash()
        },
        addHandpan(): void {
            const handpan = new Handpan()
            handpan.loadFromAbsNotation('C/ C')
            this.handpans.push(handpan)
            this.selectHandpan(this.handpans.length - 1)
            this.genScalesAndChordsAllPans()
            this.updateHash()
        },
        panScaleChanged(): void {
            this.inputRelNotation = this.inputPanscale.val
            this.relChanged()
        },
        relChanged(): void {
            try {
                this.displayedHandpan.loadFromRelNotation(this.inputDing, this.inputRelNotation, this.inputDingOctave)
                this.panChanged()
                this.updateHash()
            } catch (err) {
                console.error('Cannot load handpan', err)
            }
        },
        absChanged(): void {
            try {
                this.displayedHandpan.loadFromAbsNotation(this.inputAbsNotation)
                this.panChanged()
                this.updateHash()
            } catch (err) {
                console.error('Cannot load handpan', err)
            }
        },
        updateHash(): void {
            const currentHash = this.$nuxt.$route.hash
            const newHash = '#' + this.handpans.map(handpan => handpan.absNotationUser.replace(/ /g, '-')).join('_')
            if (newHash !== currentHash) {
                this.ignoreNextHashChange = true
                this.$nuxt.$router.replace(newHash)
            }
        },
        panChanged(): void {
            this.genScalesAndChords(this.displayedHandpan)
            this.displayHandpan()
            this.genScalesAndChordsAllPans()
        },
        genScalesAndChordsAllPans() {
            const uniqueNotesAllPans = [...new Set(Array.from(this.handpans.flatMap(handpan => handpan.getUniqueNotes())))]
            this.displayedScales = genScales(this.handpans)
            this.displayedPanScales = genPanScales(this.handpans)
            this.displayedChords = genChords(uniqueNotesAllPans)
        },
        genScalesAndChords(handpan: Handpan) {
            // Est-ce encore utile ?
            // handpan.genChords()
            // handpan.genPanScales()
            // handpan.genScales()
        },
        selectHandpan(index: number): void {
            this.displayedHandpanIndex = index
            this.displayHandpan()
        },
        displayHandpan(): void {
            const found = DATA.panScales.find(panScale => {
                return this.displayedHandpan.relNotation.trim() === panScale.val.trim()
            })
            this.inputPanscale = found ? found : null
            this.inputDing = this.displayedHandpan.ding
            this.inputRelNotation = this.displayedHandpan.relNotation
            this.inputAbsNotation = this.displayedHandpan.absNotationUser
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
#app {
    position: relative;
}
.chord-type,
.panscales,
.scales {
    display: flex;
    flex-wrap: wrap;
    margin-top: 4px;
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
.panscale,
.scale {
    margin-top: 4px;
}
.chord.highlight,
.panscale.highlight,
.scale.highlight {
    background: #00ffcc80 !important;
}

.tabs {
    display: flex;
    align-items: center;
}
.tab {
    position: relative;
    width: 150px;
    padding: 8px 0;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    border-bottom: 1px solid #666;
    margin-bottom: -1px;
}
.tab.selected {
    background: white;
    border: 1px solid #666;
    border-bottom: none;
}
.tab:not(.selected):hover {
    color: #0cc;
}
.tab-content {
    background: white;
    border: 1px solid #666;
    min-height: 130px;
    padding: 8px;
}
.zone {
    margin-top: 16px;
}
.handpans {
    display: flex;
    flex-wrap: wrap;
}
.delete {
    position: absolute;
    right: 2px;
    top: 2px;
    cursor: pointer;
    padding: 6px;
    margin-left: 16px;
}
.delete:hover {
    color: red;
}
.config {
    position: absolute;
    right: 0;
    top: 0;
    display: none; /* TODO */
}
.toggle {
    font-size: 32px;
}
</style>
