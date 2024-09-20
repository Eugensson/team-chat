import {
  AlertTriangle,
  Hash,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";

import { useMemberId } from "@/hooks/use-member-id";
import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { UserItem } from "@/app/workspace/[workspaceId]/user-item";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { SidebarItem } from "@/app/workspace/[workspaceId]/sidebar-item";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { WorkspaceHeader } from "@/app/workspace/[workspaceId]/workspace-header";
import { WorkspaceSection } from "@/app/workspace/[workspaceId]/workspace-section";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";

export const WorkspaceSidebar = () => {
  const memberId = useMemberId();
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  if (workspaceLoading || memberLoading || channelsLoading || membersLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full bg-[#5e2c5f]">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col justify-center items-center gap-y-2 h-full bg-[#5e2c5f]">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-sm text-white">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#5e2c5f]">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Draft & Sent" icon={SendHorizonal} id="drafts" />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={member.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={Hash}
            label={item.name}
            id={item._id}
            variant={item._id === channelId ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="New direct message"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
            variant={item._id === memberId ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
