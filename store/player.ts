import Vue from 'vue'

export const state = () => ({
    recordPlaying: null,
})

export const getters = {
    getRecordPlaying: (st: any) => st.recordPlaying,
}

export const mutations = {
    setRecordPlaying(st: any, recordPlaying: any) {
        Vue.set(st, 'recordPlaying', recordPlaying)
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
