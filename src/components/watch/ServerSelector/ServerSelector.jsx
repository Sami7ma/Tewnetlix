import "./ServerSelector.css";

const ServerSelector = ({ servers, selectedServer, setSelectServer }) => {
    return (
        <section className="server-selector">
            {servers.map(server => (
                <button
                    key={server.id}
                    onClick={() => setSelectServer(server.id)}
                    className={
                        selectedServer === server.id 
                        ? "server-button active" 
                        : "server-button"}
                >
                    {server.name}
                </button>
            ))}
        </section>
    );

}
export default ServerSelector;