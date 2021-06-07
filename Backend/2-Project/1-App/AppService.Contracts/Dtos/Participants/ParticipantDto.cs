using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppService.Contracts.Dtos.Participants
{
   public class ParticipantDto
    {
        public int ParticipantId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string ProductSerialNumber { get; set; }
        public int DrawId { get; set; }
        public DrawResultState DrawResultState { get; set; }
        public string DrawResultStateString { get
            {
                return Enum.GetName(typeof(DrawResultState), DrawResultState);
            } }
        public DateTime RegisterDate { get; set; }
    }
}

