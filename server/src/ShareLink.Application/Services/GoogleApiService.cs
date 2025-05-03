using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Microsoft.Extensions.Options;
using ShareLink.Common.Exceptions;
using ShareLink.Links.Api.Configurations;

namespace ShareLink.Links.Api.Services;

public class VideoInfo(string id, string title, string[] tags)
{
    public string Id { get; } = id;

    public string Title { get; } = title;

    public string[] Tags { get; } = tags;
}

public interface IGoogleApiService
{
    Task<VideoInfo> GetYoutubeVideoInfo(string videoId);
}

public class GoogleApiService(IOptions<GoogleApiConfiguration> googleApiConfiguration) : IGoogleApiService
{
    private const string YoutubeApiBaseUrl = "https://www.googleapis.com/youtube/v3/videos";
    private readonly YouTubeService _youTubeService = new(new BaseClientService.Initializer
    {
        ApiKey = googleApiConfiguration.Value.ApiKey,
        ApplicationName = googleApiConfiguration.Value.ApplicationName
    });

    public async Task<VideoInfo> GetYoutubeVideoInfo(string videoId)
    {
        var request = _youTubeService.Videos.List("snippet");
        request.Id = videoId;
        var response = await request.ExecuteAsync();
        var video = response.Items.FirstOrDefault();
        if (video is null)
        {
            throw new BusinessException(ErrorCodes.YoutubeVideoNotFound, "Video not found.");
        }

        return new VideoInfo(videoId, video.Snippet.Title, video.Snippet.Tags?.ToArray() ?? Array.Empty<string>());
    }
}