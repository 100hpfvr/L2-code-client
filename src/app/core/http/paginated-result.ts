export class PaginatedResult<T> {
    data: T[]  = [];
    totalItems: number = 0;
    currentPage: number = 1;
    itemsPerPage: number = 0;
    totalPages: number = 1;
    success: boolean = false;
    message: string | null = null;

    constructor({
        data = [],
        totalItems,
        currentPage,
        itemsPerPage,
        totalPages,
        success,
        message
    }: {
        data?: T[] | null;
        totalItems?: number;
        currentPage?: number;
        itemsPerPage?: number;
        totalPages?: number;
        success?: boolean;
        message?: string | null;
    }) {
        this.data = data ?? [];
        this.totalItems = totalItems ?? 0;
        this.currentPage = currentPage ?? 1;
        this.itemsPerPage = itemsPerPage ?? 0;
        this.totalPages = totalPages ?? 1;
        this.success = success ?? false;
        this.message = message ?? null;
    }
}

export interface SearchParams extends PaginationParams {
    searchKey?: string;
}
export interface PaginationParams {
    page: number;
    itemsPerPage: number;
    hasPaginationData: boolean;
}
