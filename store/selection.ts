import { Song } from '@/data/songs'

export const state = () => ({
    highlightedNotes: [],
    relativeNoteBase: '',
    showRelative: false,
    selectedSong: null as Song | null,
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
    setSelectedSong(st: any, song: Song | null) {
        st.selectedSong = song
    },
}
