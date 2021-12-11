import Vue from 'vue'
import { HandpanUser } from '@/domain/handpan'
import { Song } from '@/data/songs'
import { parseRecord } from '@/store/recorder'

export const state = () => ({
    handpansDefinition: [] as string[],
    handpansUser: [] as HandpanUser[], // Pas bien sérialisé donc reconstruit via handpansDefinition
    highlightedNotes: [],
    relativeNoteBase: '',
    showRelative: false,
    selectedSong: null as Song | null,
    selectedSongParsed: null,
    playbackStart: 0,
    playbackEnd: 0,
})

export const mutations = {
    setHandpansUser(st: any, handpansUser: HandpanUser[]) {
        st.handpansUser = handpansUser
        if (handpansUser.length) {
            st.handpansDefinition = handpansUser.map((handpanUser) => handpanUser.handpanModel.getDefinition())
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
        if (song !== null && song.recording) {
            const songParsed = parseRecord(song.recording)
            Vue.set(st, 'selectedSongParsed', songParsed)
            Vue.set(st, 'playbackStart', 0)
            Vue.set(st, 'playbackEnd', songParsed.record.length - 1)
        } else {
            st.selectedSongParsed = null
        }
    },
    loadFromDefinition(st: any, { id, definition, dingWanted }: any) {
        const found = st.handpansUser.find((handpanUser: HandpanUser) => handpanUser.id === id)
        if (found) {
            found.loadFromDefinition(definition, dingWanted)
        }
        st.handpansDefinition = st.handpansUser.map((handpanUser: HandpanUser) => handpanUser.handpanModel.getDefinition())
    },
    setPlaybackStart(st: any, playbackStart: number) {
        Vue.set(st, 'playbackStart', playbackStart)
    },
    setPlaybackEnd(st: any, playbackEnd: number) {
        Vue.set(st, 'playbackEnd', playbackEnd)
    },
}
