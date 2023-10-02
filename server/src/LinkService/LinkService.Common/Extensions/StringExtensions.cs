using System.Text.Json;
using System.Text.Json.Serialization.Metadata;

namespace LinkService.Common.Extensions;

public static class StringExtensions
{
    public static T Deserialize<T>(this string json, JsonTypeInfo<T> jsonTypeInfo)
    {
        var result = JsonSerializer.Deserialize<T>(json, jsonTypeInfo);
        if (result == null)
        {
            throw new JsonException($"Failed to deserialize {json} to {typeof(T).Name}");
        }

        return result;
    }
}
