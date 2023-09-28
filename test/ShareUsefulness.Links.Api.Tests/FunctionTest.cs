using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.TestUtilities;
using Xunit;

namespace ShareUsefulness.Links.Api.Tests
{
  public class FunctionTest
  {

    [Fact]
    public async Task TestGetListFunctionHandler()
    {
            var request = new APIGatewayProxyRequest();
            var context = new TestLambdaContext();

            var expectedResponse = new APIGatewayHttpApiV2ProxyResponse
            {
                StatusCode = 200,
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
            };

            var functions = new Functions();
            var response = await functions.GetList(request, context);

            Assert.Equal(expectedResponse.Body, response.Body);
            Assert.Equal(expectedResponse.Headers, response.Headers);
            Assert.Equal(expectedResponse.StatusCode, response.StatusCode);
    }
  }
}
