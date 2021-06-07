using AppService.Command_Handler.Accounts;
using AppService.Config;
using AppService.Contracts.Commands.Accounts;
using AppService.Contracts.Commands.Participants;
using AppService.Test;
using CleanArchitecture.Domain.Entities;
using Domain;
using Domain.Accounts;
using Domain.Enums;
using Domain.Participants;
using Framework.Application;
using Framework.Application.Config;
using Framework.Data;
using Framework.Domain.Enum;
using Framework.Domain.Repository;
using Framework.Domain.Resource;
using Moq;
using NUnit.Framework;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UnitTests.Common.Behaviours
{
    [TestFixture]

    public class ParticipantTests
    {
        private static Container _container;
        private Mock<IRepository<Participant>> _participantRepositoryMock = new Mock<IRepository<Participant>>();
        private Mock<IRepository<AllSerialNumber>> _allSerialNumberRepositoryMock = new Mock<IRepository<AllSerialNumber>>();
        private AppSettings _appSetting;
        private Mock<IRepository<AppConfig>> _appConfigMock = new Mock<IRepository<AppConfig>>();

        public ParticipantTests()
        {

        }
        [SetUp]
        public void SetUp()
        {
            _container = new Container();
            _container.Options.DefaultScopedLifestyle =
                Lifestyle.CreateHybrid(new AsyncScopedLifestyle(), new ThreadScopedLifestyle());
            FrameworkConfigurator.WireUp(_container, false, typeof(ParticipantAppService).Assembly, typeof(RegisterParticipantCommand).Assembly);
            AppServiceConfigurator.WireUp(_container);

            _appSetting = new AppSettings() { SKGLSecretPhase = "My$ecretPa$$W0rd" };
            _allSerialNumberRepositoryMock.Setup(x => x.Query()).Returns(Sample.AllSerialNumbers.AsQueryable());

        }

        [Test]
        public async Task RegistrationOfParticipantsSuccessfully()
        {
            _participantRepositoryMock.Setup(x => x.AddAsync(It.IsAny<Participant>()));
            _appConfigMock.Setup(x => x.FindAsync(AppConfigKey.CurrentDrawId)).ReturnsAsync(new AppConfig { Key = AppConfigKey.CurrentDrawId, Value = "0" });
            var participantAppService = new ParticipantAppService(_participantRepositoryMock.Object, _appConfigMock.Object, _allSerialNumberRepositoryMock.Object);
            var registerParticipantCommandValidator = new RegisterParticipantCommandValidator(_participantRepositoryMock.Object, _appSetting, _allSerialNumberRepositoryMock.Object);

            var command = new RegisterParticipantCommand()
            {
                EmailAddress = "testemail@test.com",
                FirstName = "Van",
                LastName = "Dijk",
                HasOlderThan18 = true,
                ProductSerialNumber = Sample.AllSerialNumbers.FirstOrDefault().SerialNumber,
            };

            var validationResult = registerParticipantCommandValidator.Validate(command);
            await participantAppService.HandleAsync(command, It.IsAny<CancellationToken>());
            _participantRepositoryMock.Verify(m => m.AddAsync(It.IsAny<Participant>()), Times.Once);

            Assert.AreEqual(validationResult.IsValid, true);
        }
        [TestCaseSource(typeof(ParticipantCaseSource), nameof(ParticipantCaseSource.TestCase_SerialHasBeenRegisteredMoreThanTwo))]
        public void RegistrationOfParticipants_Exception_SerialHasBeenRegisteredMoreThanTwo(RegisterParticipantCommand command, List<Participant> participants)
        {
            _participantRepositoryMock.Setup(x => x.AddAsync(It.IsAny<Participant>()));
            _participantRepositoryMock.Setup(x => x.Query()).Returns(participants.AsQueryable());
            _appConfigMock.Setup(x => x.FindAsync(AppConfigKey.CurrentDrawId)).ReturnsAsync(new AppConfig { Key = AppConfigKey.CurrentDrawId, Value = "0" });
            var participantAppService = new ParticipantAppService(_participantRepositoryMock.Object, _appConfigMock.Object, _allSerialNumberRepositoryMock.Object);
            var registerParticipantCommandValidator = new RegisterParticipantCommandValidator(_participantRepositoryMock.Object, _appSetting, _allSerialNumberRepositoryMock.Object);

            var validationResult = registerParticipantCommandValidator.Validate(command);

            var ex = Assert.ThrowsAsync<ExceptionResult>(async () => { await participantAppService.HandleAsync(command, It.IsAny<CancellationToken>()); });

            Assert.AreEqual(ex.Message, Status.ResourceManager.GetString(nameof(Status.SerialHasBeenRegisteredMoreThanTwo)));
        }

        [TestCaseSource(typeof(ParticipantCaseSource), nameof(ParticipantCaseSource.TestCase_SerialNumberNotExists))]
        public void  RegistrationOfParticipants_Exception_SerialNumberNotExists(RegisterParticipantCommand command, List<AllSerialNumber> allSerialNumber)
        {
            _participantRepositoryMock.Setup(x => x.AddAsync(It.IsAny<Participant>()));
            _allSerialNumberRepositoryMock.Setup(x => x.Query()).Returns(allSerialNumber.AsQueryable());
            _appConfigMock.Setup(x => x.FindAsync(AppConfigKey.CurrentDrawId)).ReturnsAsync(new AppConfig { Key = AppConfigKey.CurrentDrawId, Value = "0" });

            var participantAppService = new ParticipantAppService(_participantRepositoryMock.Object, _appConfigMock.Object, _allSerialNumberRepositoryMock.Object);
            var registerParticipantCommandValidator = new RegisterParticipantCommandValidator(_participantRepositoryMock.Object, _appSetting, _allSerialNumberRepositoryMock.Object);

            var validationResult = registerParticipantCommandValidator.Validate(command);

            var ex = Assert.ThrowsAsync<ExceptionResult>(async () => { await participantAppService.HandleAsync(command, It.IsAny<CancellationToken>()); });

            Assert.AreEqual(ex.Message, Status.ResourceManager.GetString(nameof(Status.SerialNumberNotExists)));
        }
        [TestCaseSource(typeof(ParticipantCaseSource), nameof(ParticipantCaseSource.TestCase_SerialNumberIsInvalid))]

        public void   RegistrationOfParticipants_Exception_SerialNumberIsInvalid(RegisterParticipantCommand command, List<AllSerialNumber> allSerialNumber)
        {
            _appConfigMock.Setup(x => x.FindAsync(AppConfigKey.CurrentDrawId)).ReturnsAsync(new AppConfig { Key = AppConfigKey.CurrentDrawId, Value = "0" });

            var registerParticipantCommandValidator = new RegisterParticipantCommandValidator(_participantRepositoryMock.Object, _appSetting, _allSerialNumberRepositoryMock.Object);
            var validationResult = registerParticipantCommandValidator.Validate(command);
            Assert.AreEqual(validationResult.IsValid, false);
            Assert.AreEqual(validationResult.Errors.Select(x=>x.ErrorMessage).Contains(Status.SerialNumberIsInvalid),true);

        }
        [TestCaseSource(typeof(ParticipantCaseSource), nameof(ParticipantCaseSource.TestCase_LessThan18YearsOld))]

        public void RegistrationOfParticipants_Exception_LessThan18YearsOld(RegisterParticipantCommand command, List<AllSerialNumber> allSerialNumber)
        {
            _appConfigMock.Setup(x => x.FindAsync(AppConfigKey.CurrentDrawId)).ReturnsAsync(new AppConfig { Key = AppConfigKey.CurrentDrawId, Value = "0" });

            var registerParticipantCommandValidator = new RegisterParticipantCommandValidator(_participantRepositoryMock.Object, _appSetting, _allSerialNumberRepositoryMock.Object);
            var validationResult = registerParticipantCommandValidator.Validate(command);
            Assert.AreEqual(validationResult.IsValid, false);
            Assert.AreEqual(validationResult.Errors.Select(x => x.ErrorMessage).Contains(Status.ShouldBeOlderThan18), true);

        }
    }
}
