import GlassSurface from "../../ui/GlassSurface/GlassSurface";
import LoadingSpinner from "../../layout/LoadingSpinner/LoadingSpinner";
import ErrorState from "../../states/ErrorState/ErrorState";
import MediaList from "../../media/MediaList/MediaList";
import "./DiscoveryPage.css";

function DiscoveryPage({
    title,
    className,
    filters,
    results,
    loading,
    loadingMore,
    error,
    retry,
    page,
    totalPages,
    observerRef,
    onReset,
    emptyTitle,
}) {
    const pageClass = `${className}-page`;
    return (
        <main className={`discovery-page ${pageClass}`}>
            <section className="discovery-container">
                <header className="discovery-header">
                    <div>
                        <p className="discovery-eyebrow">Explore the library</p>
                        <h1>{title}</h1>
                    </div>
                    <GlassSurface
                        as="div"
                        className="discovery-toolbar"
                        strength="subtle"
                    >
                        {filters}
                        <button
                            className="discovery-reset"
                            type="button"
                            onClick={onReset}
                        >
                            Reset filters
                        </button>
                    </GlassSurface>
                </header>

                {loading ? (
                    <LoadingSpinner size="medium" text={`Loading ${title.toLowerCase()}...`} />
                ) : error ? (
                    <ErrorState message={`${title} could not be loaded.`} onAction={retry} />
                ) : (
                    <>
                        <MediaList movies={results} emptyTitle={emptyTitle} />
                        {page < totalPages && (
                            <div ref={observerRef} className="media-load-more">
                                {loadingMore && <LoadingSpinner size="small" text="Loading more..." />}
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}

export default DiscoveryPage;
