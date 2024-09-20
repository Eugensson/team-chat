import { usePathname } from "next/navigation";
import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";

import { UserButton } from "@/features/auth/components/user-button";
import { SidebarButton } from "@/app/workspace/[workspaceId]/sidebar-button";
import { WorkspaceSwitcher } from "@/app/workspace/[workspaceId]/workspace-switcher";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col items-center gap-y-4 pt-[9px] pb-1">
      <WorkspaceSwitcher />
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/workspace")}
      />
      <SidebarButton icon={MessagesSquare} label="DMs" />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="flex flex-col justify-center items-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
