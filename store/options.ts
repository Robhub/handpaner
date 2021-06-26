import * as DATA from '../data'

export const state = () => ({
    handpans: '',
    volume: 1.0,
    enableClac: true,
    chosenSamplesBankIndex: 0,
    samplesBanks: DATA.samplesBanks,
    showBebop: false,
    customPanScales: [],
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
        st.volume = volume
    },
    setChosenSamplesBankIndex(st: any, samplesBankIndex: any) {
        st.chosenSamplesBankIndex = samplesBankIndex
    },
    enableClac(st: any, enableClac: boolean) {
        st.enableClac = enableClac
    },
    setShowBebop(st: any, showBebop: boolean) {
        st.showBebop = showBebop
    },
}
