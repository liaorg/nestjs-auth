export class PaginationDto {
    /**
     * 页数
     */
    page: number;
    /**
     * 每页几条
     */
    limit: number;
}

export class PaginationListDto {
    /**
     * 列表数据
     */
    list: any[];
    /**
     * 每页几条
     */
    limit: number;
    /**
     * 总条数
     */
    total: number;
}
