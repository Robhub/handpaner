export type PanScale = {
    relativeNotation: string
    name: string
    // absoluteNotation: string
}

// TODO : Générer les versions avec différent nombre de notes automatiquement..
export const allPanScales = [
    { relativeNotation: '1/ 4 5 6m 1 2m 4 5 6m', name: 'Akebono 8+1' }, // = Goon Kali ????
    { relativeNotation: '1/ 5 7m 1 2 3m 4 5', name: 'Amara 7+1' }, // = Celtic minor
    { relativeNotation: '1/ 5 7m 1 2 3m 4 5 7m', name: 'Amara 8+1' }, // = Celtic minor
    { relativeNotation: '1/ 5 6 1 2 3 4 5 1', name: 'Anahata 8+1' },
    { relativeNotation: '1/ 5 7m 1 2 3m 4 5 1', name: 'Amara Triple 8+1' },
    { relativeNotation: '1/ 3 5 7 1 3 T 5 7', name: 'Aegean 8+1' },
    { relativeNotation: '1/ 4 5 6m 7m 1 2m 3m 4', name: 'Aeolian 8+1' },
    { relativeNotation: '1/ 5 6m 7m 1 3m 5 6m 7m', name: 'Arboreal 8+1' },
    { relativeNotation: '1/ (2) (3) 4 5 6 7 1 2 3 (4) 5 6 (7) (1) (2) (3)', name: 'Ashakiran 9+7+1' },
    { relativeNotation: '1/ 3m 4 5 6m 7m 1 3m 4', name: 'Avalon 8+1' },
    { relativeNotation: '1/ 3m 4 5 6m 7m 1 3m 4 5', name: 'Avalon 9+1' },
    { relativeNotation: '1/ 4 6m 7m 7 1 3m 4 6m', name: 'Blues 8+1' },
    { relativeNotation: '1/ 3m 4 7m 1 3m 4 5 7m', name: 'Chao Guo 8+1' },
    { relativeNotation: '1/ 3m 5 7m 1 2 3m 4 5', name: 'DeepShello 8+1' },
    { relativeNotation: '1/ 3m 5 6m 7m 1 2 3m', name: 'Equinox 7+1' },
    { relativeNotation: '1/ 3m 5 6m 7m 1 2 3m 5', name: 'Equinox 8+1' },
    { relativeNotation: '1/ (2) (3m) (4) 5 6m 7 1 2 3m 4 5 (7) 1 (2) (3m)', name: 'Harmonic Lora 9+6+1' },
    { relativeNotation: '1/ 4 5 6m 7m 1 2m 3 4', name: 'Harmonic minor 8+1' },
    { relativeNotation: '1/ 3m 4 5 6m 1 3m 4 5', name: 'High Avalon 8+1' },
    { relativeNotation: '1/ 5 6m 7 1 2 3m 4 5', name: 'Hijaz 8+1' },
    { relativeNotation: '1/ 4 T 6 7m 1 2m 3m 4', name: 'Hijaz (Mercury) 8+1' },
    { relativeNotation: '1/ 4 T 6 7m 1 2m 3m 3', name: 'Hijaz Kar (Mercury) 8+1' },
    { relativeNotation: '1/ 5 6m 7m 1 2m 3 4 5', name: 'Hijaz Major 8+1' },
    { relativeNotation: '1/ 5 6m 1 2 3m 4 5', name: 'Insen 7+1' },
    { relativeNotation: '1/ 5 6m 1 2 3m 4 5 6m', name: 'Insen 8+1' },
    { relativeNotation: '1/ 5 6m 1 2 3m 4 5 1', name: 'Ursa minor 8+1' },
    { relativeNotation: '1/ 5 6m 7m 1 2 3m 5 7m', name: 'Integral (Mercury) 8+1' },
    { relativeNotation: '1/ 5 6m 7m 1 2 3m 5 6m', name: 'Integral (Sam) 8+1' },
    { relativeNotation: '1/ 4 5 6 7m 1 2 3m 4', name: 'Jibuk 8+1' },
    { relativeNotation: '1/ 4 5 6m 1 2 3m 4', name: 'Minor 7+1' }, // Pas de 7m ??
    { relativeNotation: '1/ 4 5 6m 1 2 3m 4 5', name: 'Minor 8+1' }, // Pas de 7m ??
    { relativeNotation: '1/ 5 6m 7m 1 2 3m 4', name: 'Kurd 7+1' }, // = Annaziska
    { relativeNotation: '1/ 5 6m 7m 1 2 3m 4 5', name: 'Kurd 8+1' }, // = Annaziska
    { relativeNotation: '1/ 5 6 7m 1 2 3m 4 5', name: 'Dorian 8+1' },
    { relativeNotation: '1/ (2) (3m) 4 5 6m (7m) 7 1 2 3m 4 5 (6m) 1', name: 'Kamaji 10+1+4' },
    { relativeNotation: '1/ 3m 5 6 7m 1 2 3m', name: 'La Sirena 7+1' },
    { relativeNotation: '1/ 3m 5 6 7m 1 2 3m 5', name: 'La Sirena 8+1' },
    { relativeNotation: '1/ 3m 5 6m 1 2 3m 5', name: 'Low Mystic 7+1' },
    { relativeNotation: '1/ 2 3m 5 7m 1 2 3m 5', name: 'Low Pygmy 8+1' },
    // { absoluteNotation: 'F2/ F3 G G# C D# F G G#', name: 'Low Pygmy Octave 8+1' }, // TODO
    { relativeNotation: '1/ 5 7 1 2 3 T 5 7', name: 'Lydian 8+1' },
    { relativeNotation: '1/ 3m 5 7m 1 2 3m 5', name: 'Magic Voyage 7+1' },
    { relativeNotation: '1/ 3m 5 7m 1 2 3m 5 7m', name: 'Magic Voyage 8+1' },
    { relativeNotation: '1/ 4 5 6 7 1 2 3', name: 'Major 7+1' },
    { relativeNotation: '1/ 4 5 6 7 1 2 3 5', name: 'Major 8+1' }, // = Sabyie
    { relativeNotation: '1/ 3 4 5 7 1 3 4 5', name: 'Melog Selisir 8+1' },
    { relativeNotation: '1/ 5 6m 1 2 3m 4 5 7m', name: 'Mystic (Sam) 8+1' },
    { relativeNotation: '1/ 5 6m 1 2 3m 5 7m', name: 'Mystic (Hagane) 7+1' },
    { relativeNotation: '1/ 5 6 7m 1 2 3 5', name: 'Mixolydian (-4) 7+1' },
    { relativeNotation: '1/ 5 6 7m 1 2 3 5 6', name: 'Mixolydian (-4) 8+1' },
    { relativeNotation: '1/ 5 6 1 2 3 4 5 6', name: 'Mixolydian (-7m) 8+1' },
    { relativeNotation: '1/ 5 6m 1 3 4 5 6m 1', name: 'Onoleo 8+1' },
    { relativeNotation: '1/ 3 4 5 6 1 3 4 5', name: 'Oxalis 8+1' },
    { relativeNotation: '1/ 3 5 7 1 2 3 5', name: 'Paradise (v1) 7+1' },
    { relativeNotation: '1/ 3 4 5 1 2 3 5', name: 'Paradise (v2) 7+1' },
    { relativeNotation: '1/ 4 5 6m 1 3m 4 5 6m', name: 'Pygmy 8+1' },
    { relativeNotation: '1/ 4 5 6 1 2 4 5 6', name: 'Pentatonic Major 8+1' },
    { relativeNotation: '1/ 5 7m 1 3 4 5 7m 1', name: 'Raga Desh 8+1' },
    { relativeNotation: '1/ 4 5 6m 7 1 2 3m 5', name: 'Romanian Hijaz 8+1' },
    { relativeNotation: '1/ 3m 5 6m 7 1 2 3m 5', name: 'Romanian Mineur harmonique 8+1' },
    { relativeNotation: '1/ 5 7 1 2 3 4 5 1', name: 'Ysha Savita 8+1' },
] as PanScale[]
