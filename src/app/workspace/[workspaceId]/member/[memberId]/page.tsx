"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { AlertTriangle, Loader } from "lucide-react";

import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { Id } from "../../../../../../convex/_generated/dataModel";

import { useCreateOrGetConversation } from "@/features/conversations/api/use-create-or-get-conversation";

import { Conversation } from "@/app/workspace/[workspaceId]/member/[memberId]/conversation";

const MemberIdPage = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();

  const [conversationId, setConversationId] =
    useState<Id<"conversations"> | null>(null);

  const { mutate, isPending } = useCreateOrGetConversation();

  useEffect(() => {
    mutate(
      { memberId, workspaceId },
      {
        onSuccess: (data) => {
          setConversationId(data);
        },
        onError: () => {
          toast.error("Failed to create or get conversation");
        },
      }
    );
  }, [memberId, mutate, workspaceId]);

  if (isPending) {
    return (
      <div className="h-full flex justify-center items-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!conversationId) {
    return (
      <div className="h-full flex flex-col gap-y-2 justify-center items-center">
        <AlertTriangle className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Conversation not found
        </span>
      </div>
    );
  }

  return <Conversation id={conversationId} />;
};

export default MemberIdPage;
