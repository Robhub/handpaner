export enum ArpeggioMode {
    UP = 'up',
    UPDOWN = 'updown',
    DOWN = 'down',
}

export function generateArpeggioRecord(arpegiatedNotesString: string[], arpeggioMode: ArpeggioMode): any {
    const duration = arpegiatedNotesString.length * 200
    const arpegiatedUp = arpegiatedNotesString.map((note, i) => ({ time: i * 200, note }))
    const arpegiatedDown = [...arpegiatedNotesString].reverse().map((note, i) => ({ time: i * 200, note }))
    let record = {}
    if (arpeggioMode === ArpeggioMode.UP) {
        record = {
            endTime: duration,
            record: arpegiatedUp,
        }
    } else if (arpeggioMode === ArpeggioMode.DOWN) {
        record = {
            endTime: duration,
            record: arpegiatedDown,
        }
    } else if (arpeggioMode === ArpeggioMode.UPDOWN) {
        const arpegiatedDown = arpegiatedNotesString
            .slice(1, -1)
            .reverse()
            .map((note, i) => ({ time: duration + i * 200, note }))
        record = {
            endTime: duration * 2 - 400,
            record: [...arpegiatedUp, ...arpegiatedDown],
        }
    } else {
        console.error('Unknown arpeggio mode', arpeggioMode)
    }
    return record
}
