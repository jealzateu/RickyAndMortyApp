import { Info } from "./character";

export interface Location {
    name: string;
    url: string;
}

export interface LocationSingleResponse {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
}

export interface LocationResponse {
    info: Info;
    results: LocationSingleResponse[];
}
