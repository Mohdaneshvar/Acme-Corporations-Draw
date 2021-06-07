using CleanArchitecture.Domain.Entities;
using Domain.Accounts;
using Domain.Participants;
using Framework.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Infra.Persistance.EF
{
    public class AppDbContext :
        IdentityDbContext<User,Role, int, IdentityUserClaim<int>,UserRole,IdentityUserLogin<int>,IdentityRoleClaim<int>,IdentityUserToken<int>>
        , IDbContext
    {
        public virtual DbSet<Participant> Participants { get; set; }
        public virtual DbSet<Draw> Draws { get; set; }
        public virtual DbSet<AllSerialNumber> AllSerialNumbers { get; set; }
        public virtual DbSet<AppConfig> AppConfigs { get; set; }

        public AppDbContext(DbContextOptions options) : base(options)
        {
           
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly); // Here UseConfiguration is any IEntityTypeConfiguration

            //modelBuilder.SeedPermission();
            base.OnModelCreating(modelBuilder);
        }

        public async Task BeginAsync(CancellationToken cancellationToken = default)
        {
             Database.BeginTransaction();
        }

        public void Commit()
        {
            Database.CommitTransaction();
        }

        public async Task RollbackAsync(CancellationToken cancellationToken = default)
        {
            await Database.BeginTransactionAsync(cancellationToken);
        }

        public async override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var result = await base.SaveChangesAsync(cancellationToken);
            return result;
        }

        private static DbContextOptions GetOptions(string connectionString)
        {
            return SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
        }

        public void RemoveRange<T>(IEnumerable<T> entities) where T : class
        {
            base.RemoveRange(entities);
        }

        void IDbContext.Remove<T>(T entity)
        {
            base.Remove(entity);
        }

        void IDbContext.Update<T>(T entity)
        {
            base.Update(entity);
        }

        public new IQueryable<T> Query<T>() where T : class
        {
            return base.Set<T>().AsQueryable();
        }

        public async Task AddRangeAsync<T>(IEnumerable<T> items, CancellationToken cancellationToken = default) where T : class
        {
            await base.AddRangeAsync(items, cancellationToken);
        }

        public async Task AddAsync<T>(T entity, CancellationToken cancellationToken = default) where T : class
        {
            await base.AddAsync(entity, cancellationToken);
        }

        public new async Task<TEntity> FindAsync<TEntity, TKey>(TKey id, CancellationToken cancellationToken = default) where TEntity : class
        {
            var res = await base.FindAsync<TEntity>(new object[] { id }, cancellationToken);
            return res;
        }
    }
}
