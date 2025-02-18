export interface PartialFilm{
    id: number;
    title: string;
    releaseYear: number;
    description: string;
    score?: number
}

export interface PartialFilmForActor{
    id: number;
    title: string;
    releaseYear: number;
}

export interface PartialActor{
    id: number
    fullName: string
}

export interface Genre{
    id: number
    name: string
}

export interface Language{
    id: number
    name: string
}

export interface Film{
    id: number,
    title: string,
    description: string,
    releaseYear: number,
    language: Language,
    movieLength: number,
    rating: string,
    cast: [PartialActor],
    genre: [Genre],
    score: number,
    rentalRate: number,
    rentalDuration: number,
    rental: string
}

export interface Actor{
    id: number,
    firstName: string,
    lastName: string,
    fullName: string,
    films: PartialFilmForActor[]
}

export type ActorData = Pick<Actor, "firstName" | "lastName" | "films">
export type ActorSubmission = Pick<Actor, "firstName" | "lastName"> & {
    films: Film["id"][]
}

export type FilmData = Pick<Film, "title"| "description"| "releaseYear"| "language"| "movieLength"| "rating"| "cast"| "genre"| "score"| "rentalRate"| "rentalDuration">
export type FilmSubmission = Pick<Film, "title" | "description" | "releaseYear" | "rating" | "movieLength" | "score" | "rentalRate" | "rentalDuration"> & {
    language: number;  
    actors: number[]; 
    genre: number[];
};
