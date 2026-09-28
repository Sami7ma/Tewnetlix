import { useCallback, useEffect, useState } from "react";

function useMediaDetails(loadDetails, dependencies) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);
    const [resolvedKey, setResolvedKey] = useState("");
    const [errorKey, setErrorKey] = useState("");
    const dependencyKey = JSON.stringify(dependencies);

    const retry = useCallback(() => {
        setReloadKey(key => key + 1);
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const requestKey = `${dependencyKey}:${reloadKey}`;

        loadDetails(controller.signal)
            .then(result => {
                if (!controller.signal.aborted) {
                    setData(result);
                    setError(null);
                    setResolvedKey(requestKey);
                    setErrorKey("");
                }
            })
            .catch(requestError => {
                if (requestError.name !== "AbortError" && !controller.signal.aborted) {
                    console.error("Failed to load media details:", requestError);
                    setError(requestError);
                    setErrorKey(requestKey);
                    setResolvedKey(requestKey);
                }
            })

        return () => controller.abort();
    }, [dependencyKey, loadDetails, reloadKey]);

    const requestKey = `${dependencyKey}:${reloadKey}`;
    const loading = resolvedKey !== requestKey && errorKey !== requestKey;
    const visibleError = errorKey === requestKey ? error : null;

    return { data, loading, error: visibleError, retry };
}

export default useMediaDetails;
