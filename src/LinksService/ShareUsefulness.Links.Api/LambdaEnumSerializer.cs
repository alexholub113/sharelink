using System.Text.Json.Serialization;

namespace ShareUsefulness.Links.Api;

public class LambdaEnumSerializer : Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer
{
    public LambdaEnumSerializer()
        : base(options => options.Converters.Add(new JsonStringEnumConverter())) { }
}
