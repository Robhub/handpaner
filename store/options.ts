import Vue from 'vue'
import * as DATA from '../data'

export const state = () => ({
    handpans: '',
    volume: 1.0,
    enableClac: true,
    chosenSamplesBankIndex: 0,
    samplesBanks: DATA.samplesBanks,
    showBebop: false,
    customPanScales: [],
    hideFooter: false,
    playbackSpeed: 1.0,
    flipHorizontal: false,
    arpeggioMode: 'up',
})

export const getters = {
    getVolume: (st: any) => st.volume,
    getChosenSamplesBankIndex: (st: any) => st.chosenSamplesBankIndex,
}

export const mutations = {
    addCustomPanScale(st: any, customPanScale: any) {
        st.customPanScales.push(customPanScale)
    },
    removeCustomPanScale(st: any, customPanScaleName: string) {
        st.customPanScales = st.customPanScales.filter((customPanScale: any) => customPanScale.name !== customPanScaleName)
    },
    setVolume(st: any, volume: number) {
        Vue.set(st, 'volume', volume)
    },
    setChosenSamplesBankIndex(st: any, samplesBankIndex: any) {
        Vue.set(st, 'chosenSamplesBankIndex', samplesBankIndex)
    },
    enableClac(st: any, enableClac: boolean) {
        Vue.set(st, 'enableClac', enableClac)
    },
    setShowBebop(st: any, showBebop: boolean) {
        Vue.set(st, 'showBebop', showBebop)
    },
    setHideFooter(st: any, hideFooter: boolean) {
        Vue.set(st, 'hideFooter', hideFooter)
    },
    setPlaybackSpeed(st: any, playbackSpeed: number) {
        Vue.set(st, 'playbackSpeed', playbackSpeed)
    },
    setFlipHorizontal(st: any, flipHorizontal: boolean) {
        Vue.set(st, 'flipHorizontal', flipHorizontal)
    },
    setArpeggioMode(st: any, mode: string) {
        Vue.set(st, 'arpeggioMode', mode)
    },
}
