namespace ShareLink.Common.Exceptions;

public static class ErrorCodes
{
    public const string YoutubeVideoNotFound = "YoutubeVideoNotFound";
    public const string UrlNotSupported = "UrlNotSupported";
    public const string UnableToParseUrl = "UnableToParseUrl";
    public const string LinkExists = "LinkExists";
    public const string LinkNotFound = "LinkNotFound";
    public const string ActionFailed = "ActionFailed";
}

public class BusinessException(string code, string? message = null) : Exception(message)
{
    public string Code { get; } = code;
}