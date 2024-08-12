import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
    <NavSection title="GENERAL">
      <NavLink icon={RiDashboardLine} href="/dashboard">Dashbord</NavLink>
      <NavLink icon={RiContactsLine} href="/users">Users</NavLink>
    </NavSection>
    <NavSection title="ADMIN">
      <NavLink icon={RiInputMethodLine} href="/team">Working team</NavLink>
      <NavLink icon={RiGitMergeLine} href="/schedule">Schedule</NavLink>
    </NavSection>
  </Stack>
  );
}