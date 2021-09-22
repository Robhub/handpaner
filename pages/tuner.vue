<template>
    <div>
        <canvas ref="visu" style="position:relative" @click="paused = !paused"></canvas>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { splitNoteNameAndOctave } from '@/music'
import { notesSharp } from '@/data'

export default Vue.extend({
    layout: 'empty',
    head() {
        return {
            meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0' }],
        }
    },
    data() {
        return {
            paused: true,
            tick: 0,
            analyser: null as any,
            data: null as any,
            freqTarget: 440,
            freqMin: 200,
            freqMax: 1200,
            val2color: [] as string[],
            canvasWidth: 3840,
            visuWidth: 1920,
            visuHeight: 1080,
        }
    },
    computed: {
        freqRange(): number {
            return this.freqMax - this.freqMin
        },
        canvasContext(): any {
            const canvasElt = this.$refs.visu as any
            return canvasElt.getContext('2d')
        },
    },

    mounted() {
        const hash = this.$nuxt.$route.hash.substr(1)
        const note = splitNoteNameAndOctave(hash, 3)
        const noteIndex = note.octave! * 12 + notesSharp.indexOf(note.noteName)
        this.freqTarget = this.noteBaseToFreq(noteIndex)
        console.log('freq target', this.freqTarget)
        const canvasElt = this.$refs.visu as any
        this.visuWidth = document.body.clientWidth
        this.visuHeight = window.innerHeight
        canvasElt.width = this.visuWidth * 2
        canvasElt.height = this.visuHeight
        this.val2color = this.genColors([
            [0, 0, 0],
            [0, 0, 255],
            [0, 255, 255],
            [0, 255, 0],
            [255, 255, 0],
            [255, 128, 0],
            [255, 0, 0],
            [255, 0, 255],
            [255, 255, 255],
        ])

        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            let ctx = new AudioContext()
            let mic = ctx.createMediaStreamSource(stream)
            this.analyser = ctx.createAnalyser()
            // analyser.fftSize = 1024;
            // analyser.fftSize = 2048
            // analyser.fftSize = 4096;
            this.analyser.fftSize = 8192
            // analyser.fftSize = 16384
            this.data = new Uint8Array(this.analyser.frequencyBinCount)
            mic.connect(this.analyser)
            this.canvasContext.fillStyle = '#000000'
            this.canvasContext.fillRect(0, 0, canvasElt.width, canvasElt.height)
            this.processAudio()
        })
    },
    methods: {
        noteBaseToFreq(n: number) {
            return 440 * Math.pow(2, (n - 57) / 12)
        },
        processAudio(): void {
            const canvasElt = this.$refs.visu as any
            requestAnimationFrame(this.processAudio) // Mettre au début ou à la fin ?
            if (this.paused) {
                return
            }
            this.analyser.getByteFrequencyData(this.data) // Résultat de FFT
            // analyser.getByteTimeDomainData(this.data) // Forme d'onde brute

            // this.drawSpectre()
            this.drawTarget()
            this.drawPeaks()

            this.tick += 3
            // const visuWidth = document.body.clientWidth
            canvasElt.style.left = '-' + (this.tick % this.visuWidth) + 'px'
        },
        drawPeaks(): void {
            const canvasContext = this.canvasContext
            const x1 = this.tick % this.visuWidth
            const x2 = (this.tick % this.visuWidth) + this.visuWidth
            const bins = this.analyser.frequencyBinCount
            const mul = 48000 / this.analyser.fftSize
            this.canvasContext.fillStyle = '#000'
            canvasContext.fillRect(x1, 0, 3, this.visuHeight)
            canvasContext.fillRect(x2, 0, 3, this.visuHeight)
            this.canvasContext.fillStyle = '#fff'
            for (let b = 1; b < bins - 1; b++) {
                const binPrev = this.data[b - 1]
                const bin = this.data[b]
                const binNext = this.data[b + 1]
                if (bin > binPrev && bin > binNext && bin > 150) {
                    const quadra = this.interQuadratic(binPrev, bin, binNext)
                    const freq = (b + quadra) * mul

                    const y = this.freqToYPosition(freq)
                    // canvasContext.fillStyle = this.val2color[bin]
                    canvasContext.fillRect(x1, y, 3, 1)
                    canvasContext.fillRect(x2, y, 3, 1)
                }
            }
        },
        interQuadratic(l: number, m: number, r: number) {
            return (l - r) / (2 * (l - 2 * m + r))
        },
        freqToYPosition(freq: number): number {
            return this.visuHeight - ((freq - this.freqMin) / this.freqRange) * this.visuHeight
        },
        drawTarget(): void {
            this.canvasContext.fillStyle = '#333'
            this.canvasContext.fillRect(0, this.freqToYPosition(this.freqTarget), this.canvasWidth, 1)
            this.canvasContext.fillRect(0, this.freqToYPosition(this.freqTarget * 2), this.canvasWidth, 1)
            this.canvasContext.fillRect(0, this.freqToYPosition(this.freqTarget * 3), this.canvasWidth, 1)
        },
        drawSpectre(): void {
            const x1 = this.tick % this.visuWidth
            const x2 = (this.tick % this.visuWidth) + this.visuWidth
            const canvasContext = this.canvasContext
            const bins = this.analyser.frequencyBinCount

            for (let y = 0; y < this.visuHeight; y++) {
                const freq = this.freqMin + (y / this.visuHeight) * this.freqRange
                const binpos = (freq * bins) / 22050
                const vala = this.data[Math.floor(binpos)]
                const valb = this.data[Math.ceil(binpos)]
                const ratio = binpos - Math.floor(binpos)
                const val = Math.round(vala * (1 - ratio) + valb * ratio)
                canvasContext.fillStyle = this.val2color[val]
                canvasContext.fillRect(x1, this.visuHeight - y, 3, 1)
                canvasContext.fillRect(x2, this.visuHeight - y, 3, 1)
            }
        },
        genColors(colors: any): string[] {
            const ret = []
            for (let i = 0; i < 256; i++) {
                const pos = (i / 256) * (colors.length - 1)
                const cola = colors[Math.floor(pos)]
                const colb = colors[Math.ceil(pos)]
                const ratio = pos - Math.floor(pos)
                const r = cola[0] * (1 - ratio) + colb[0] * ratio
                const g = cola[1] * (1 - ratio) + colb[1] * ratio
                const b = cola[2] * (1 - ratio) + colb[2] * ratio
                ret[i] = 'rgb(' + r + ',' + g + ',' + b + ')'
            }
            return ret
        },
    },
})
</script>

<style>
body {
    overflow: hidden;
}
</style>
<style scoped>
div {
    overflow: hidden;
}
</style>
