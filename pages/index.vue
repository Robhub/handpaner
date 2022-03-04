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
            <div class="tab" @click="addHandpan()">+ add pan</div>
        </div>
        <div class="tab-content" @click="resetSelection()">
            <HandpanSelection
                :handpansUser="handpansUser"
                :displayedHandpanId="displayedHandpanId"
                @selectionChanged="onSelectionChanged"
            />
        </div>
        <div v-if="displayedHandpanId">
            <div class="zone">
                <div class="tabs" @click="resetSelection()">
                    <div class="tab" @click="displayMode = 'panScales'" v-bind:class="{ selected: displayMode === 'panScales' }">
                        Models
                    </div>
                    <div class="tab" @click="displayMode = 'scales'" v-bind:class="{ selected: displayMode === 'scales' }">Scales</div>
                    <div class="tab" @click="displayMode = 'chords'" v-bind:class="{ selected: displayMode === 'chords' }">Chords</div>
                    <div class="tab" @click="displayMode = 'songs'" v-bind:class="{ selected: displayMode === 'songs' }">Songs</div>
                </div>
                <div class="tab-content" v-if="displayMode === 'panScales'">
                    <PanScales :displayedPanScales="displayedPanScales" />
                </div>
                <div class="tab-content" v-if="displayMode === 'scales'">
                    <Scales :displayedScales="displayedScales" :handpansUser="handpansUser" />
                </div>
                <div class="tab-content" v-if="displayMode === 'chords'">
                    <Chords :displayedChords="displayedChords" :handpansUser="handpansUser" />
                </div>
                <div class="tab-content" v-if="displayMode === 'songs'">
                    <Songs :displayedSongs="displayedSongs" />
                </div>
            </div>
            <div class="zone">
                <HandpanDiagrams :handpans="handpansUser" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Capacitor } from '@capacitor/core'
import { genSongs, genChords, genScales, genPanScales } from '../music'
import HandpanDiagrams from '@/components/handpan-diagrams.vue'
import Songs from '@/components/songs.vue'
import Chords from '@/components/chords.vue'
import PanScales from '@/components/panscales.vue'
import Scales from '@/components/scales.vue'
import { Song } from '@/data/songs'
import { ALL_PANSCALES_TRANSPOSED_WITH_CUSTOM, HandpanUser } from '@/domain/handpan'
import HandpanSelection from '../components/handpan-selection.vue'

export default Vue.extend({
    components: {
        HandpanDiagrams,
        HandpanSelection,
        Songs,
        Chords,
        Scales,
        PanScales,
    },
    data() {
        return {
            displayMode: 'panScales',
            displayedHandpanId: '',
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
        uniqueNotesAllPans(): string[] {
            return [...new Set(Array.from(this.handpansUser.flatMap((handpanUser) => handpanUser.handpanModel.getUniqueNotesNames())))]
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
        if (Capacitor.getPlatform() === 'web') {
            axios.get('http://melojam.com/handpaner/')
        }
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
        unselectPanScale() {
            this.$store.commit('selection/setSelectedPanScale', null)
        },
        unselectScale() {
            this.$store.commit('selection/setSelectedScale', {})
        },
        unselectChord() {
            this.$store.commit('selection/setSelectedChord', {})
        },
        unselectSong() {
            this.$store.commit('selection/setHighlightedNotes', [])
            this.$store.commit('selection/setSelectedSong', null)
        },
        loadHandpansFromHash(): void {
            const panStrings = this.$nuxt.$route.hash.substr(1).split('_').filter(Boolean)
            this.loadHandpansFromDefinitions(panStrings.map((str) => str.replace(/-/g, ' ')))
        },
        loadHandpansFromDefinitions(definitions: string[]): void {
            this.handpansUser = []
            if (definitions.length > 0) {
                definitions.forEach((definition) => {
                    this.handpansUser = [...this.handpansUser, new HandpanUser(definition)]
                })
            } else {
                this.handpansUser = [new HandpanUser('D/ A C D E F G A C')]
            }
            this.displayedHandpanId = this.handpansUser[0].id
            this.genScalesAndChordsAllPans()
        },
        removeHandpanId(event: Event, id: string): void {
            event.stopPropagation()
            this.handpansUser = this.handpansUser.filter((handpanUser) => handpanUser.id !== id)
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
            let newHash = '#' + this.handpansUser.map((handpan) => handpan.handpanModel.getDefinition().replace(/ /g, '-')).join('_')
            if (newHash[newHash.length - 1] !== '_') {
                newHash = newHash + '_'
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
    },
})
</script>

<style scoped>
/deep/ .selectables,
/deep/ .panscales,
/deep/ .scales {
    display: flex;
    flex-wrap: wrap;
    margin-top: 4px;
}

/deep/ .selectable,
/deep/ .chord,
/deep/ .panscale,
/deep/.scale {
    border: 1px solid #333;
    border-radius: 3px;
    padding: 0 5px;
    cursor: pointer;
    min-width: 32px;
    text-align: center;
    margin-left: 4px;
}
/deep/ .panscale,
/deep/ .scale {
    margin-top: 4px;
}
/deep/ .selectable.highlight,
/deep/ .chord.highlight,
/deep/ .panscale.highlight,
/deep/ .scale.highlight {
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
</style>
