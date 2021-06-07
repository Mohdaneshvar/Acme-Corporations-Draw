using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Persistance.EF.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20210604134739_init")]

    public partial class CustomMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE FUNCTION [dbo].[CheckSerial](
	                @Serial varchar(max)
                )
                RETURNS int
                AS
                BEGIN
	                DECLARE @ResultVar int

	                SELECT @ResultVar=(select count(*)  from Participants where ProductSerialNumber=@Serial)

	                RETURN @ResultVar

                END");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP FUNCTION [CheckSerial]");
        }
    }
}
