"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

const Home = () => {
  const router = useRouter();
  const { data, isLoading } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkspaceModal();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    } else {
      console.log("Open creation modal");
    }
  }, [isLoading, open, router, setOpen, workspaceId]);

  return (
    <div>
      <UserButton />
    </div>
  );
};

export default Home;
