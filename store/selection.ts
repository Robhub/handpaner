import { HandpanUser } from '@/domain/handpan'
import { Song } from '@/data/songs'

export const state = () => ({
    handpansDefinition: [] as string[],
    handpansUser: [] as HandpanUser[], // Pas bien sérialisé donc reconstruit via handpansDefinition
    highlightedNotes: [],
    relativeNoteBase: '',
    showRelative: false,
    selectedSong: null as Song | null,
})

export const mutations = {
    setHandpansUser(st: any, handpansUser: HandpanUser[]) {
        st.handpansUser = handpansUser
        if (handpansUser.length) {
            st.handpansDefinition = handpansUser.map(handpanUser => handpanUser.handpanModel.getDefinition())
        }
    },
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
    loadFromDefinition(st: any, { id, definition, dingWanted }: any) {
        const found = st.handpansUser.find((handpanUser: HandpanUser) => handpanUser.id === id)
        if (found) {
            found.loadFromDefinition(definition, dingWanted)
        }
        st.handpansDefinition = st.handpansUser.map((handpanUser: HandpanUser) => handpanUser.handpanModel.getDefinition())
    },
}
