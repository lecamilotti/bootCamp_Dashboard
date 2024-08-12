import { Box, Flex, Heading, Text, VStack, Avatar, HStack, StackDivider } from '@chakra-ui/react';
import React from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const Team: React.FC = () => {
    const currentDate = new Date().toLocaleDateString();

    const scheduledTeamMembers = [
        { name: 'John Doe', role: 'cleaning 1fst floor', avatarUrl: '/path-to-avatar1.png' },
        { name: 'Jane Smith', role: 'cleaning 2th floor', avatarUrl: '/path-to-avatar2.png' },
        { name: 'Mike Johnson', role: 'first day ', avatarUrl: '/path-to-avatar3.png' },
    ];

    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                <Sidebar />

                <Flex direction="column" flex="1" p={8} bg="gray.800" borderRadius="md" boxShadow="md">
                    <Heading as="h1" size="lg" mb={6} textAlign="center" >
                        Team Schedule for {currentDate}
                    </Heading>

                    <VStack
                        spacing={4}
                        align="stretch"
                        divider={<StackDivider borderColor="pink.800" />}
                    >
                        {scheduledTeamMembers.map((member, index) => (
                            <Flex
                                key={index}
                                p={4}
                                bg="white"
                                borderRadius="md"
                                boxShadow="sm"
                                align="center"
                                _hover={{ bg: 'gray.100', boxShadow: 'md' }}
                            >
                                <Avatar size="md" name={member.name} src={member.avatarUrl} mr={4} />
                                <Box>
                                    <Text fontWeight="bold" fontSize="lg" color="gray.700">
                                        {member.name}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        {member.role}
                                    </Text>
                                    
                                </Box>
                                <Box ml="auto">
                                    <Text fontSize="sm" color="gray.500">
                                        Start Time: 9:00 AM
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        End Time: 5:00 PM
                                    </Text>
                                </Box>
                                
                            </Flex>
                        ))}
                    </VStack>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Team;
