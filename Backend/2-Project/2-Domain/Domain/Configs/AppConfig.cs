using Domain.Enums;

namespace CleanArchitecture.Domain.Entities
{
    public  class AppConfig
    {
        public AppConfigKey Key { get; set; }
        public string Value { get; set; }
    }
}
