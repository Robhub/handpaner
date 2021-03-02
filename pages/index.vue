<template>
    <div id="app">
        <div class="tabs" @click="resetSelection()">
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
        <div class="tab-content" @click="resetSelection()">
            <div>
                <div class="form-line">
                    <span>Ding</span>
                    <select v-model="inputDing" @change="relChanged">
                        <option v-for="note in notesAll" v-bind:key="note">{{ note }}</option>
                    </select>
                    <select v-model="inputDingOctave" @change="relChanged">
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <div class="form-line">
                    <span>Model</span>
                    <select v-model="inputPanscale" @change="panScaleChanged">
                        <option v-for="panScale in allPanScalesSorted" v-bind:key="panScale.name" :value="panScale">
                            {{ panScale.name }}
                        </option>
                    </select>
                </div>
                <div class="form-line">
                    <span>Notes</span>
                    <input type="text" v-model="inputAbsNotation" size="30" @keyup="absChanged" placeholder="Ex: C/ D E F G A B C" />
                </div>
                <div class="form-line">
                    <span>Relative</span>
                    <select v-model="relativeNoteBase">
                        <option v-for="note in uniqueNotesAllPans" v-bind:key="note">{{ note }}</option>
                    </select>
                    <label><input type="checkbox" v-model="showRelative" /> show relative</label>
                </div>
                <div class="play-full"><nuxt-link :to="playPath">Play in full page</nuxt-link></div>
            </div>
        </div>
        <div v-if="displayedHandpan">
            <div class="zone" @click="resetSelection()">
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
                            @click.stop="selectPanScale(panScale)"
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
                            @click.stop="selectScale(scale)"
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
                            @click.stop="selectChord(chord, chordd)"
                            v-bind:class="{
                                highlight: chordd.label === selectedChord.label,
                            }"
                            v-html="chordd.label"
                        ></div>
                    </div>
                </div>
                <div class="tab-content" v-if="displayMode === 'songs'">
                    {{ uniqueSongs.length }} different songs.
                    <div class="selectables">
                        <div
                            class="selectable"
                            v-for="song in displayedSongs"
                            :key="song.name + song.transpo"
                            :class="{
                                highlight: selectedSong && song.name === selectedSong.name && song.transpo === selectedSong.transpo,
                            }"
                            @click.stop="selectSong(song)"
                        >
                            <template v-if="song.recording">♫</template>{{ song.name }} ({{ song.transpo }})
                        </div>
                    </div>
                    <button v-if="isPlaying" @click.stop="stopSong()">Stop</button>
                    <button v-if="selectedSong && selectedSong.recording && !isPlaying" @click.stop="playSong()">Play</button>
                </div>
            </div>
            <div class="zone">
                <HandpanDiagrams
                    :handpans="handpans"
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
import { Handpan } from '../models'
import { genSongs, genChords, relToAbsSharp, relToAbsFlat, genScales, genPanScales } from '../music'
import { default as HandpanDiagrams } from '../components/handpan-diagrams.vue'
import { Song } from '@/data/songs'
import { PanScale, allPanScales } from '@/data/panscales'
import { parseRecord } from '../store/recorder'

