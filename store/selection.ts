export const state = () => ({
    highlightedNotes: [],
})

export const mutations = {
    setHighlightedNotes(st: any, notes: string[]) {
        st.highlightedNotes = notes
    },
}
