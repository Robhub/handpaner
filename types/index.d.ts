export enum SongCategory {
    TRAD = 'trad',
    FOLK = 'folk',
    IRISH = 'irish',
}

export interface Song {
    category?: SongCategory
    name: string
    notes?: string[]
    recording?: string
}
