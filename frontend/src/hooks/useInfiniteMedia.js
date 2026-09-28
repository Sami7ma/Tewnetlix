import { useCallback, useEffect, useRef, useState } from "react";

function useInfiniteMedia(fetchPage, filters) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [reloadKey, setReloadKey] = useState(0);
    const observerRef = useRef(null);
    const requestRef = useRef(null);

    const retry = useCallback(() => {
        setReloadKey(key => key + 1);
    }, []);

    const loadMore = useCallback(async () => {
        if (loading || loadingMore || page >= totalPages) {
            return;
        }

        requestRef.current?.abort();
        const controller = new AbortController();
        requestRef.current = controller;
        setLoadingMore(true);

        try {
            const data = await fetchPage({
                ...filters,
                page: page + 1,
                signal: controller.signal,
            });

            if (!controller.signal.aborted) {
                setItems(previous => [...previous, ...(data.results || [])]);
                setPage(page + 1);
            }
        } catch (requestError) {
            if (requestError.name !== "AbortError") {
                console.error("Failed to load more media:", requestError);
                setError(requestError);
            }
        } finally {
            if (!controller.signal.aborted) {
                setLoadingMore(false);
            }
        }
    }, [fetchPage, filters, loading, loadingMore, page, totalPages]);

    useEffect(() => {
        const controller = new AbortController();
        requestRef.current?.abort();
        requestRef.current = controller;

        async function loadFirstPage() {
            setLoading(true);
            setError(null);
            setPage(1);
            setTotalPages(1);

            try {
                const data = await fetchPage({
                    ...filters,
                    page: 1,
                    signal: controller.signal,
                });

                if (!controller.signal.aborted) {
                    setItems(data.results || []);
                    setTotalPages(data.total_pages || 1);
                }
            } catch (requestError) {
                if (requestError.name !== "AbortError") {
                    console.error("Failed to load media:", requestError);
                    setItems([]);
                    setError(requestError);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadFirstPage();

        return () => controller.abort();
    }, [fetchPage, filters, reloadKey]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0]?.isIntersecting) {
                    loadMore();
                }
            },
            { rootMargin: "500px" },
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [loadMore]);

    return {
        items,
        loading,
        loadingMore,
        error,
        page,
        totalPages,
        loadMore,
        retry,
        observerRef,
    };
}

export default useInfiniteMedia;
