import { Text } from "@chakra-ui/react";

export function Logo({isLogin}) {
  return (
    <Text fontSize={["2xl", "3xl"]} fontWeight="bold" letterSpacing="tight" w="64">
      TimePlan 
      <Text as="span" ml="1" color="pink.500">
        . {isLogin ? 'Login' : ''}
      </Text>
    </Text>
  );
}
