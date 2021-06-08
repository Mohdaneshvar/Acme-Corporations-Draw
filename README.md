 
 # Acme Corporation's Draw 

<br/>

this is a website landing page for an international company called “Acme Corporation” that allows people to enter a draw for a prize.

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
7. Navigate to `frontend` folder and run `npm install`
8. Navigate to `frontend` and run `ng serve` to launch the front end (Angular)
9. open localhost:4200 on browser

### Database Migrations

with running project database is created automaiclly base on connection string in `appsettings.json`

## Additional description
. admin user info for login to see participants list and create new serial number is: 
    UserName=`admin`, Password=`admin`


## Overview
 
### 1-Framework

This is my own Framework and it like Onion architecture and it's shared in my projects.


### App.Service.AspDotNetDistributor

This layer just make web API for each command on the `AppService` layer 

### AppService

I used `CQRS` and `Command bus` pattern in this layer, this layer includes implementation of all commands and Queries.

### AppService.Contracts

this layer includes a list of all Command And Query without implementation.

## Domain

this layer includes all entities.

## Application.UnitTests

this layer includes unit tests with `NUnit`

## Design patterns and feature
`CQRS`,`Command Bus`, `Repository`,`UnitOfWork`,`NUnit`, `Dependency injection`