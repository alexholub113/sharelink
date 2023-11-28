using System.Text.RegularExpressions;
using ShareLink.Application.Common.Exceptions;
using ShareLink.Common.Exceptions;
using ShareLink.Domain.Enums;

namespace ShareLink.Application.Common.Services;

public interface IUrlParser
{
    (LinkType linkType, string urlId) ParseUrl(string url);
}

public class UrlParser : IUrlParser
{
    private static readonly LinkTypeSettings[] Settings = {
        new(LinkType.Youtube, "https://www.youtube.com/watch?v=", @"youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"),
        new(LinkType.Youtube, "https://youtu.be/", @"youtu\.be\/([a-zA-Z0-9_-]{11})"),
        new(LinkType.Youtube, "http://youtu.be/", @"youtu\.be\/([a-zA-Z0-9_-]{11})"),
    };

    public (LinkType linkType, string urlId) ParseUrl(string url)
    {
        var linkTypeSettings = Settings.FirstOrDefault(x => url.StartsWith(x.Website));
        if (linkTypeSettings is null)
        {
            throw new BusinessException(ErrorCodes.UrlNotSupported, "This kind of URL isn't supported");
        }

        var match = Regex.Match(url, linkTypeSettings.IdRegexPatter);
        if (!match.Success)
        {
            throw new BusinessException(ErrorCodes.UnableToParseUrl, "Unable to parse URL");
        }

        var urlId = match.Groups[1].Value;
        return (linkTypeSettings.LinkType, urlId);
    }

    public static bool IsUrlSupported(string url)
    {
        var linkTypeSettings = Settings.FirstOrDefault(x => url.StartsWith(x.Website));
        if (linkTypeSettings is null)
        {
            return false;
        }

        var match = Regex.Match(url, linkTypeSettings.IdRegexPatter);

        return match.Success;
    }

    private class LinkTypeSettings(LinkType linkType, string website, string idRegexPatter)
    {
        public string IdRegexPatter { get; } = idRegexPatter;

        public string Website { get; } = website;

        public LinkType LinkType { get; } = linkType;
    }
}