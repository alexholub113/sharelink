namespace ShareLink.Application.Common.Exceptions;

public static class ErrorCodes
{
    public const string YoutubeVideoNotFound = "YoutubeVideoNotFound";
    public const string UrlNotSupported = "UrlNotSupported";
    public const string UnableToParseUrl = "UnableToParseUrl";
    public const string LinkExists = "LinkExists";
}

public class BusinessException(string code, string? message = null) : Exception(message)
{
    public string Code { get; } = code;
}