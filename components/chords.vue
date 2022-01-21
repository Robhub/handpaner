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
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { relToAbsSharp, relToAbsFlat } from '../music'
import { Chord } from '../data/chords'
export default Vue.extend({
    props: {
        displayedChords: Array,
    },
    computed: {
        selectedChord: {
            get(): Chord {
                return this.$store.state.selection.selectedChord
            },
            set(chord: Chord) {
                this.$store.commit('selection/setSelectedChord', chord)
            },
        },
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
.chord-type-name {
    min-width: 28px;
    padding-right: 8px;
    text-align: right;
}
</style>
