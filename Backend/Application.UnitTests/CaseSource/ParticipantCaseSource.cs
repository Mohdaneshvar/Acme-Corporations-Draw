using AppService.Test;
using Domain.Participants;
using NUnit.Framework;
using System.Collections.Generic;

namespace Application.UnitTests
{
    public static class ParticipantCaseSource
    {
        public static IEnumerable<TestCaseData> TestCase_SerialHasBeenRegisteredMoreThanTwo
        {
            get
            {
                yield return new TestCaseData(Sample.registerParticipantCommand_SerialHasBeenRegisteredMoreThanTwo, Sample.TwoParticipantWithSameSerialNumber())
                    .SetName("TestCase_SerialHasBeenRegisteredMoreThanTwo").SetDescription("Test that the serial number is not registered more than twice");

            }
        }
        public static IEnumerable<TestCaseData> TestCase_SerialNumberNotExists
        {
            get
            {
                yield return new TestCaseData(Sample.registerParticipantCommand,new List<AllSerialNumber>())
                .SetName("TestCase_SerialNumberNotExists").SetDescription("Check if the serial number is in the database or not");
            }
        }
        public static IEnumerable<TestCaseData> TestCase_SerialNumberIsInvalid
        {
            get
            {
                yield return new TestCaseData(Sample.registerParticipantCommand_InvalidSerialNumber, new List<AllSerialNumber>())
                .SetName("TestCase_SerialNumberIsInvalid").SetDescription("Check the correctness of the serial number format");
            }
        }
        public static IEnumerable<TestCaseData> TestCase_LessThan18YearsOld
        {
            get
            {
                yield return new TestCaseData(Sample.registerParticipantCommand_LessThan18YearsOld, new List<AllSerialNumber>())
                    .SetName("TestCase_LessThan18YearsOld").SetDescription("Check if the user is over 18 years old or not");

            }
        }
    }
}
