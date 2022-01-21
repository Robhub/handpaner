<template>
    <div>
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
        <div class="actions">
            <SelectArpeggio />
            <button v-if="isPlaying" @click.stop="stopChord()">Stop</button>
            <button v-if="selectedChord && !isPlaying" @click.stop="playChord()">Play</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { HandpanUser } from '@/domain/handpan'
import { relToAbsSharp, relToAbsFlat } from '@/music'
import SelectArpeggio from '@/components/select-arpeggio.vue'
import { ArpeggioMode } from '@/domain/arpeggio'
import { Chord } from '@/data/chords'
export default Vue.extend({
    props: {
        displayedChords: Array,
        handpansUser: Array,
    },
    components: {
        SelectArpeggio,
    },
    computed: {
        isPlaying(): boolean {
            return this.$store.state.player.recordPlaying !== null
        },
        selectedChord: {
            get(): Chord {
                return this.$store.state.selection.selectedChord
            },
            set(chord: Chord) {
                this.$store.commit('selection/setSelectedChord', chord)
            },
        },
        arpeggioMode(): string {
            return this.$store.state.options.arpeggioMode
        },
    },
    watch: {
        arpeggioMode() {
            this.restartChord()
        },
    },
    beforeDestroy() {
        this.$store.commit('player/setRecordPlaying', null)
    },
    methods: {
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
                if (this.isPlaying) {
                    this.restartChord()
                }
            }
        },
        restartChord() {
            this.$store.commit('player/setRecordPlaying', null)
            setTimeout(() => {
                this.playChord()
            }, 1)
        },
        unselectChord() {
            this.$store.commit('player/setRecordPlaying', null)
            this.selectedChord = {
                label: '',
                type: '',
                root: '',
                noteNames: [],
            }
        },
        notesMatchingChord(chord: Chord): string[] {
            return [
                ...new Set(
                    Array.from(
                        (this.handpansUser as HandpanUser[]).flatMap((handpan) =>
                            handpan.handpanModel.notes
                                .filter((note) => chord.noteNames.indexOf(note.noteName) !== -1)
                                .map((note) => note.noteName + note.octave),
                        ),
                    ),
                ),
            ]
        },
        playChord() {
            const notesMatchingChord = this.notesMatchingChord(this.selectedChord)
            const duration = notesMatchingChord.length * 200
            const arpegiatedUp = notesMatchingChord.map((note, i) => ({ time: i * 200, note }))
            let record = {}
            if (this.arpeggioMode === ArpeggioMode.UP) {
                record = {
                    endTime: duration,
                    record: arpegiatedUp,
                }
            } else if (this.arpeggioMode === ArpeggioMode.UPDOWN) {
                const arpegiatedDown = notesMatchingChord
                    .slice(1, -1)
                    .reverse()
                    .map((note, i) => ({ time: duration + i * 200, note }))
                record = {
                    endTime: duration * 2 - 400,
                    record: [...arpegiatedUp, ...arpegiatedDown],
                }
            } else {
                console.error('Unknown arpeggio mode', this.arpeggioMode)
            }
            this.$store.commit('player/setRecordPlaying', record)
        },
        stopChord() {
            this.$store.commit('player/setRecordPlaying', null)
        },
    },
})
</script>

<style scoped>
.chord-type-name {
    min-width: 28px;
    padding-right: 8px;
    text-align: right;
}

.actions {
    display: flex;
    flex-wrap: wrap;
}
.actions * {
    margin: 2px 5px;
}
</style>
