import * as DATA from '../data'

export const state = () => ({
    handpans: '',
    volume: 1.0,
    enableClac: true,
    chosenSamplesBankIndex: 0,
    samplesBanks: DATA.samplesBanks,
    showBebop: false,
})

export const getters = {
    getVolume: (st: any) => st.volume,
    getChosenSamplesBankIndex: (st: any) => st.chosenSamplesBankIndex,
}

export const mutations = {
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
