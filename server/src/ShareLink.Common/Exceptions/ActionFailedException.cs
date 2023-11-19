namespace ShareLink.Common.Exceptions;

public class ActionFailedException(string message) : BusinessException(ErrorCodes.ActionFailed, message)
{
}