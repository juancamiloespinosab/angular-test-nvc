export interface SearchData {
    keywords: string,
    page: number,
    totalPages?: number
}

export interface Movie {
    id: number,
    title: string,
    imgPosterPath: string,
    imgBackdropPath: string,
    type: string,
    rating: number,
    actors?: Actor[]
}

export interface Actor {
    name: string
}

export interface Response {
    ok: boolean,
    data: any | Movie[],
    searchData?: SearchData
}

export interface Detail {
    id: number,
    title: string,
    imgPosterPath: string,
    overview: string,
    seasons: Season[]
}

export interface Season {
    number: number,
    episodes: Episode[]
}

export interface Episode {
    number: number,
    name: string
}