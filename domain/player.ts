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

// this.$store.getters['options/getVolume']
export function playSample(sampleBuffer: any, volume: number): void {
    const gainNode = audioctx.createGain()
    gainNode.gain.value = volume
    const source = audioctx.createBufferSource()
    source.buffer = sampleBuffer
    gainNode.connect(audioctx.destination)
    source.connect(gainNode)
    source.start(0)
}

export function playGu(volume: number): void {
    playSample(guBuffer, volume)
}

export function playClac(volume: number): void {
    playSample(clacBuffer, volume)
}
