using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SKGL;
namespace App.Common
{
    public static class SKGLTools
    {
        public static string CreateSerial(int timeLeft, string secretPhase)
        {

            string result; ;
            var createAKey = new Generate();
            createAKey.secretPhase = secretPhase; //adding a password
            result = createAKey.doKey(timeLeft); // generating a key; 30 is the time left.
            return result;
        }

        public static bool ValidateSerial(string serial, string secretPhase)
        {
            var validateAKey = new Validate();
            validateAKey.secretPhase = secretPhase;// the passsword
            validateAKey.Key = serial;
            return validateAKey.IsValid;
        }
    }
}
