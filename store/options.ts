import * as DATA from '../data'

export const state = () => ({
    handpans: '',
    volume: 0.6,
    chosenSamplesBankIndex: 0,
    samplesBanks: DATA.samplesBanks,
})

export const getters = {
    getVolume: (st: any) => st.volume,
    getChosenSamplesBankIndex: (st: any) => st.chosenSamplesBankIndex
}

export const mutations = {
    setVolume(st: any, volume: number) {
        st.volume = volume
    },
    setChosenSamplesBankIndex(st: any, samplesBankIndex: any) {
        st.chosenSamplesBankIndex = samplesBankIndex
    },
}
