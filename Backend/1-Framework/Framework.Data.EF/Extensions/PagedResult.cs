using System;
using System.Collections.Generic;

namespace Framework.Data.EF.Extensions
{
    public class PagedResult<T>  where T : class
    {
        public int RowCount { get; set; }
        public IList<T> Results { get; set; }

        public PagedResult()
        {
            Results = new List<T>();
        }
    }
    public class PagedRequest<T>  where T : class
    {
        public int Skip { get; set; }
        public int PageSize { get; set; }

        public T Filters { get; set; }
        public DateTime? FromDateFilter { get; set; }
        public DateTime? ToDateFilter { get; set; }
        public int? OrganizationIdFilter { get; set; }

    }

}
