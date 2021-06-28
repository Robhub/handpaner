export const state = () => ({
    recordPlaying: null,
})

export const getters = {
    getRecordPlaying: (st: any) => st.recordPlaying,
}

export const mutations = {
    setRecordPlaying(st: any, recordPlaying: any) {
        st.recordPlaying = recordPlaying
    },
}