export default Vue.extend({
    components: {
        HandpanDiagrams,
    },
    data() {
        return {
            displayMode: 'panScales',
            displayedHandpanIndex: 0,
            handpans: <Handpan[]>[],
            inputAbsNotation: '',
            inputDing: '',
            inputDingOctave: '3',
            inputPanscale: <PanScale | null>{},
            inputRelNotation: '',
            notes: <any[]>[],
            abs: '',
            scales: DATA.scales,
            notesAll: DATA.notesAll,
            chords: {},
            selectedPanScale: <any>{},
            selectedScale: <any>{},
            selectedChord: <any>{
                label: '',
                root: '',
                type: '',
                noteNames: <any[]>[],
            },
            selectedChordNoteNames: [],
            displayedScales: <any>[],
            displayedChords: <any>[],
            displayedPanScales: <any>[],
            displayedSongs: <Song[]>[],
            ignoreNextHashChange: false,
            isPlaying: false,
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
                this.panChanged()
            }
        }, 1)
    },
    computed: {
        showRelative: {
            get() {
                return this.$store.state.selection.showRelative
            },
            set(value: boolean) {
                this.$store.commit('selection/setShowRelative', value)
            },
        },
        relativeNoteBase: {
            get() {
                return this.$store.state.selection.relativeNoteBase
            },
            set(value: string) {
                this.$store.commit('selection/setRelativeNoteBase', value)
            },
        },
        selectedSong: {
            get() {
                return this.$store.state.selection.selectedSong
            },
            set(value: string) {
                this.$store.commit('selection/setSelectedSong', value)
            },
        },
        showBebop(): boolean {
            return this.$store.state.options.showBebop
        },
        uniqueSongs(): string[] {
            return [...new Set(Array.from(this.displayedSongs.map(song => song.name)))]
        },
        playPath(): string {
            if (this.displayedHandpan) {
                return 'play/#' + this.displayedHandpan.absNotationUser.replace(/ /g, '-')
            } else {
                return 'play/'
            }
        },
        allPanScalesSorted(): any[] {
            return allPanScales.sort((a: any, b: any) => a.name.localeCompare(b.name))
        },
        displayedScalesSorted(): any[] {
            return this.displayedScales.sort((a: any, b: any) => b.totalNotes - a.totalNotes)
        },
        displayedHandpan(): Handpan {
            return this.handpans[this.displayedHandpanIndex]
        },
        uniqueNotesAllPans(): string[] {
            return [...new Set(Array.from(this.handpans.flatMap(handpan => handpan.getUniqueNotes())))]
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
    mounted() {
        this.$store.commit('selection/setHighlightedNotes', [])
    },
    methods: {
        resetSelection(): void {
            this.unselectPanScale()
            this.unselectScale()
            this.unselectChord()
            this.unselectSong()
        },
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
            if (this.inputPanscale) {
                this.inputRelNotation = this.inputPanscale.relativeNotation
            }
            this.relChanged()
        },
        relChanged(): void {
            try {
                this.displayedHandpan.loadFromRelNotation(this.inputDing, this.inputRelNotation, parseInt(this.inputDingOctave, 10))
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
            let newHash = '#' + this.handpans.map(handpan => handpan.absNotationUser.replace(/ /g, '-')).join('_')
            if (newHash[newHash.length - 1] !== '-') {
                newHash = newHash + '-'
            }
            if (newHash !== currentHash) {
                this.ignoreNextHashChange = true
                this.$nuxt.$router.replace(newHash)
            }
        },
        panChanged(): void {
            this.displayHandpan()
            this.genScalesAndChordsAllPans()
        },
        genScalesAndChordsAllPans() {
            this.displayedScales = genScales(this.handpans, { showBebop: this.showBebop })
            this.displayedPanScales = genPanScales(this.handpans)
            this.displayedChords = genChords(this.uniqueNotesAllPans)
            this.displayedSongs = genSongs(this.handpans)
        },
        selectHandpan(index: number): void {
            this.displayedHandpanIndex = index
            this.displayHandpan()
        },
        displayHandpan(): void {
            const found = allPanScales.find(panScale => {
                return this.displayedHandpan.relNotation.trim() === panScale.relativeNotation.trim()
            })
            this.inputPanscale = found ? found : null
            this.inputDing = this.displayedHandpan.ding
            this.inputRelNotation = this.displayedHandpan.relNotation
            this.inputAbsNotation = this.displayedHandpan.absNotationUser
        },
        selectPanScale(panScale: any) {
            if (panScale.name === this.selectedPanScale.name) {
                this.unselectPanScale()
            } else {
                this.selectedPanScale = panScale
            }
        },
        unselectPanScale() {
            this.selectedPanScale = {}
        },
        selectScale(scale: any) {
            if (scale.id === this.selectedScale.id) {
                this.unselectScale()
            } else {
                this.selectedScale = scale
            }
        },
        unselectScale(): void {
            this.selectedScale = {}
        },
        stopSong(): void {
            this.isPlaying = false
            this.$root.$emit('stopPlayback')
        },
        playSong(): void {
            this.isPlaying = true
            this.$root.$emit('playRecord', parseRecord(this.selectedSong.recording))
        },
        selectSong(song: Song) {
            if (this.selectedSong !== null && song === this.selectedSong) {
                this.unselectSong()
            } else {
                this.$store.commit('selection/setHighlightedNotes', song.notes)
                this.selectedSong = song
            }
        },
        unselectSong() {
            this.$store.commit('selection/setHighlightedNotes', [])
            this.selectedSong = null
        },
        selectChord(chordType: any, chord: any) {
            if (chord.label === this.selectedChord.label) {
                this.unselectChord()
            } else {
                this.selectedChord = {
                    label: chord.label,
                    root: chord.root,
                    type: chordType.type,
                    noteNames: [
                        ...chord.notes.map((n: any) => relToAbsSharp(chord.root, n)),
                        ...chord.notes.map((n: any) => relToAbsFlat(chord.root, n)),
                    ],
                }
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
.selectables,
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
.selectable,
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
.selectable.highlight,
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
.play-options {
    display: flex;
    justify-content: center;
}
.play-options > * {
    margin: 0 8px;
}

.form-line {
    display: flex;
    align-items: center;
    height: 30px;
}
.form-line > span {
    width: 60px;
    padding-right: 10px;
    text-align: right;
}
.form-line select {
    min-width: 50px;
}
.form-line select,
.form-line input[type='text'] {
    height: 100%;
    box-sizing: border-box;
}
.form-line select:not(:first-of-type) {
    margin-left: 5px;
}
.form-line:not(:first-child) {
    margin-top: 5px;
}

.play-full {
    margin-top: 10px;
    text-align: center;
}
</style>
