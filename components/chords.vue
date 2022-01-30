<template>
    <div class="zone-chords">
        <div v-for="chord in displayedChords" class="chord-type" v-bind:key="chord.type">
            <div class="chord-type-name">{{ chord.type }}</div>
            <div class="chord-list">
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
        <div class="actions">
            <Arpegiator v-if="selectedChord.noteNames" :arpegiatedNotes="notesMatchingChord" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { HandpanUser } from '@/domain/handpan'
import { relToAbsSharp, relToAbsFlat, sortHandpanNotes, uniqueHandpanNotesAsString } from '@/music'
import Arpegiator from '@/components/arpegiator.vue'
import { Chord } from '@/data/chords'
export default Vue.extend({
    props: {
        displayedChords: Array,
        handpansUser: Array,
    },
    components: {
        Arpegiator,
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
        notesMatchingChord(): string[] {
            const notesInChord = (this.handpansUser as HandpanUser[]).flatMap((handpan) =>
                handpan.handpanModel.notes.filter((note) => this.selectedChord.noteNames.indexOf(note.noteName) !== -1),
            )
            return uniqueHandpanNotesAsString(sortHandpanNotes(notesInChord))
        },
    },
    beforeDestroy() {
        this.$store.commit('player/setRecordPlaying', null)
        this.unselectChord()
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
                    // this.restartChord() // TODO
                }
            }
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
    },
})
</script>

<style scoped>
.chord-type {
    display: flex;
    align-items: center;
    padding: 2px 8px;
}
.chord-type:first-child {
    padding-top: 8px;
}
.chord-type:nth-child(even) {
    background: #f8f8f8;
}
.chord {
    margin: 1px;
    background: white;
}
.chord-type-name {
    min-width: 28px;
    padding-right: 8px;
    text-align: right;
}
.chord-list {
    display: flex;
    flex-wrap: wrap;
}
.actions {
    padding: 8px;
}
</style>
