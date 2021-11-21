<template>
    <div id="app">
        <div class="tabs" @click="resetSelection()">
            <div
                class="tab"
                v-for="(handpan, index) in handpansUser"
                v-bind:key="handpan.id"
                @click="selectHandpanId(handpan.id)"
                v-bind:class="{ selected: handpan.id === displayedHandpanId }"
            >
                Pan n°{{ index + 1 }}
                <span class="delete" @click="removeHandpanId($event, handpan.id)" v-if="handpansUser.length > 1">×</span>
            </div>
            <div class="tab" @click="addHandpan()">+</div>
        </div>
        <div class="tab-content" @click="resetSelection()">
            <HandpanSelection
                :handpansUser="handpansUser"
                :displayedHandpanId="displayedHandpanId"
                @selectionChanged="onSelectionChanged"
            />
        </div>
        <div v-if="displayedHandpanId">
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
                            v-bind:key="panScale.name"
                            class="panscale"
                            @click.stop="selectPanScale(panScale)"
                            v-bind:class="{
                                highlight: selectedPanScale && panScale.name === selectedPanScale.name,
                            }"
                        >
                            {{ panScale.name }}
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
                    <Songs :displayedSongs="displayedSongs" />
                </div>
            </div>
            <div class="zone">
                <HandpanDiagrams
                    :handpans="handpansUser"
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
import { genSongs, genChords, relToAbsSharp, relToAbsFlat, genScales, genPanScales } from '../music'
import HandpanDiagrams from '@/components/handpan-diagrams.vue'
import Songs from '@/components/songs.vue'
import { Song } from '@/data/songs'
import { ALL_PANSCALES_TRANSPOSED_WITH_CUSTOM, HandpanUser } from '@/domain/handpan'
import HandpanSelection from '../components/handpan-selection.vue'

export default Vue.extend({
    components: {
        HandpanDiagrams,
        HandpanSelection,
        Songs,
    },
    data() {
        return {
            displayMode: 'panScales',
            displayedHandpanId: '',
            notes: <any[]>[],
            abs: '',

            scales: DATA.scales,
            notesAll: DATA.notesAll,
            chords: {},
            selectedPanScale: <any>null,
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

            isLoaded: false,
        }
    },
    created() {
        this.handpansUser = []
        setTimeout(() => {
            this.isLoaded = true
            const handpansDefinition = this.$store.state.selection.handpansDefinition
            if (this.$nuxt.$route.hash) {
                this.loadHandpansFromHash()
            } else if (handpansDefinition && handpansDefinition.length) {
                this.loadHandpansFromDefinitions(handpansDefinition)
                this.updateHash()
            } else {
                this.handpansUser = [...this.handpansUser, new HandpanUser('D/ A C D E F G A C')]
                this.displayedHandpanId = this.handpansUser[0].id
                this.genScalesAndChordsAllPans()
            }
        }, 1)
    },
    computed: {
        handpansUser: {
            get(): HandpanUser[] {
                return this.$store.state.selection.handpansUser
            },
            set(value: HandpanUser[]) {
                this.$store.commit('selection/setHandpansUser', value)
            },
        },

        showBebop(): boolean {
            return this.$store.state.options.showBebop
        },

        displayedScalesSorted(): any[] {
            return this.displayedScales.sort((a: any, b: any) => b.totalNotes - a.totalNotes)
        },
        uniqueNotesAllPans(): string[] {
            return [...new Set(Array.from(this.handpansUser.flatMap(handpanUser => handpanUser.handpanModel.getUniqueNotesNames())))]
        },
    },
    watch: {
        $route() {
            if (this.ignoreNextHashChange) {
                this.ignoreNextHashChange = false
                return
            }
            this.handpansUser = []
            this.loadHandpansFromHash()
        },
    },
    mounted() {
        this.$store.commit('selection/setHighlightedNotes', [])
    },
    methods: {
        onSelectionChanged(): void {
            this.$store.commit('player/setRecordPlaying', null)
            this.genScalesAndChordsAllPans()
            this.updateHash()
        },
        resetSelection(): void {
            this.unselectPanScale()
            this.unselectScale()
            this.unselectChord()
            this.unselectSong()
        },
        unselectSong() {
            this.$store.commit('selection/setHighlightedNotes', [])
            this.$store.commit('selection/setSelectedSong', null)
        },
        loadHandpansFromHash(): void {
            const panStrings = this.$nuxt.$route.hash.substr(1).split('_')
            this.loadHandpansFromDefinitions(panStrings.map(str => str.replace(/-/g, ' ')))
        },
        loadHandpansFromDefinitions(definitions: string[]): void {
            this.handpansUser = []
            definitions.forEach(definition => {
                this.handpansUser = [...this.handpansUser, new HandpanUser(definition)]
            })
            this.displayedHandpanId = this.handpansUser[0].id
            this.genScalesAndChordsAllPans()
        },
        removeHandpanId(event: Event, id: string): void {
            event.stopPropagation()
            this.handpansUser = this.handpansUser.filter(handpanUser => handpanUser.id !== id)
            if (id === this.displayedHandpanId) {
                this.displayedHandpanId = this.handpansUser[0].id
            }
            this.genScalesAndChordsAllPans()
            this.updateHash()
        },
        addHandpan(): void {
            const newHandpan = new HandpanUser('C/ C')
            this.handpansUser = [...this.handpansUser, newHandpan]
            this.displayedHandpanId = newHandpan.id
            this.genScalesAndChordsAllPans()
            this.updateHash()
        },
        updateHash(): void {
            const currentHash = this.$nuxt.$route.hash
            let newHash = '#' + this.handpansUser.map(handpan => handpan.handpanModel.getDefinition().replace(/ /g, '-')).join('_')
            if (newHash[newHash.length - 1] !== '-') {
                newHash = newHash + '-'
            }
            if (newHash !== currentHash) {
                this.ignoreNextHashChange = true
                this.$nuxt.$router.replace(newHash)
            }
        },
        genScalesAndChordsAllPans() {
            this.displayedScales = genScales(this.handpansUser, { showBebop: this.showBebop })
            const allScales = ALL_PANSCALES_TRANSPOSED_WITH_CUSTOM(this.$store.state.options.customPanScales)
            this.displayedPanScales = genPanScales(allScales, this.handpansUser)
            this.displayedChords = genChords(this.uniqueNotesAllPans)
            this.displayedSongs = genSongs(this.handpansUser)
        },
        selectHandpanId(id: string): void {
            this.displayedHandpanId = id
        },
        selectPanScale(panScale: any) {
            if (panScale.name === this.selectedPanScale?.name) {
                this.unselectPanScale()
            } else {
                this.selectedPanScale = panScale
            }
        },
        unselectPanScale() {
            this.selectedPanScale = null
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
/deep/ .selectables,
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
/deep/ .selectable,
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
/deep/ .selectable.highlight,
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
.play-full {
    margin-top: 10px;
    text-align: center;
}
.song-actions {
    display: flex;
}
.song-actions * {
    margin: 2px 5px;
}
</style>
