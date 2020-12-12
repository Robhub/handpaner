export enum SongCategory {
    TRAD = 'trad',
    FOLK = 'folk',
    IRISH = 'irish',
}

export type Song = {
    category?: SongCategory
    name: string
    notes?: string[]
    recording?: string
    transpo?: number
}

/*
* Pour les transpositions, la note la plus haute de début des songs semble être G4 (pour l'instant)
* la note de pan la plus basse est E2 donc faut potentiellement faire -27 semitons ?
*/
export default [
    { category: SongCategory.TRAD, name: 'Danse de l’ours', notes: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5'] },
    { category: SongCategory.TRAD, name: 'Levan Polka', notes: ['E4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5'] },
    { category: SongCategory.TRAD, name: 'Zelda', notes: ['E4', 'F4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5'] },
    { category: SongCategory.TRAD, name: 'Las Fatmas', notes: ['E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5'] },
    { category: SongCategory.TRAD, name: 'Jan Mijne Man', notes: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5'] },
    { category: SongCategory.TRAD, name: 'Valse à Ollu', notes: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'] },
    { category: SongCategory.TRAD, name: 'St Patrick An Dro', notes: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'G5'] },
    { category: SongCategory.FOLK, name: 'Greensleeves', notes: ['A3', 'B3', 'C4', 'C♯4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C4'] },
    { category: SongCategory.IRISH, name: 'The Kesh Jig', notes: ['D4', 'F♯4', 'G4', 'A4', 'B4', 'D5', 'E5', 'G5', 'A5', 'B5'] },
    { category: SongCategory.IRISH, name: 'Cooney’s reel', notes: ['D4', 'E4', 'F♯4', 'G4', 'A4', 'B4', 'C♯5', 'D5', 'E5', 'F♯5', 'G5', 'A5']},
    { category: SongCategory.IRISH, name: 'Lannigan’s Ball', notes: ['D4', 'E4', 'F♯4', 'G4', 'A4', 'B4', 'C5', 'C♯5', 'D5', 'E5', 'F♯5', 'G5', 'A5']},
    { category: SongCategory.IRISH, name: 'Father O’Flynn', notes: ['D4', 'F♯4', 'G4', 'A4', 'B4', 'C♯5', 'D5', 'E5', 'F♯5', 'G5', 'A5']},
    { category: SongCategory.IRISH, name: 'Star of the County Down', notes: ['E4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'G5']},
    { category: SongCategory.IRISH, name: 'Drowsy Maggie', notes: ['D4', 'E4', 'F♯4', 'A4', 'B4', 'C♯5', 'D5', 'E5', 'F♯5', 'G5', 'A5']},
    { category: SongCategory.IRISH, name: 'Killavil jig', notes: ['D4', 'E4', 'F♯4', 'A4', 'B4', 'D5', 'E5', 'F♯5', 'G5']},
    { category: SongCategory.IRISH, name: 'Musical priest', notes: ['F♯4', 'A4', 'B4', 'C♯5', 'D5', 'E5', 'F♯5', 'A5', 'B5']},
    { category: SongCategory.IRISH, name: 'Trip to Pakistan', notes: ['D4', 'E4', 'F♯4', 'G4', 'A4', 'B4', 'C5']},
] as Song[]
