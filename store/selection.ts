export const state = () => ({
    highlightedNotes: [],
    relativeNoteBase: '',
    showRelative: false,
})

export const mutations = {
    setShowRelative(st: any, showRelative: boolean) {
        st.showRelative = showRelative
    },
    setRelativeNoteBase(st: any, relativeNoteBase: string) {
        st.relativeNoteBase = relativeNoteBase
    },
    setHighlightedNotes(st: any, notes: string[]) {
        st.highlightedNotes = notes
    },
}
