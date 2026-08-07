import "./ServerSelector.css";


const ServerSelector = ({servers, selectedServer, onChange}) => {

return (

<section className="server-selector">

{
servers.map(server => (

<button
key={server.id}
className={
selectedServer === server.id
? "server-button active"
: "server-button"
}
onClick={()=>onChange(server.id)}
>

{server.name}

</button>

))
}

</section>

);

}


export default ServerSelector;