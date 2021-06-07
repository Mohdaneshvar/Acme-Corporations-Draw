using App.Common;
using AppService.Contracts.Commands.Participants;
using Domain;
using Domain.Enums;
using Domain.Participants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppService.Test
{
    public static class Sample
    {
        public static List<AllSerialNumber> AllSerialNumbers = new List<AllSerialNumber>();
        public static RegisterParticipantCommand registerParticipantCommand_SerialHasBeenRegisteredMoreThanTwo;
        public static RegisterParticipantCommand registerParticipantCommand_InvalidSerialNumber;
        public static RegisterParticipantCommand registerParticipantCommand_LessThan18YearsOld;
        public static RegisterParticipantCommand registerParticipantCommand;
        static Sample()
        {
            
            for (int i = 0; i < 100; i++)
            {
                AllSerialNumbers.Add(new AllSerialNumber() { SerialNumber = SKGLTools.CreateSerial(30, "My$ecretPa$$W0rd") });
            }
            registerParticipantCommand_SerialHasBeenRegisteredMoreThanTwo = new RegisterParticipantCommand { ProductSerialNumber = AllSerialNumbers[1].SerialNumber, HasOlderThan18 = true };
            registerParticipantCommand_InvalidSerialNumber = new RegisterParticipantCommand { ProductSerialNumber = "HCXDB-MQXOD-TRQKD-JQMVQ" ,HasOlderThan18=true};
            registerParticipantCommand = new RegisterParticipantCommand { ProductSerialNumber = "HCXDB-MXXOD-TRQKD-JQMVQ", HasOlderThan18 = true };
            registerParticipantCommand_LessThan18YearsOld = new RegisterParticipantCommand { ProductSerialNumber = "HCXDB-MXXOD-TRQKD-JQMVQ", HasOlderThan18 = false };
        }
        public static List<Participant> TwoParticipantWithSameSerialNumber()
        {
            var resut = new List<Participant>() {
            new Participant{
            DrawId=0,
            DrawResultState=DrawResultState.OnPerforming,
            EmailAddress="test@test.com",
            FirstName="De",
            LastName="Jong",
            ParticipantId=1,
            ProductSerialNumber=AllSerialNumbers[1].SerialNumber,
            RegisterDate=DateTime.Now
            },
            new Participant{
            DrawId=0,
            DrawResultState=DrawResultState.OnPerforming,
            EmailAddress="test@test.com",
            FirstName="De",
            LastName="Jong",
            ParticipantId=2,
            ProductSerialNumber=AllSerialNumbers[1].SerialNumber,
            RegisterDate=DateTime.Now
            } };
            return resut;

        }
        public static List<Participant> Participants()
        {
            var allSerialNumber = AllSerialNumbers;

            var resut = new List<Participant>() {
            new Participant{
            DrawId=0,
            DrawResultState=DrawResultState.OnPerforming,
            EmailAddress="test@test.com",
            FirstName="De",
            LastName="Jong",
            ParticipantId=1,
            ProductSerialNumber=allSerialNumber[1].SerialNumber,
            RegisterDate=DateTime.Now
            },
            new Participant{
            DrawId=0,
            DrawResultState=DrawResultState.OnPerforming,
            EmailAddress="test@test.com",
            FirstName="De",
            LastName="Jong",
            ParticipantId=2,
            ProductSerialNumber=allSerialNumber[1].SerialNumber,
            RegisterDate=DateTime.Now
            },
            new Participant{
            DrawId=0,
            DrawResultState=DrawResultState.OnPerforming,
            EmailAddress="test@test.com",
            FirstName="De",
            LastName="Jong",
            ParticipantId=3,
            ProductSerialNumber=allSerialNumber[2].SerialNumber,
            RegisterDate=DateTime.Now
            },
            new Participant{
            DrawId=0,
            DrawResultState=DrawResultState.OnPerforming,
            EmailAddress="test@test.com",
            FirstName="De",
            LastName="Jong",
            ParticipantId=4,
            ProductSerialNumber=allSerialNumber[3].SerialNumber,
            RegisterDate=DateTime.Now
            },
            new Participant{
            DrawId=0,
            DrawResultState=DrawResultState.OnPerforming,
            EmailAddress="test@test.com",
            FirstName="De",
            LastName="Jong",
            ParticipantId=5,
            ProductSerialNumber=allSerialNumber[4].SerialNumber,
            RegisterDate=DateTime.Now
            },
            new Participant{
            DrawId=0,
            DrawResultState=DrawResultState.OnPerforming,
            EmailAddress="test@test.com",
            FirstName="De",
            LastName="Jong",
            ParticipantId=6,
            ProductSerialNumber=allSerialNumber[5].SerialNumber,
            RegisterDate=DateTime.Now
            }
            };

            return resut;
        }
        public static Participant ParticipantById(int participantId)
        {
            var participants = Participants();
            var result = participants.Where(x => x.ParticipantId== participantId).FirstOrDefault();
            return result;
        }
        public static List<AllSerialNumber> RegisterParticipant()
        {

            for (int i = 0; i < 100; i++)
            {
                AllSerialNumbers.Add(new AllSerialNumber() { SerialNumber = SKGLTools.CreateSerial(30, "My$ecretPa$$W0rd") });
            }
            return AllSerialNumbers.ToList();
        }
    }
}
