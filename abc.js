const input = "|:E2BE dEBE|E2BE AFDF|E2BE dEBE|BABc dAFD:|  d2fd c2ec|defg afge|d2fd c2ec|BABc dAFA|  d2fd c2ec|defg afge|afge fdec|BABc dAFD| "


const crocheDuration = 140;
let t = 0
const matches = [...input.matchAll(/[a-gA-G][,]?[2]?/g)].map(m => {
    console.log(m[0])
    let note = m[0][0]
    let octave = 3
    if (note.toLowerCase() === note) {
        octave = 4
    }
    note = note.toUpperCase()
    if (note === 'F') {
        note = 'F♯' // Edor
    }
    if (note === 'C') {
        note = 'C♯' // Edor
    }
    let duration = 1
    if (m[0][1] === '2' || m[0][2] === '2') {
        duration = 2
    }

    const ret = note + octave + '@' + t
    t+= crocheDuration * duration
    return ret
    
    })

console.log(matches.join(',') + ',end@' + t);

// B4@722,end@2256