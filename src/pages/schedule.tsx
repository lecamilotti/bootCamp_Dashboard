import React, { useEffect, useState } from 'react';
import {
    Box, Button, Flex, Text, Table, Thead, Tbody, Tr, Th, Td, VStack, useBreakpointValue,
    Icon,
} from "@chakra-ui/react";
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { RiFindReplaceFill, RiArrowGoBackLine, RiCalendar2Fill } from 'react-icons/ri';

type User = {
    id: string;
    name: string;
    email: string;
};

type Schedule = {
    date: Date;
    time: string;
};

export default function Schedule() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [schedule, setSchedule] = useState<Schedule[]>([]);
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        // Fetch the list of users from the server
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data.users))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
        // Fetch the schedule for the selected user from the server
        fetch(`/api/users/${user.id}/schedule`)
            .then(response => response.json())
            .then(data => setSchedule(data.schedule))
            .catch(error => console.error('Error fetching schedule:', error));
    };

    const handleDateChange = (newDate: Date) => {
        setDate(newDate);
    };

    const handleAddSchedule = () => {
        if (selectedUser && date) {
            const newSchedule = { date, time: '9:00 AM - 5:00 PM' };
            setSchedule([...schedule, newSchedule]);
            console.log(`Added schedule for ${selectedUser.name}:`, newSchedule);

            // Save the schedule to the server
            // Example:
            // axios.post(`/api/users/${selectedUser.id}/schedule`, newSchedule);
        }
    };

    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                <Sidebar />

                <Flex direction="column" flex="1" align="center">
                    {!selectedUser ? (
                        <>
                            <Text fontSize="2xl" fontWeight="bold" mb="8" textAlign="center">
                                Select an Employee to Check and Create Their Schedule
                            </Text>

                            <VStack w="100%" align="stretch" spacing="8">
                                <Box>
                                    <Text fontSize="xl" mb="4">Employee List</Text>
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>Name</Th>
                                                <Th>Email</Th>
                                                <Th>Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {users.map((user) => (
                                                <Tr key={user.id}>
                                                    <Td>{user.name}</Td>
                                                    <Td>{user.email}</Td>
                                                    <Td>
                                                        <Button
                                                            as="a"
                                                            size="sm"
                                                            fontSize="sm"
                                                            colorScheme="pink"
                                                            leftIcon={<Icon as={RiFindReplaceFill} fontSize="18" />}
                                                            onClick={() => handleUserClick(user)}
                                                        >

                                                            View Schedule
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Box>
                            </VStack>
                        </>
                    ) : (
                        <Box w="100%" px={4}>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="purple"
                                leftIcon={<Icon as={RiArrowGoBackLine} fontSize="20" />}
                                onClick={() => setSelectedUser(null)}
                            >
                                Back
                            </Button>
                            <Text fontSize="xl" mb="4" textAlign="center">
                                Schedule for {selectedUser.name}
                            </Text>
                            <Box
                                w='100%'
                                mx="auto"

                                p={4}
                                borderRadius="md"
                            >
                                <Calendar
                                    className={
                                        {
                                            backgroundColor: 'teal',
                                            color: 'white',
                                        }}
                                    onChange={handleDateChange}
                                    value={date}
                                    tileContent={({ date }) => {
                                        const isScheduled = schedule.some(
                                            (sch) => new Date(sch.date).toDateString() === date.toDateString()
                                        );
                                        return isScheduled ? (
                                            <Box bg="teal.500" w="100%" h="100%" borderRadius="md"></Box>
                                        ) : null;
                                    }}
                                />

                                <Button
                                   mt='4'
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="purple"
                                    onClick={handleAddSchedule}
                                    leftIcon={<Icon as={RiCalendar2Fill} fontSize="20" />}
                                    disabled={!date}
                                    w="full"
                                >
                                    Add Schedule
                                </Button>

                                <Box mt="6">
                                    <Text fontSize="lg" mb="4">Current Schedule:</Text>
                                    <VStack align="start" spacing={3}>
                                        {schedule.map((sch, index) => (
                                            <Text key={index}>
                                                {new Date(sch.date).toDateString()} - {sch.time}
                                            </Text>
                                        ))}
                                    </VStack>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
}
