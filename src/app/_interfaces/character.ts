import { Location } from "./location";

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type?: string;
    gender: string;
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface CharacterResponse {
    info: Info;
    results: Character[];
}

export interface Info {
    count: number;
    next?: string;
    pages: number;
    prev?: string;
}