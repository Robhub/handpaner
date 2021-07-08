<template>
    <div class="record">
        <button class="btn-rec" v-if="!isRecording" @click="startListening()">
            <template v-if="isListening">…</template>
            <template v-else>rec</template>
        </button>
        <button class="btn-stop" v-if="isRecording" @click="stopRecord()">stop</button>
        <input v-model="inputRecord" />
        <button v-if="!isPlaying" :disabled="!inputRecord" @click="playRecord()">play</button>
        <button v-if="isPlaying" @click="stopPlayback()">stop</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { stringifyStateRecord, parseRecord } from '../store/recorder'

export default Vue.extend({
    data() {
        return {
            inputRecord: '',
            isPlaying: false,
        }
    },
    computed: {
        isListening() {
            return this.$store.state.recorder.isListening
        },
        isRecording() {
            return this.$store.state.recorder.isRecording
        },
    },
    methods: {
        startListening() {
            this.$store.commit('recorder/startListening')
        },
        stopRecord() {
            this.$store.commit('recorder/stopRecord')
            this.inputRecord = stringifyStateRecord(this.$store.state.recorder)
        },
        playRecord() {
            this.isPlaying = true
            this.$store.commit('player/setRecordPlaying', parseRecord(this.inputRecord))
        },
        stopPlayback() {
            this.isPlaying = false
            this.$store.commit('player/setRecordPlaying', null)
        },
    },
})
</script>

<style scoped>
.record {
    height: 30px;
    display: flex;
    justify-content: center;
    margin: 0 -8px;
}
.record > * {
    margin: 0 8px;
}
button:not(:disabled) {
    cursor: pointer;
}
.btn-rec {
    border: 1px solid red;
    background: #ffcccc;
    width: 30px;
    height: 30px;
    border-radius: 30px;
}
</style>
