<template>
    <div>
        HANDPAN SEQUENCER Work In Progress
        <div class="seq" @touchstart="start" @mousedown="start" @touchend="stop" @mouseup="stop" @mousemove="move" @touchmove="touchMove">
            <!-- <div
                class="note-line"
                v-for="(note, i) of playableNotes"
                :key="note"
                :style="{ top: (i / playableNotes.length) * 100 + '%' }"
            ></div> -->
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as DATA from '../data'
let audioctx: any
let clacBuffer: any
let guBuffer: any

function loadSample(path: string, fncb: Function): void {
    const request = new XMLHttpRequest()
    request.open('GET', path)
    request.responseType = 'arraybuffer'
    request.onload = function() {
        let undecodedAudio = request.response
        audioctx.decodeAudioData(undecodedAudio, fncb)
    }
    request.send()
}
if (process.client) {
    audioctx = new AudioContext()
    for (let samplesBank of DATA.samplesBanks) {
        const samplesDispo = samplesBank.samplesDispo
        for (let sampleDispo of samplesDispo) {
            const path = '/' + samplesBank.folder + '/' + sampleDispo.replace('#', 's') + '.flac'
            loadSample(path, (data: any) => (samplesBank.buffer[sampleDispo] = data))
        }
    }
    loadSample('/gu/D2.flac', (data: any) => (guBuffer = data))
    loadSample('/clac/clac.flac', (data: any) => (clacBuffer = data))
}

export default Vue.extend({
    layout: 'empty',
    data() {
        return {
            isPressing: false,
            shouldPlayAtLeastOnce: false,
            playInterval: null as any,
            position: 0,
            playableNotes: [] as string[],
            bpm: 90,
            beats: 4,
            count: 0,
            emptyCount: 0,
        }
    },
    mounted() {
        // this.playableNotes = DATA.samplesDispoShello
        this.playableNotes = ['E2', 'G2', 'A2', 'C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5']
        this.playInterval = setInterval(() => {
            this.count++
            if (this.count % 4 === 0 && this.emptyCount < 16) {
                this.playGu()
            }
            if (this.isPressing || this.shouldPlayAtLeastOnce) {
                this.emptyCount = 0
                this.playNote(this.playableNotes[Math.floor((1 - this.position) * this.playableNotes.length)])
                this.shouldPlayAtLeastOnce = false
            } else {
                this.emptyCount++
            }
        }, 60000 / this.bpm / this.beats)
    },
    destroyed() {
        clearInterval(this.playInterval)
    },
    methods: {
        start(evt: any) {
            this.position = (evt.pageY - evt.target.offsetTop) / evt.target.offsetHeight
            this.isPressing = true
            this.shouldPlayAtLeastOnce = true
        },
        stop() {
            this.isPressing = false
        },
        move(evt: any) {
            this.position = (evt.pageY - evt.target.offsetTop) / evt.target.offsetHeight
        },
        touchMove(evt: any) {
            this.position = (evt.touches[0].pageY - evt.target.offsetTop) / evt.target.offsetHeight
        },
        playNote(note: string) {
            const chosenSamplesBankIndex = this.$store.getters['options/getChosenSamplesBankIndex']
            const noteBuffer: any = DATA.samplesBanks[chosenSamplesBankIndex].buffer[note]
            if (noteBuffer) {
                this.playSample(noteBuffer)
            }
        },
        playGu(): void {
            this.playSample(guBuffer)
        },
        playClac(): void {
            this.playSample(clacBuffer)
        },
        playSample(sampleBuffer: any): void {
            const gainNode = audioctx.createGain()
            gainNode.gain.value = this.$store.getters['options/getVolume']
            const source = audioctx.createBufferSource()
            source.buffer = sampleBuffer
            gainNode.connect(audioctx.destination)
            source.connect(gainNode)
            source.start(0)
        },
    },
})
</script>

<style scoped>
.seq {
    width: 100%;
    height: 600px;
    background: black;
    position: relative;
}
.note-line {
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 2px;
    background: white;
}
</style>
