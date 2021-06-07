using Domain.Enums;
using System;

namespace Domain.Participants
{
    public class Participant
    {
        public int ParticipantId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string ProductSerialNumber { get; set; }
        public int DrawId { get; set; }
        public DrawResultState DrawResultState { get; set; }
        public DateTime RegisterDate { get; set; }
    }
}
