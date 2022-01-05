export interface CListContestParams {
    limit?: number;
    offset?: number;
    total_count?: boolean;
    with_problems?: boolean;
    id?: number;
    id__in?: number;
    resource_id?: number;
    resource_id__in?: number;
    resource?: string;
    host?: string;
    host__iregex?: string;
    host_regex?: string;
    start?: Date | string;
    start__gt?: Date | string;
    start__gte?: Date | string;
    start__lte?: Date | string;
    start__lt?: Date | string;
    start__week_day?: Date | string;
    end?: Date | string;
    end__gt?: Date | string;
    end__lt?: Date | string;
    end__gte?: Date | string;
    end__lte?: Date | string;
    end__week_day?: Date | string;
    parsed_at?: Date | string;
    parsed_at__gt?: Date | string;
    parsed_at__lt?: Date | string;
    parsed_at__gte?: Date | string;
    parsed_at__lte?: Date | string;
    duration?: Date | string;
    duration__gt?: Date | string;
    duration__lt?: Date | string;
    duration__gte?: Date | string;
    duration__lte?: Date | string;
    filtered?: boolean;
    category?: CListAPICategory;
    order_by?: CListAPIOrderBy
}

enum CListAPICategory {
    'list',
    'calendar',
    'email',
    'telegram',
    'api',
    'webbrowser'
}

enum CListAPIOrderBy {
    "id",
    "-id",
    "event",
    "-event",
    "start",
    "-start",
    "end",
    "-end",
    "resource_id",
    "-resource_id",
    "duration",
    "-duration",
    "parsed_at",
    "-parsed_at",
}