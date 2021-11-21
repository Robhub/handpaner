<template>
    <div>
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
        <div class="song-actions">
            <button v-if="isPlaying" @click.stop="stopSong()">Stop</button>
            <button v-if="selectedSong && selectedSong.recording && !isPlaying" @click.stop="playSong()">Play</button>
            <SelectPlaybackSpeed v-if="isPlaying" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import SelectPlaybackSpeed from '@/components/select-playbackspeed.vue'
import { parseRecord } from '../store/recorder'
import { Song } from '@/data/songs'
export default Vue.extend({
    components: {
        SelectPlaybackSpeed,
    },
    props: {
        displayedSongs: Array,
    },
    data() {
        return {}
    },
    beforeDestroy() {
        this.$store.commit('player/setRecordPlaying', null)
    },
    computed: {
        isPlaying(): boolean {
            return this.$store.state.player.recordPlaying !== null
        },
        uniqueSongs(): string[] {
            return [...new Set(Array.from((this.displayedSongs as Song[]).map(song => song.name)))]
        },
        selectedSong(): Song {
            return this.$store.state.selection.selectedSong
        },
    },
    methods: {
        selectSong(song: Song) {
            if (this.selectedSong !== null && song === this.selectedSong) {
                this.unselectSong()
            } else {
                this.$store.commit('selection/setHighlightedNotes', song.notes)
                this.$store.commit('selection/setSelectedSong', song)
            }
        },
        unselectSong() {
            this.$store.commit('selection/setHighlightedNotes', [])
            this.$store.commit('selection/setSelectedSong', null)
        },
        stopSong(): void {
            this.$store.commit('player/setRecordPlaying', null)
        },
        playSong(): void {
            this.$store.commit('player/setRecordPlaying', parseRecord(this.selectedSong.recording!))
        },
    },
})
</script>

<style scoped></style>
