using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Framework.Data.EF.Extensions
{
    public static class PagedExtention
    {
        public static async Task<PagedResult<T>> GetPagedAsync<T>(this IQueryable<T> query, int skip, int pageSize) where T : class
        {
            var result = new PagedResult<T>();
            result.RowCount = await query.CountAsync();
            result.Results = await query.Skip(skip).Take(pageSize).ToListAsync();

            return result;
        }
        //public async static Task<PagedResult<U>> GetPagedAsync<T, U>(this IQueryable<T> query,
        //                                       int page, int pageSize) where U : class
        //{
        //    var result = new PagedResult<U>();
        //    result.CurrentPage = page;
        //    result.PageSize = pageSize;
        //    result.RowCount = query.Count();

        //    var pageCount = (double)result.RowCount / pageSize;
        //    result.PageCount = (int)Math.Ceiling(pageCount);

        //    var skip = (page - 1) * pageSize;
        //    result.Results = await query.Skip(skip)
        //                          .Take(pageSize)
        //                          .ProjectTo<U>()
        //                          .ToListAsync();

        //    return result;
        //}
    }

}
