using App.Common;
using AppService.Contracts.Commands.Accounts;
using CleanArchitecture.Domain.Entities;
using Domain;
using Domain.Accounts;
using Domain.Enums;
using Domain.Participants;
using Framework.Application;
using Framework.Domain.Enum;
using Framework.Domain.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AppService.Command_Handler.Accounts
{
    public class SerialNumberAppService : ICommandHandler<CreateSerialNumberCommand>
    {
        private readonly IRepository<AllSerialNumber> repositorySerialNumber;
        private readonly AppSettings appSettings;

        public SerialNumberAppService(IRepository<AllSerialNumber> repositorySerialNumber, AppSettings appSettings)
        {
            this.repositorySerialNumber = repositorySerialNumber;
            this.appSettings = appSettings;
        }
        public async Task HandleAsync(CreateSerialNumberCommand command, CancellationToken cancellationToken)
        {
            var result = new List<AllSerialNumber>();
            for (int i = 0; i < command.Count; i++)
            {
                result.Add(new AllSerialNumber
                {
                    SerialNumber = SKGLTools.CreateSerial(30, appSettings.SKGLSecretPhase)
                });
                
            }
            await repositorySerialNumber.AddRangeAsync(result);
            var text = result.Select(x=>x.SerialNumber).Aggregate((x,y)=>
            {
                if (!string.IsNullOrEmpty(y))
                    return x + Environment.NewLine + y;
                else
                    return x;
            });
            command.Result = new FileContentResult(Encoding.UTF8.GetBytes(text), "text/plain") { FileDownloadName = $"SerialNumber{DateTime.Now.ToShortDateString()}.txt"};
        }
    }
}
