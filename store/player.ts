import Vue from 'vue'

export const state = () => ({
    recordPlaying: null,
    recordQueued: null,
})

export const getters = {
    getRecordPlaying: (st: any) => st.recordPlaying,
}

export const mutations = {
    setRecordPlaying(st: any, recordPlaying: any) {
        Vue.set(st, 'recordPlaying', recordPlaying)
    },
    setRecordQueued(st: any, recordQueued: any) {
        Vue.set(st, 'recordQueued', recordQueued)
    },
}

export const actions = {
    restartRecordPlaying({ commit, state }: any) {
        const tmp = state.recordPlaying
        commit('setRecordPlaying', null)
        setTimeout(() => {
            commit('setRecordPlaying', tmp)
        }, 1)
    },
}
