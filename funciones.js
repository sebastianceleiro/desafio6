import productos from './productos.js'

class listadoProductos {

    nuevoIngreso(req,res) {
        const nuevoProducto = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail,
            id: productos.length+1
        }
        productos.push(nuevoProducto)
        res.redirect('/');
    }

}

export default listadoProductos ;