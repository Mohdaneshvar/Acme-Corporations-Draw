using Framework.Domain.Resource;
using System.ComponentModel.DataAnnotations;

namespace Framework.Domain.Enum
{
    public enum StatusEnum
    {
        [Display(Name = nameof(UnkownError), ResourceType = typeof(Status))]
        UnkownError = 0,
        [Display(Name = nameof(Unauthorized), ResourceType = typeof(Status))]
        Unauthorized = 401,
        [Display(Name = nameof(InvalidModelState), ResourceType = typeof(Status))]
        InvalidModelState = 402,
        [Display(Name = nameof(Forbidden), ResourceType = typeof(Status))]
        Forbidden = 403,
        [Display(Name = nameof(NotFound), ResourceType = typeof(Status))]
        NotFound = 404,
        [Display(Name = nameof(ItIsNotPossibleToCreateANewAccount), ResourceType = typeof(Status))]
        ItIsNotPossibleToCreateANewAccount = 405,
        [Display(Name = nameof(CanNotCharge), ResourceType = typeof(Status))]
        CanNotCharge = 406,
        [Display(Name = nameof(OrganizationLimitRequest), ResourceType = typeof(Status))]
        OrganizationLimitRequest = 407,
        [Display(Name = nameof(InvalidAccount), ResourceType = typeof(Status))]
        InvalidAccount = 408,
        [Display(Name = nameof(StockNotEnough), ResourceType = typeof(Status))]
        StockNotEnough = 409,
        [Display(Name = nameof(NationalCode), ResourceType = typeof(Status))]
        NationalCode = 410,
        [Display(Name = nameof(NationalCodeMinimumLength), ResourceType = typeof(Status))]
        NationalCodeMinimumLength = 411,
        [Display(Name = nameof(InvalidNationalCode), ResourceType = typeof(Status))]
        InvalidNationalCode = 412,
        [Display(Name = nameof(NationalCodeNotFound), ResourceType = typeof(Status))]
        NationalCodeNotFound = 413,
        [Display(Name = nameof(InvalidActionPrice), ResourceType = typeof(Status))]
        InvalidActionPrice = 414,
        [Display(Name = nameof(AlreadyExist), ResourceType = typeof(Status))]
        AlreadyExist = 415,
        [Display(Name = nameof(CanNotDelete), ResourceType = typeof(Status))]
        CanNotDelete = 416,
        [Display(Name = nameof(InvalidActionPriceDetail), ResourceType = typeof(Status))]
        InvalidActionPriceDetail = 417,
        [Display(Name = nameof(UseSqlServer), ResourceType = typeof(Status))]
        UseSqlServer = 500,
        [Display(Name = nameof(DublicateUser), ResourceType = typeof(Status))]
        DublicateUser = 501,
        [Display(Name = nameof(UserNotFound), ResourceType = typeof(Status))]
        UserNotFound = 502,
        [Display(Name = nameof(ErrorInSendSMS), ResourceType = typeof(Status))]
        ErrorInSendSMS = 503,
        [Display(Name = nameof(OldPassIsNotCorrect), ResourceType = typeof(Status))]
        OldPassIsNotCorrect = 504,
        [Display(Name = nameof(ExceptionInChangingUserPass), ResourceType = typeof(Status))]
        ExceptionInChangingUserPass = 505,
        [Display(Name = nameof(SerialNumberNotExists), ResourceType = typeof(Status))]
        SerialNumberNotExists = 506,
        [Display(Name = nameof(SerialHasBeenRegisteredMoreThanTwo), ResourceType = typeof(Status))]
        SerialHasBeenRegisteredMoreThanTwo = 508,
    }
}
