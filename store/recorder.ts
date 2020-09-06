export function stringifyRecord(st: any): string {
    return st.record.map((evt: any) => evt.note + '@' + evt.time).join(',') + ',end@' + (st.endTime - st.startTime)
}
export function parseRecord(str: string): any {
    const evts = str.split(',').map(evt => evt.split('@'))
    const record = evts
        .filter(evt => evt[0] !== 'end')
        .map(evt => {
            return {
                note: evt[0],
                time: parseInt(evt[1], 10),
            }
        })
    const endTime = parseInt(evts.filter(evt => evt[0] === 'end')[0][1], 10)
    return {
        record,
        endTime,
    }
}

export const state = () => ({
    isRecording: false,
    startTime: 0,
    endTime: 0,
    record: [],
})

export const mutations = {
    newRecord(st: any) {
        st.record = []
        st.isRecording = true
        st.startTime = new Date().getTime()
        st.endTime = 0
    },
    stopRecord(st: any) {
        st.isRecording = false
        st.endTime = new Date().getTime()
        const str = stringifyRecord(st)
    },
    playNote(st: any, note: string) {
        const noteTime = new Date().getTime()
        const relativeTime = noteTime - st.startTime
        st.record.push({ time: relativeTime, note })
    },
}
