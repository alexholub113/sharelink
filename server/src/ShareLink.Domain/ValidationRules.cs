namespace ShareLink.Domain;

public static class ValidationRules
{
    public static class LinkTitle
    {
        public const int MinLength = 10;
        public const int MaxLength = 100;
    }

    public static class Tag
    {
        public const int MinTagsCount = 1;
        public const int MaxTagsCount = 5;
        public const int MinTagLength = 2;
        public const int MaxTagLength = 30;
    }
}