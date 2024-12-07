import { Router } from "express";
import {obtenerClientes,crearCliente,actualizarCliente,eliminarCliente,obtenerEmpleados,crearEmpleado,actualizarEmpleado,eliminarEmpleado,obtenerInsumos,obtenerJefesProduccion,
obtenerLineasProduccion,obtenerPedidos,crearPedido,actualizarPedido,eliminarPedido,obtenerProduccionInsumos,obtenerPuntosEntrega,crearPuntoEntrega,editarPuntoEntrega,eliminarPuntoEntrega,
obtenerTransportes} from "./controladores.js";
import pool from "./database.js";

const router = Router();

// Ruta para redirigir a consultas como vista principal.
router.get("/", (req, res) => {
    res.redirect("/consultas");
});

//Rutas para clientes.
router.get("/clientes", obtenerClientes);
router.post("/crearCliente", crearCliente);
router.post("/editarCliente", actualizarCliente);
router.post("/borrarCliente", eliminarCliente);

//Rutas para empleados.
router.get('/empleados', obtenerEmpleados);
router.post('/crearEmpleado', crearEmpleado);
router.post('/editarEmpleado', actualizarEmpleado);
router.post('/borrarEmpleado', eliminarEmpleado);

//Ruta para insumos.
router.get("/insumos", obtenerInsumos);

//Ruta jefes de producción.
router.get("/jefesdeproduccion", obtenerJefesProduccion);

//Ruta lineas de producción.
router.get("/lineasdeproduccion", obtenerLineasProduccion);

//Ruta pedidos.
router.get('/pedidos', obtenerPedidos);
router.post('/crearPedido', crearPedido);
router.post('/editarPedido', actualizarPedido);
router.post('/borrarPedido', eliminarPedido);

//Ruta produccioninsumos.
router.get('/produccionInsumos', obtenerProduccionInsumos);

//Rutas puntos de entrega.
router.get("/puntosEntrega", obtenerPuntosEntrega);
router.post("/crearPuntoEntrega", crearPuntoEntrega);
router.post("/editarPuntoEntrega", editarPuntoEntrega);
router.post("/borrarPuntoEntrega", eliminarPuntoEntrega);

// Ruta para obtener los transportes
router.get('/transporte', obtenerTransportes);

router.get('/consultas', (req, res) => {
    res.render('consultas');
});

// Ruta para manejar todas las consultas en la vista consultas.
router.post('/consultas', async (req, res) => {
    const consulta = req.body.consulta;

    let query;
    let params = [];

    switch(consulta) {
        case 'consulta1': //¿Qué pedidos ha realizado un cliente específico, incluyendo la fecha, variedad y cantidad de vino solicitados?.
            query = `
                SELECT Pedido.id_pedido, Pedido.fecha_pedido, Pedido.variedad_vino, Pedido.cantidad_total
                FROM Pedido
                JOIN Cliente ON Pedido.cliente_id = Cliente.id_cliente
                WHERE Cliente.nombre_cliente = ?`;
            params = [req.body.nombre_cliente];
            break;

        case 'consulta2': //¿Qué línea de producción está asignada para producir una variedad de vino específica?.
            query = `
                SELECT LineaProduccion.id_linea, LineaProduccion.nombre_linea
                FROM Pedido
                JOIN LineaProduccion ON Pedido.linea_produccion_id = LineaProduccion.id_linea
                WHERE Pedido.variedad_vino = ?`;
            params = [req.body.variedad_vino];
            break;

        case 'consulta3': //¿Cuál fue la cantidad de vino producida en una línea específica en un día determinado?.
            query = `
                SELECT Pedido.fecha_pedido, Pedido.cantidad_total
                FROM Pedido
                WHERE Pedido.fecha_pedido = ? AND Pedido.linea_produccion_id = ?`;
            params = [req.body.fecha_pedido, req.body.id_linea_produccion];
            break;

        case 'consulta4': //¿Qué camiones están disponibles para el transporte hoy?.
            query = `SELECT id_camion, capacidad_camion FROM Transporte WHERE disponibilidad = 'Disponible'`;
            break;

        case 'consulta5': //¿Cuánta cantidad de corchos hay disponible en el inventario?.
            query = `SELECT stock_actual FROM Insumo WHERE nombre_insumo = 'Corchos'`;
            break;

        case 'consulta6': //¿Qué jefe de producción está asignado a una línea de producción específica?.
            query = `SELECT * FROM JefeProduccion WHERE linea_asignada_id = ?`;
            params = [req.body.id_linea];
            break;

        case 'consulta7': //¿Qué cantidad de vino se produjo ayer en todas las líneas?.
            query = `
                SELECT SUM(Pedido.cantidad_total) AS Total_producido
                FROM Pedido
                WHERE Pedido.fecha_pedido = CURDATE() - INTERVAL 1 DAY`;
            break;

        case 'consulta8': //¿Cuáles son los pedidos pendientes de entrega?.
            query = `SELECT * FROM Pedido WHERE estado_pedido = 'Pendiente'`;
            break;

        case 'consulta9': //¿En qué turno trabaja un operador específico?.
            query = `SELECT nombre_empleado, turno FROM Empleado WHERE nombre_empleado = ?`;
            params = [req.body.nombre_empleado];
            break;

        case 'consulta10': //¿Qué línea de producción tiene la mayor capacidad?.
            query = `SELECT id_linea, nombre_linea, capacidad_maxima FROM LineaProduccion ORDER BY capacidad_maxima DESC LIMIT 1`;
            break;

        default:
            return res.status(400).send('Consulta no válida');
    }

    try {
        const [results] = await pool.execute(query, params);
        res.render('consultas', { resultados: results });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la consulta');
    }
});

export default router;