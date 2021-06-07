export interface IPagedList<T> {
    results: T[],
    rowCount: number,
    skip: number,
    pageSize: number,
    currentPage: number,
    pageCount: number,
    firstRowOnPage: number,
    lastRowOnPage: number,
  }
