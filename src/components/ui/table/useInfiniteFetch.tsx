import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import { type UIEventHandler, useCallback, useEffect, useRef } from "react";

interface Props<TData> {
  infiniteQuery: UseInfiniteQueryResult<TData>;
  // biome-ignore lint/suspicious/noExplicitAny: we just want the length
  flatData: any[] | ((queryData: TData | undefined) => any[]);
  totalItems?: number;
}
export function useInfiniteFetch<TData>({
  flatData,
  infiniteQuery,
  totalItems,
}: Props<TData>) {
  const ref = useRef<HTMLDivElement>(null);
  const { fetchNextPage, isFetching } = infiniteQuery;

  const totalDBRowCount = totalItems ?? 0;
  const totalFetched =
    typeof flatData === "function"
      ? flatData(infiniteQuery.data).length
      : flatData.length;
  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  );

  const bottomFetchFn: UIEventHandler<HTMLDivElement> = useCallback(
    (e) => fetchMoreOnBottomReached(e.currentTarget),
    [fetchMoreOnBottomReached],
  );

  useEffect(() => {
    fetchMoreOnBottomReached(ref.current);
  }, [fetchMoreOnBottomReached]);

  return { bottomFetchFn, ref };
}
