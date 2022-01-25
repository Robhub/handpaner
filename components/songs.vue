<template>
    <div>
        {{ uniqueSongs.length }} different songs.
        <div class="categories">
            <div
                v-for="cat of SongCategory"
                :key="cat"
                class="category"
                v-bind:class="{
                    active: cat === selectedSongCategory,
                }"
                @click="selectSongCategory(cat)"
            >
                {{ cat }}
            </div>
        </div>
        <div class="selectables">
            <div
                class="selectable"
                v-for="song in displayedSongsSorted"
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
            <template v-if="selectedSong">
                <SelectPlaybackSpeed />
                <SelectPlaybackLoop />
                <PlaybackProgress />
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import SelectPlaybackSpeed from '@/components/select-playbackspeed.vue'
import SelectPlaybackLoop from '@/components/select-playbackloop.vue'
import PlaybackProgress from '@/components/playback-progress.vue'
import { Song, SongCategory } from '@/data/songs'
export default Vue.extend({
    components: {
        SelectPlaybackSpeed,
        SelectPlaybackLoop,
        PlaybackProgress,
    },
    props: {
        displayedSongs: Array,
    },
    data() {
        return {
            SongCategory,
        }
    },
    beforeDestroy() {
        this.$store.commit('player/setRecordPlaying', null)
    },
    computed: {
        selectedSongCategory: {
            get(): any {
                return this.$store.state.selection.selectedSongCategory
            },
            set(value: any) {
                this.$store.commit('selection/setSelectedSongCategory', value)
            },
        },
        displayedSongsSorted(): Song[] {
            return (this.displayedSongs as Song[])
                .filter((song) => song.category === this.selectedSongCategory || this.selectedSongCategory === null)
                .sort((a: Song, b: Song) => a.name.localeCompare(b.name))
        },
        isPlaying(): boolean {
            return this.$store.state.player.recordPlaying !== null
        },
        uniqueSongs(): string[] {
            return [...new Set(Array.from((this.displayedSongs as Song[]).map((song) => song.name)))]
        },
        selectedSong(): Song {
            return this.$store.state.selection.selectedSong
        },
        progress() {
            return new Date().getTime()
        },
    },
    methods: {
        progressm() {
            return new Date().getTime()
        },
        selectSongCategory(songCategory: SongCategory) {
            if (songCategory === this.selectedSongCategory) {
                this.selectedSongCategory = null
            } else {
                this.unselectSong()
                this.selectedSongCategory = songCategory
            }
        },
        selectSong(song: Song) {
            this.$store.commit('player/setRecordPlaying', null)
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
            this.$store.commit('player/setRecordPlaying', this.$store.state.selection.selectedSongParsed)
        },
    },
})
</script>

<style scoped>
.song-actions {
    margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
}
.song-actions * {
    margin: 2px 5px;
}
.categories {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
}
.category {
    border: 1px solid #333;
    border-radius: 3px;
    padding: 2px 10px;
    cursor: pointer;
    min-width: 42px;
    text-align: center;
    margin-left: 8px;
}
.category:not(.active):hover {
    border-color: black;
    color: #0cc;
}
.category.active {
    background: #00ffcc80;
}
</style>
