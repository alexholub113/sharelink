import {Badge, Card, Container, Flex, Heading, Text} from '@radix-ui/themes';
import { ChatBubbleIcon  } from '@radix-ui/react-icons';

const SampleRadix = () => {

    return (
        <Container size="1">
            <Flex direction="column" pb="4">
                <Heading>
                    Hello from Radix Themes :)
                </Heading>
                <Text color="gray">
                    This is a sample page using Radix Themes.
                </Text>
            </Flex>
            <Flex gap="4" direction="column">
                <Card>
                    <Flex gap="3" direction="column">
                        <Text>
                            This is a card.
                        </Text>
                        <Flex gap="2">
                            <Badge>Typescript</Badge>
                            <Badge>C#</Badge>
                            <Badge>Python</Badge>
                        </Flex>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam ac
                        </Text>
                        <Flex pt="1">
                            <Flex align="center"> { /* Align content to the center */}
                                <ChatBubbleIcon />
                                <Text size="1" color="gray" ml="3">3 Comments</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>

                <Card>
                    <Flex gap="3" direction="column">
                        <Text>
                            This is a card.
                        </Text>
                        <Flex gap="2">
                            <Badge>Typescript</Badge>
                            <Badge>C#</Badge>
                            <Badge>Python</Badge>
                        </Flex>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam ac
                        </Text>
                        <Flex pt="1">
                            <Flex align="center"> { /* Align content to the center */}
                                <ChatBubbleIcon />
                                <Text size="1" color="gray" ml="3">3 Comments</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>

                <Card>
                    <Flex gap="3" direction="column">
                        <Text>
                            This is a card.
                        </Text>
                        <Flex gap="2">
                            <Badge>Typescript</Badge>
                            <Badge>C#</Badge>
                            <Badge>Python</Badge>
                        </Flex>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam ac
                        </Text>
                        <Flex pt="1">
                            <Flex align="center"> { /* Align content to the center */}
                                <ChatBubbleIcon />
                                <Text size="1" color="gray" ml="3">3 Comments</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </Container>
    );
}

export default SampleRadix;
