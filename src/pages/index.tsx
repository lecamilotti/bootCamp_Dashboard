import { Button, Flex, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w='100%'
        maxW={360}
        bg="gray.700" 
        p="8" 
        borderRadius={8}
        flexDirection="column"
      >
        <Stack spacing={4}>
          <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          name="email"
          type="email"
          id="email"
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          _hover={ { bg: "gray.900" } }
          size='lg'
        />
        </FormControl>
        <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          name="password"
          type="password"
          id="password"
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          _hover={ { bg: "gray.900" } }
          size='lg'

        />
       </FormControl>
        </Stack>
        <Button type='submit' mt={6} colorScheme="pink" size='lg'>Enter</Button>
      
      </Flex>
    </Flex>
  );
}
