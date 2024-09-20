import { Loader } from "lucide-react";

import { usePanel } from "@/hooks/use-panel";
import { useMemberId } from "@/hooks/use-member-id";

import { useGetMember } from "@/features/members/api/use-get-member";
import { useGetMessages } from "@/features/messages/api/use-get-messages";

import { Id } from "../../../../../../convex/_generated/dataModel";

import { MessageList } from "@/components/message-list";
import { Header } from "@/app/workspace/[workspaceId]/member/[memberId]/header";
import { ChatInput } from "@/app/workspace/[workspaceId]/member/[memberId]/chat-input";

interface ConversationProps {
  id: Id<"conversations">;
}

export const Conversation: React.FC<ConversationProps> = ({ id }) => {
  const memberId = useMemberId();

  const { onOpenProfile } = usePanel();

  const { data: member, isLoading: memberLoading } = useGetMember({
    id: memberId,
  });

  const { results, status, loadMore } = useGetMessages({
    conversationId: id,
  });

  if (memberLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex justify-center items-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // return (
  //   <div className="h-full flex flex-col">
  //     <Header
  //       memberName={member?.user.name}
  //       memberImage={member?.user.image}
  //       onClick={() => onOpenProfile(memberId)}
  //     />
  //     <MessageList
  //       data={results}
  //       variant="conversation"
  //       loadMore={loadMore}
  //       memberName={member?.user.name}
  //       memberImage={member?.user.image}
  //       isLoardingMore={status === "LoadingMore"}
  //       canLoadMore={status === "CanLoadMore"}
  //     />
  //     <ChatInput
  //       placeholder={`Message ${member?.user.name}`}
  //       conversationId={id}
  //     />
  //   </div>
  // );

  return (
    <div className="h-full flex flex-col">
      {member && "user" in member ? (
        <>
          <Header
            memberName={member.user.name}
            memberImage={member.user.image}
            onClick={() => onOpenProfile(memberId)}
          />
          <MessageList
            data={results}
            variant="conversation"
            loadMore={loadMore}
            memberName={member.user.name}
            memberImage={member.user.image}
            isLoardingMore={status === "LoadingMore"}
            canLoadMore={status === "CanLoadMore"}
          />
          <ChatInput
            placeholder={`Message ${member.user.name}`}
            conversationId={id}
          />
        </>
      ) : (
        <div>Member data is not available</div>
      )}
    </div>
  );
};
