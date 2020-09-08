export interface Movie {
    id: number,
    title: string,
    imgPath: string,
    type: string,
    rating: number,
    actors?: Actor[]
}

export interface Actor {
    name: string
}

export interface Response {
    ok: boolean,
    data: any
}