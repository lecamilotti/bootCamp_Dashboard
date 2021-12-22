import { Avatar, Flex, Box, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
            <Box mr="4" textAlign="right">
              <Text>Leandro Camilotti</Text>
              <Text color="gray.300" fontSize="small">
                lecamilotti@gmail.com
              </Text>
          </Box>
          <Avatar size="md" name="Leandro Camilotti" src="https://github.com/lecamilotti.png" />
          </Flex>
  )
}