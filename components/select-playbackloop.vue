<template>
    <div class="select-speed">
        Loop selection:&nbsp;
        <select v-model="playbackStart">
            <option v-for="playbackPosition in playbackPositions" :key="playbackPosition.value" :value="playbackPosition.value">
                {{ playbackPosition.label }}
            </option>
        </select>
        <select v-model="playbackEnd">
            <option v-for="playbackPosition in playbackPositions" :key="playbackPosition.value" :value="playbackPosition.value">
                {{ playbackPosition.label }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RecordParsed } from '@/data/songs'

export default Vue.extend({
    computed: {
        selectedSongParsed(): RecordParsed {
            return this.$store.state.selection.selectedSongParsed
        },
        recordPlaying() {
            return this.$store.state.player.recordPlaying
        },
        playbackPositions() {
            const positions = []
            for (let i = 0; i < this.selectedSongParsed.record.length; i++) {
                positions.push({ value: i, label: '' + (i + 1) })
            }
            return positions
        },
        playbackStart: {
            get() {
                return this.$store.state.selection.playbackStart
            },
            set(value) {
                this.$store.commit('selection/setPlaybackStart', value)
            },
        },
        playbackEnd: {
            get() {
                return this.$store.state.selection.playbackEnd
            },
            set(value) {
                this.$store.commit('selection/setPlaybackEnd', value)
            },
        },
    },
})
</script>

<style scoped>
.select-speed {
    font-size: 11px;
    display: flex;
    align-items: center;
    height: 30px;
}
</style>
