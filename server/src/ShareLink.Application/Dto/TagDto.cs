namespace ShareLink.Application.Dto;

public class TagDto
{
    public TagDto(string name, int count)
    {
        Name = name;
        Count = count;
    }

    public string Name { get; }
    
    public int Count { get; }
}
