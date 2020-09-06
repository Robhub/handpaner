<template>
    <div class="record">
        <button v-if="!isRecording" @click="startRecord()">rec</button>
        <button v-if="isRecording" @click="stopRecord()">stop</button>
        <input v-model="inputRecord" />
        <button v-if="!isPlaying" :disabled="!inputRecord" @click="playRecord()">play</button>
        <button v-if="isPlaying" @click="stopPlayback()">stop</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { stringifyRecord, parseRecord } from '../store/recorder'

export default Vue.extend({
    data() {
        return {
            inputRecord: '',
            isPlaying: false,
        }
    },
    computed: {
        isRecording() {
            return this.$store.state.recorder.isRecording
        },
    },
    methods: {
        startRecord() {
            this.$store.commit('recorder/newRecord')
        },
        stopRecord() {
            this.$store.commit('recorder/stopRecord')
            this.inputRecord = stringifyRecord(this.$store.state.recorder)
        },
        playRecord() {
            this.isPlaying = true
            this.$root.$emit('playRecord', parseRecord(this.inputRecord))
        },
        stopPlayback() {
            this.isPlaying = false
            this.$root.$emit('stopPlayback')
        }
    },
})
</script>

<style scoped>
.record {
    text-align: center;
}
</style>
