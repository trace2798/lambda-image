"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { Skeleton } from "./ui/skeleton";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Invalid JSON from", url, "\n—— raw text ——\n", text);
    throw e;
  }
};

export default function SidebarImages() {
  const { workspaceId, imagePublicId } = useParams();
  const router = useRouter();
  const [cursor, setCursor] = useState<string | null>(null);

  const { data, error, isLoading, mutate } = useSWR(
    () =>
      workspaceId
        ? `https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/workspace/${workspaceId}/images?limit=10${
            cursor ? `&before=${encodeURIComponent(cursor)}` : ""
          }`
        : null,
    fetcher,
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const [allImages, setAllImages] = useState<any[]>([]);
  useEffect(() => {
    if (data?.images) {
      setAllImages((prev) => {
        const ids = new Set(prev.map((i) => i.id));
        const newOnes = data.images.filter((i: any) => !ids.has(i.id));
        return [...prev, ...newOnes];
      });
    }
  }, [data?.images]);

  const nextCursor: string | null = data?.nextCursor ?? null;

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const workspacePublicId = data?.workspacePublicId;
  const onIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      const first = entries[0];
      if (first.isIntersecting && nextCursor && !isLoading) {
        setCursor(nextCursor);
      }
    },
    [nextCursor, isLoading]
  );

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [onIntersect]);

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Failed to load images: {error.message}
      </div>
    );
  }
  if (isLoading && allImages.length === 0) {
    return (
      <div className="flex flex-col space-y-2 p-4">
        <Skeleton className="w-3/4 h-3" />
        <Skeleton className="w-2/3 h-3" />
      </div>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Images</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col space-y-3">
          {allImages.map((img) => {
            const isActive = img.publicId === imagePublicId;
            return (
              <SidebarMenuItem key={img.id}>
                <SidebarMenuButton asChild>
                  <div
                    onClick={() =>
                      router.push(`/${workspaceId}/${img.publicId}`)
                    }
                    className={
                      "flex items-center space-x-2 hover:cursor-pointer " +
                      (isActive ? "text-primary" : "text-primary/80")
                    }
                  >
                    <HoverCard>
                      <HoverCardTrigger className="flex items-center space-x-1">
                        {" "}
                        <img
                          src={`https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/${workspacePublicId}/${img.publicId}/w=25,h=25`}
                          alt={img.alt ?? "no alt provided"}
                          className="rounded-sm object-cover"
                        />
                        <span className="font-medium">{img.publicId}</span>
                      </HoverCardTrigger>
                      <HoverCardContent className="p-0 size-[150px]">
                        <img
                          src={`https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/${workspacePublicId}/${img.publicId}/w=250,h=250`}
                          alt={img.alt ?? "no alt provided"}
                          className="rounded-sm object-cover"
                        />
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}

          {nextCursor && (
            <div
              ref={sentinelRef}
              className="h-8 flex items-center justify-center"
            >
              {isLoading ? "Loading more..." : "Scroll to load more"}
            </div>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
