using System.Text;
using Microsoft.Azure.CognitiveServices.ContentModerator;
using Microsoft.Extensions.Options;
using ShareLink.Application.Configurations;

namespace ShareLink.Application.Services;

public interface IContentModerator
{
    Task<string[]> ModerateText(string text);
}

public class ContentModerator(IOptions<ContentModeratorConfiguration> configuration) : IContentModerator
{
    private readonly ContentModeratorClient _client = new(new ApiKeyServiceClientCredentials(configuration.Value.Key))
    {
        Endpoint = configuration.Value.Endpoint
    };

    public async Task<string[]> ModerateText(string text)
    {
        using var memoryStream = new MemoryStream(Encoding.UTF8.GetBytes(text));
        var result = await _client.TextModeration.ScreenTextAsync(
            "text/plain", memoryStream, "eng", true, true, null, true);
        if (result.Terms == null)
        {
            return Array.Empty<string>();
        }

        return result.Terms.Select(x => x.Term).ToArray();
    }
}