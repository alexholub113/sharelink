using System.Text;
using Microsoft.Azure.CognitiveServices.ContentModerator;
using Microsoft.Extensions.Options;
using ShareLink.Application.Common.Configurations;

namespace ShareLink.Application.Common.Services;

public interface IContentModerator
{
    Task<bool> ModerateText(string text);
}

public class ContentModerator(IOptions<ContentModeratorConfiguration> configuration) : IContentModerator
{
    private readonly ContentModeratorClient _client = new(new ApiKeyServiceClientCredentials(configuration.Value.Key))
    {
        Endpoint = configuration.Value.Endpoint
    };

    public async Task<bool> ModerateText(string text)
    {
        using var memoryStream = new MemoryStream(Encoding.UTF8.GetBytes(text));
        var result = await _client.TextModeration.ScreenTextAsync(
            "text/plain", memoryStream, "eng", true, true, null, true);
        return result.Terms == null || !result.Terms.Any();
    }
}