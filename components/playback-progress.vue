<template>
    <div>
        <div class="progressbar">
            <div class="loop loop-start" :style="{ left: loopStart + 'px' }"></div>
            <div class="loop loop-end" :style="{ left: loopEnd + 'px' }"></div>
            <div class="progress" :style="{ left: progress + 'px' }"></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RecordParsed } from '@/data/songs'

export default Vue.extend({
    data() {
        return {
            timestampStart: 0,
            progress: 0,
            refreshInterval: null as NodeJS.Timeout | null,
        }
    },
    computed: {
        parsedSong(): RecordParsed {
            return this.$store.state.selection.selectedSongParsed
        },
        loopStart(): number {
            return this.noteToPercentSong(this.$store.state.selection.playbackStart)
        },
        loopEnd(): number {
            return this.noteToPercentSong(this.$store.state.selection.playbackEnd + 1)
        },
        recordPlaying() {
            return this.$store.state.player.recordPlaying
        },
    },
    methods: {
        getNoteTime(noteIndex: number): number {
            return noteIndex < this.parsedSong.record.length ? this.parsedSong.record[noteIndex]?.time : this.parsedSong.endTime
        },
        noteToPercentSong(noteIndex: number): number {
            return this.timeToPercentSong(this.getNoteTime(noteIndex))
        },
        timeToPercentSong(time: number): number {
            return Math.round((time / this.parsedSong.endTime) * 300)
        },
        processElapsed(elapsed: number): void {
            const speedRatio = this.$store.state.options.playbackSpeed
            const loopStart = this.getNoteTime(this.$store.state.selection.playbackStart)
            const loopLength = this.getNoteTime(this.$store.state.selection.playbackEnd + 1) - loopStart
            this.progress = this.timeToPercentSong(loopStart + ((elapsed * speedRatio) % loopLength))
        },
    },
    watch: {
        recordPlaying(recordPlaying) {
            this.timestampStart = new Date().getTime()
        },
    },
    created() {
        this.refreshInterval = setInterval(() => {
            if (this.recordPlaying !== null) {
                this.processElapsed(new Date().getTime() - this.timestampStart)
            }
        }, 50)
    },
    beforeDestroy() {
        clearInterval(this.refreshInterval!)
    },
})
</script>

<style scoped>
.progressbar {
    position: relative;
    width: 300px;
    height: 20px;
    border: 1px solid black;
}
.progress {
    position: absolute;
    background: red;
    height: 20px;
    width: 2px;
}
.loop {
    position: absolute;
    background: gray;
    height: 20px;
    width: 1px;
}
</style>
