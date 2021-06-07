using AppService.Decorators;
using Framework.Application;
using Framework.Data.EF;
using Framework.Domain.Repository;
using SimpleInjector;
using System.Collections.Generic;
using System.Linq;
//using Domain.Query.Finders;

namespace AppService.Config
{
    public class AppServiceConfigurator
    {
        public class EventHandlerFactory : IEventHandlerFactory
        {
            private readonly Container _container;

            public EventHandlerFactory(Container container)
            {
                _container = container;
            }
            public List<IEventHandler<T>> CreateHandler<T>()
            {
                return _container.GetAllInstances<IEventHandler<T>>().ToList();
            }
        }

        //[Obsolete]
        public static void WireUp(Container container)
        {
            container.Register<IUnitOfWork, EFUnitOfWork>();

            container.RegisterDecorator(typeof(ICommandHandler<>), typeof(LogDecoratorCommandHandler<>));
            container.RegisterDecorator(typeof(ICommandHandler<>), typeof(AuthorizationDecoratorCommandHandler<>));
            container.RegisterDecorator(typeof(ICommandHandler<>), typeof(ValidatorCommandHandler<>));

            
            container.Register<ICacheProvider, InMemoryCacheProvider>(Lifestyle.Singleton);

            container.Register<IKeyGenerator, KeyGenerator>();
            container.Register(typeof(IRepository<>), typeof(EFRepository<>));
        }
    }
}
