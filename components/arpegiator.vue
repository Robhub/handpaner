<template>
    <div class="arpegiator">
        <SelectArpeggio />
        <button v-if="isPlaying" @click.stop="stopArpegiator()">Stop</button>
        <button v-if="arpegiatedNotes && arpegiatedNotes.length && !isPlaying" @click.stop="playArpegiator()">Play</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SelectArpeggio from '@/components/select-arpeggio.vue'
import { generateArpeggioRecord, ArpeggioMode } from '@/domain/arpeggio'
export default Vue.extend({
    props: {
        arpegiatedNotes: Array,
    },
    components: {
        SelectArpeggio,
    },
    computed: {
        isPlaying(): boolean {
            return this.$store.state.player.recordPlaying !== null
        },
        arpeggioMode(): ArpeggioMode {
            return this.$store.state.options.arpeggioMode
        },
        recordQueued(): any {
            return this.$store.state.player.recordQueued
        },
    },
    watch: {
        arpeggioMode() {
            if (this.isPlaying) {
                this.restartArpegiator()
            }
        },
        arpegiatedNotes() {
            const record = generateArpeggioRecord(this.arpegiatedNotes as string[], this.arpeggioMode)
            this.$store.commit('player/setRecordQueued', record)
        },
    },
    methods: {
        playArpegiator() {
            const record = generateArpeggioRecord(this.arpegiatedNotes as string[], this.arpeggioMode)
            this.$store.commit('player/setRecordPlaying', record)
        },
        stopArpegiator() {
            this.$store.commit('player/setRecordPlaying', null)
        },
        restartArpegiator() {
            this.$store.commit('player/setRecordPlaying', null)
            setTimeout(() => {
                this.playArpegiator()
            }, 1)
        },
    },
})
</script>

<style scoped>
.arpegiator {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
}
.arpegiator * {
    margin: 2px 5px;
}
</style>
