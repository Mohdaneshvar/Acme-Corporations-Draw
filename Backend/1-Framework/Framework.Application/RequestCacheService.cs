using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Application
{
    public class RedisCacheProvider : ICacheProvider
    {
        private readonly IDistributedCache _distributedCache;

        public RedisCacheProvider(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
        }



        public async Task AddAsync<T>(string key, T value)
        {
            if (value != null)
            {
                //var serializedResponse = JsonConvert.SerializeObject(value);
                //await _distributedCache.SetStringAsync(cacheKey, serializedResponse, new DistributedCacheEntryOptions
                //{
                //    AbsoluteExpirationRelativeToNow = time
                //});
            }
                await Task.CompletedTask;
        }

        public async Task<bool> ExistAsync(string key)
        {
            await Task.CompletedTask;
            return true;
            //var cachedRequest = await _distributedCache.GetStringAsync(cacheKey);
            //return string.IsNullOrWhiteSpace(cachedRequest) ? null : cachedRequest;
        }

        public Task<T> GetAsync<T>(string key)
        {
            throw new NotImplementedException();
        }
    }
}
