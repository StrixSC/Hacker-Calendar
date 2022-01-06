export interface HackerEvent {
    start: Date & string;
    end: Date & string;
    summary: string;
    description: string;
    id: string;
}

export type HackerSource = (start: Date) => Promise<HackerEvent[]>
