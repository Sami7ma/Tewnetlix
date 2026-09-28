import "./ServerSelector.css";
import GlassSurface from "../../ui/GlassSurface/GlassSurface";
import Button from "../../ui/Button/Button";


const ServerSelector = ({servers, selectedServer, onChange}) => {

return (
<GlassSurface as="section" className="server-selector" strength="subtle" aria-label="Video servers">

{
servers.map(server => (

<Button
type="button"
variant={selectedServer === server.id ? "primary" : "secondary"}
key={server.id}
className={
selectedServer === server.id
? "server-button active"
: "server-button"
}
onClick={()=>onChange(server.id)}
aria-pressed={selectedServer === server.id}
>

{server.name}

</Button>

))
}

</GlassSurface>

);

}


export default ServerSelector;