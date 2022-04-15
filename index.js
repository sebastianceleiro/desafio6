const socket = io();

socket.on ("productos", data => {
   
const html = data.productos.map (producto => {
        
        return (`<tr>
                        <td><img src="${producto.thumbnail}" width=30 height=30 </td>
                        <td> ${producto.title}</td>
                        <td>$${producto.price}</td> 
                </tr>`) })

document.getElementById("productos").innerHTML = html.join("") ;
})


socket.on ("mensajes", data => {
   
        const template = Handlebars.compile(
                ` {{#each data.mensajes}}
                 <tr>
                        <td class="usuario"><b> {{this.usuario}}</b></td>
                        <td class="hora"> [{{this.hora}}]</td>
                        <td class="mensaje"> {{this.contenido}}</td>
                 </tr>
                 {{/each}}`)
        const html3 = template({data});
        document.getElementById('mensajes').innerHTML = html3;
        })        

        /* Resuelto sin Handlebars
        const html2 = data.mensajes.map (mensaje => {
                
                return (`<tr>
                                <td class="usuario"><b>${mensaje.usuario}:</b></td>
                                <td class="hora">[${mensaje.hora}] </td>
                                <td class="mensaje">${mensaje.contenido}</td>     
                        </tr>`) })
        
        document.getElementById("mensajes").innerHTML = html2.join("") ;
        })
        */
        
function agregarMensaje(e) {
        const mensaje = {
                usuario : document.getElementById("inputMail").value,
                hora : new Date ().toLocaleString(),
                contenido: document.getElementById("inputContenido").value }

        socket.emit ("nuevoMensaje", mensaje)
}