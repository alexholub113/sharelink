namespace ShareUsefulness.Tests;

public class LinkFunctionsTests
{
    public LinkFunctionsTests()
    {
        Environment.SetEnvironmentVariable("MONGO_CONNECTION_STRING", "mongodb://localhost:27017");
        Environment.SetEnvironmentVariable("MONGO_DATABASE_NAME", "LinksTests");
    }
}
