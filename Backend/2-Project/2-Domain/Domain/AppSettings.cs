using System.Collections.Generic;

namespace Domain
{
    public class AppSettings
    {
        public AppSettings()
        {

        }
        public string SKGLSecretPhase { get; set; }
        public ConnectionStrings ConnectionStrings { get; set; }
        public JWTSettings JWTSettings { get; set; }

    }

    public class JWTSettings
    {
        public string securityKey { get; set; }
        public string validIssuer { get; set; }
        public string validAudience { get; set; }
        public string expiryInMinutes { get; set; }
    }
 
    public class ConnectionStrings
    {
        public string ConnectingString { get; set; }
    }
 
}
