using Domain.Participants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infra.Persistance.EF.Mapper
{

    public class AllSerialNumberMapper : IEntityTypeConfiguration<AllSerialNumber>
    {
        public void Configure(EntityTypeBuilder<AllSerialNumber> builder)
        {
            builder.HasKey(x => x.SerialNumber);
        }
    }
}