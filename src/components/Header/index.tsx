import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBar } from "./SearchBar";


export function Header() {

  const {onOpen} = useSidebarDrawer();
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  })
  return (
    <Flex as="header" w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center">

        {!isWideVersion && (
          <IconButton
          aria-label="open toggle menu"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
          ></IconButton>
        )}
      <Logo isLogin={false}/>

      <Flex align="center" ml="auto">
       {isWideVersion && <SearchBar />}
        <NotificationsNav/>
        <Profile showProfileData={isWideVersion}/>
      </Flex>
    </Flex>
  );
}
