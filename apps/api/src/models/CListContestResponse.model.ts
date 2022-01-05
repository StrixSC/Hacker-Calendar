export interface Meta {
    limit: string;
    next: string;
    offset: string;
    previous: string;
    total_count: string;
}

export interface Contest {
    id: number;
    resource: string;
    resource_id: number;
    host: string;
    event: string;
    start: string;
    end: string;
    parsed_at: string;
    duration: string;
    href: string;
    problems: string;
}

export interface CListContestsResponse {
    meta: Meta;
    objects: Contest[];
}