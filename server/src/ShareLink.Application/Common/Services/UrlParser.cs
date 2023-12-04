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
    private static readonly LinkTypeSettings[] KnownLinkSources = {
        new(LinkType.Youtube, "https://www.youtube.com/watch?v=", @"youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"),
        new(LinkType.Youtube, "https://youtu.be/", @"youtu\.be\/([a-zA-Z0-9_-]{11})"),
        new(LinkType.Youtube, "http://youtu.be/", @"youtu\.be\/([a-zA-Z0-9_-]{11})"),
    };

    public (LinkType linkType, string urlId) ParseUrl(string url)
    {
        var linkSource = KnownLinkSources.FirstOrDefault(x => url.StartsWith(x.Website));
        if (linkSource is null)
        {
            if (!IsUrlValid(url))
            {
                throw new BusinessException(ErrorCodes.UnableToParseUrl, "Invalid URL");
            }

            return (LinkType.UnknownSource, url);
        }

        var match = Regex.Match(url, linkSource.IdRegexPatter);
        if (!match.Success)
        {
            throw new BusinessException(ErrorCodes.UnableToParseUrl, "Unable to parse URL");
        }

        var urlId = match.Groups[1].Value;
        return (linkSource.LinkType, urlId);
    }

    public static bool IsUrlValid(string url)
    {
        if (!Uri.TryCreate(url, UriKind.Absolute, out var uri))
        {
            return false;
        }

        if (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps)
        {
            return false;
        }

        return true;
    }

    private class LinkTypeSettings(LinkType linkType, string website, string idRegexPatter)
    {
        public string IdRegexPatter { get; } = idRegexPatter;

        public string Website { get; } = website;

        public LinkType LinkType { get; } = linkType;
    }
}