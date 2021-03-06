 
 # Acme Corporation's Draw 

<br/>

This is a website landing page for an international company called “Acme Corporation” that allows people to enter a draw for a prize.

## Technologies

* ASP.NET Core 5
* [Entity Framework Core 5](https://docs.microsoft.com/en-us/ef/core/)
* [Angular 11](https://angular.io/)
* [FluentValidation](https://fluentvalidation.net/)
* [NUnit](https://nunit.org/), [FluentAssertions](https://fluentassertions.com/), [Moq](https://github.com/moq) , ASP.NET Core Identity


## Getting Started

1. Install the latest [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)
2. Install the latest [Node.js LTS](https://nodejs.org/en/)
3. Open the `Backend/Draw.APP.sln` on visual studio 2019
4. Right click on the `App.Service.AspDotNetDistributor` project and select `Set as StartUp Project` item
5. Set sql server connectionstrings on `appsettings.json`
6. Run project(press F5)
7. On the Powershell navigate to `frontend` folder and run `npm install` (to the best understanding of frontend code, you can use Visual Studio Code, you just need to open the `frontend` folder on Visual Studio Code)
8. On the Powershell navigate to `frontend` and run `ng serve` to launch the front end (Angular)
9. Open localhost:4200 on browser

### Database Migrations

With running the project, its database is created automatically based on connection string in `appsettings.json`

## Additional Description
Admin user info for login to see participants list and create new serial number is:

UserName=`admin`, Password=`admin`


## Overview
 
### 1-Framework

This is my own Framework and it like Onion architecture and it's shared in my projects.


### App.Service.AspDotNetDistributor

This layer just make a web API endpoint for each command on the `App Service` layer

### AppService

I used `CQRS` and `Command bus` pattern in this layer, this layer includes implementation of all commands and queries.

### AppService.Contracts

This layer includes a list of all command And query without implementation.

## Domain

This layer includes all entities.

## Application.UnitTests

This layer includes unit tests with `NUnit`

## Design patterns and feature
`CQRS`,`Command Bus`, `Repository`,`UnitOfWork`,`NUnit`, `Dependency injection`