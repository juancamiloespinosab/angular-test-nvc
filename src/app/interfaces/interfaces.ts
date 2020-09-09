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