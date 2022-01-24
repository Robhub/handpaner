export enum ArpeggioMode {
    UP = 'up',
    UPSTAIRS = 'upstairs',
    DOWN = 'down',
    DOWNSTAIRS = 'downstairs',
    UPDOWN = 'updown',
    UPDOWNSTAIRS = 'updownstairs',
}

export function generateArpeggioRecord(arpegiatedNotesString: string[], arpeggioMode: ArpeggioMode): any {
    let recordNotes = [] as any[]
    let addtime = 0
    if (arpeggioMode === ArpeggioMode.UP) {
        recordNotes = arpegiatedNotesString
    } else if (arpeggioMode === ArpeggioMode.UPSTAIRS) {
        recordNotes = arpegiatedNotesString.flatMap((x, i, t) => (t[i - 1] && t[i + 1] ? [t[i - 1], x, t[i + 1]] : []))
    } else if (arpeggioMode === ArpeggioMode.DOWN) {
        recordNotes = [...arpegiatedNotesString].reverse()
    } else if (arpeggioMode === ArpeggioMode.DOWNSTAIRS) {
        recordNotes = [...arpegiatedNotesString].reverse().flatMap((x, i, t) => (t[i - 1] && t[i + 1] ? [t[i - 1], x, t[i + 1]] : []))
    } else if (arpeggioMode === ArpeggioMode.UPDOWN) {
        const arpegiatedDown = arpegiatedNotesString.slice(1, -1).reverse()
        recordNotes = [...arpegiatedNotesString, ...arpegiatedDown]
    } else if (arpeggioMode === ArpeggioMode.UPDOWNSTAIRS) {
        const arpegiatedDown = [...arpegiatedNotesString].reverse()
        const upstairs = arpegiatedNotesString.flatMap((x, i, t) => (t[i - 1] && t[i + 1] ? [t[i - 1], x, t[i + 1]] : []))
        const downstairs = arpegiatedDown.flatMap((x, i, t) => (t[i - 1] && t[i + 1] ? [t[i - 1], x, t[i + 1]] : []))
        recordNotes = [...upstairs, ...downstairs.slice(1)]
        addtime = 1
    } else {
        console.error('Unknown arpeggio mode', arpeggioMode)
    }

    return {
        endTime: (recordNotes.length + addtime) * 200,
        record: recordNotes.map((note, i) => ({ time: i * 200, note })),
    }
}

// A   B   C   D   E   D   C   B   A
//    ABC BCD CDE DED EDC DCB CBA

// A  B  C  D E       E D C B A
//   ABC BCD CDE      DCB
