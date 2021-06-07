using Domain.Participants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infra.Persistance.EF.Mapper
{

    public class ParticipantMapper : IEntityTypeConfiguration<Participant>
    {
        public void Configure(EntityTypeBuilder<Participant> builder)
        {
            builder.HasKey(x => x.ParticipantId);
            builder.HasCheckConstraint("CheckSerialNumberLessThanTwo", "[dbo].[CheckSerial]([ProductSerialNumber])<=1");
        }
    }
}