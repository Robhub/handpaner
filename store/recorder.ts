import { RecordParsed } from '@/data/songs'

export function stringifyStateRecord(state: any): string {
    return state.record.map((evt: any) => evt.note + '@' + evt.time).join(',') + ',end@' + (state.endTime - state.startTime)
}

export function stringifyRecord(record: any[], endTime: number): string {
    return record.map((evt: any) => evt.note + '@' + evt.time).join(',') + ',end@' + endTime
}

export function parseRecord(str: string): RecordParsed {
    const evts = str.split(',').map((evt) => evt.split('@'))
    const record = evts
        .filter((evt) => evt[0] !== 'end')
        .map((evt) => {
            return {
                note: evt[0],
                time: parseInt(evt[1], 10),
            }
        })
    const endTime = parseInt(evts.filter((evt) => evt[0] === 'end')[0][1], 10)
    return {
        record,
        endTime,
    }
}

export const state = () => ({
    isListening: false,
    isRecording: false,
    startTime: 0,
    endTime: 0,
    record: [],
})

export const mutations = {
    startListening(state: any) {
        state.isListening = true
    },
    newRecord(state: any) {
        state.record = []
        state.isListening = false
        state.isRecording = true
        state.startTime = new Date().getTime()
        state.endTime = 0
    },
    stopRecord(state: any) {
        state.isRecording = false
        state.endTime = new Date().getTime()
    },
    addNote(state: any, note: string) {
        const noteTime = new Date().getTime()
        const relativeTime = noteTime - state.startTime
        state.record.push({ time: relativeTime, note })
    },
}

export const actions = {
    playNote({ commit, state }: any, note: string) {
        if (state.isListening) {
            commit('newRecord')
        }
        if (!state.isRecording) {
            return
        }
        commit('addNote', note)
    },
}
