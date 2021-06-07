﻿using AppService.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Routing;
using System.Reflection;

namespace App.Service.AspDotNetDistributor
{
    public class GenericControllerRouteConvention : IControllerModelConvention
    {
        public void Apply(ControllerModel controller)
        {
            if (controller.ControllerType.IsGenericType)
            {
                var commandType = controller.ControllerType.GenericTypeArguments[0];
                var controllerRoute = controller.ControllerType.GetCustomAttribute<GeneratedControllerAttribute>();
                var commandCustomNameAttribute = commandType.GetCustomAttribute<CommandRouteAttribute>();
                var route = controllerRoute?.Route;
                if (!string.IsNullOrEmpty(commandCustomNameAttribute?.Route))
                    route += '/' + commandCustomNameAttribute?.Route;
                else
                    route += '/' + commandType.Name;

                controller.Selectors.Add(new SelectorModel
                {
                    AttributeRouteModel = new AttributeRouteModel(new RouteAttribute(route)),
                });
            }
            //else
            //{
            //    var commandType = controller.ControllerType;
            //    var controllerRoute = controller.ControllerType.GetCustomAttribute<GeneratedControllerAttribute>();
            //    var commandCustomNameAttribute = commandType.GetCustomAttribute<CommandRouteAttribute>();
            //    var route = controllerRoute?.Route;
            //    if (!string.IsNullOrEmpty(commandCustomNameAttribute?.Route))
            //        route += '/' + commandCustomNameAttribute?.Route;
            //    else
            //        route += '/' + commandType.Name;

            //    controller.Selectors.Add(new SelectorModel
            //    {
            //        AttributeRouteModel = new AttributeRouteModel(new RouteAttribute(route)),
            //    });
            //}

        }
    }
}
