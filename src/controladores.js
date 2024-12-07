import pool from "./database.js";

// Controlador para obtener clientes
const obtenerClientes = async (req, res) => {
  const query = `SELECT * FROM Cliente`;
  try {
    const [rows] = await pool.query(query);
    res.render("clientes", { clientes: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener clientes");
  }
};

// Controlador para insertar un cliente
const crearCliente = async (req, res) => {
  const { nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente } = req.body;
  const query = `
    INSERT INTO Cliente (nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente)
    VALUES (?, ?, ?, ?)
  `;
  try {
    await pool.query(query, [nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente]);
    res.redirect("/clientes");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear cliente");
  }
};

// Controlador para actualizar un cliente
const actualizarCliente = async (req, res) => {
  const { id_cliente, nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente } = req.body;
  const query = `
    UPDATE Cliente
    SET nombre_cliente = ?, direccion_cliente = ?, telefono_cliente = ?, correo_cliente = ?
    WHERE id_cliente = ?
  `;
  try {
    await pool.query(query, [nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente, id_cliente]);
    res.redirect("/clientes");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar cliente");
  }
};

// Controlador para eliminar un cliente
const eliminarCliente = async (req, res) => {
  const { id_cliente } = req.body;
  const query = `DELETE FROM Cliente WHERE id_cliente = ?`;
  try {
    await pool.query(query, [id_cliente]);
    res.redirect("/clientes");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar cliente");
  }
};

// Controlador para obtener empleados
const obtenerEmpleados = async (req, res) => {
  const query = `SELECT * FROM Empleado`;
  try {
    const [rows] = await pool.query(query);
    res.render("empleados", { empleados: rows, activePage: 'empleado' });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener empleados");
  }
};

// Controlador para insertar un nuevo empleado
const crearEmpleado = async (req, res) => {
  const { nombre_empleado, turno, linea_asignada_id, rol } = req.body;
  const query = `
    INSERT INTO Empleado (nombre_empleado, turno, linea_asignada_id, rol)
    VALUES (?, ?, ?, ?)
  `;
  try {
    await pool.query(query, [nombre_empleado, turno, linea_asignada_id, rol]);
    res.redirect("/empleados"); // Redirige a la lista de empleados
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear empleado");
  }
};

// Controlador para actualizar un empleado
const actualizarEmpleado = async (req, res) => {
  const { id_empleado, nombre_empleado, turno, linea_asignada_id, rol } = req.body;
  const query = `
    UPDATE Empleado
    SET nombre_empleado = ?, turno = ?, linea_asignada_id = ?, rol = ?
    WHERE id_empleado = ?
  `;
  try {
    await pool.query(query, [nombre_empleado, turno, linea_asignada_id, rol, id_empleado]);
    res.redirect("/empleados");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar empleado");
  }
};

// Controlador para eliminar un empleado
const eliminarEmpleado = async (req, res) => {
  const { id_empleado } = req.body;
  const query = `DELETE FROM Empleado WHERE id_empleado = ?`;
  try {
    await pool.query(query, [id_empleado]);
    res.redirect("/empleados");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar empleado");
  }
};

// Controlador para obtener los insumos
const obtenerInsumos = async (req, res) => {
  const query = `SELECT * FROM Insumo`;
  try {
    const [rows] = await pool.query(query);
    res.render("insumos", { insumos: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener insumos");
  }
};

// Controlador para obtener los jefes de producción
const obtenerJefesProduccion = async (req, res) => {
  const query = `SELECT * FROM JefeProduccion`;
  try {
    const [rows] = await pool.query(query);
    res.render("jefesdeproduccion", { jefesdeproduccion: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener jefes de producción");
  }
};

// Controlador para obtener las lineas de producción
const obtenerLineasProduccion = async (req, res) => {
    const query = `SELECT * FROM LineaProduccion`;
    try {
      const [rows] = await pool.query(query);
      res.render("lineasdeproduccion", { lineasProduccion: rows });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al obtener líneas de producción");
    }
};

// Controlador para obtener pedidos
const obtenerPedidos = async (req, res) => {
  const query = `SELECT * FROM Pedido`;
  try {
    const [rows] = await pool.query(query);
    res.render("pedidos", { pedidos: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener pedidos");
  }
};

// Controlador para insertar pedidos
const crearPedido = async (req, res) => {
  const { cliente_id, cantidad_total, linea_produccion_id, variedad_vino, transporte_id } = req.body;
  const fecha_pedido = new Date().toISOString().slice(0, 10); // Asignar la fecha actual
  const estado_pedido = 'Pendiente'; // Estado inicial

  try {
      await pool.query(
          'INSERT INTO pedido (fecha_pedido, cliente_id, cantidad_total, linea_produccion_id, estado_pedido, variedad_vino, transporte_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [fecha_pedido, cliente_id, cantidad_total, linea_produccion_id, estado_pedido, variedad_vino, transporte_id]
      );
      res.redirect('/pedidos');
  } catch (err) {
      console.error(err);
      res.status(500).send('Error al crear el pedido');
  }
};

/// Controlador para actualizar pedidos
const actualizarPedido = async (req, res) => {
  const { id_pedido, cliente_id, cantidad_total, linea_produccion_id, variedad_vino, transporte_id } = req.body;

  try {
      await pool.query(
          'UPDATE pedido SET cliente_id = ?, cantidad_total = ?, linea_produccion_id = ?, variedad_vino = ?, transporte_id = ? WHERE id_pedido = ?',
          [cliente_id, cantidad_total, linea_produccion_id, variedad_vino, transporte_id, id_pedido]
      );
      res.redirect('/pedidos');
  } catch (err) {
      console.error(err);
      res.status(500).send('Error al editar el pedido');
  }
};

// Controlador para eliminar un pedido
const eliminarPedido = async (req, res) => {
  const { id_pedido } = req.body;
  const query = `DELETE FROM Pedido WHERE id_pedido = ?`;
  try {
    await pool.query(query, [id_pedido]);
    res.redirect("/pedidos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar pedido");
  }
};

// Controlador para obtener los datos de producción/insumos
const obtenerProduccionInsumos = async (req, res) => {
    const query = `SELECT * FROM ProduccionInsumo`;
    try {
        const [rows] = await pool.query(query);
        res.render('produccioninsumo', { produccioninsumos: rows });
    } catch (err) {
        console.error("Error al obtener los insumos de producción:", err);
        res.status(500).send("Error al obtener los insumos de producción");
    }
};

// Controlador para obtener puntos de entrega
const obtenerPuntosEntrega = async (req, res) => {
  const query = `SELECT * FROM PuntoEntrega`;
  try {
    const [rows] = await pool.query(query);
    res.render('puntosEntrega', { puntosEntrega: rows });
  } catch (err) {
    console.error("Error al obtener puntos de entrega:", err);
    res.status(500).send("Error al obtener puntos de entrega");
  }
};

// Controlador para crear nuevo punto de entrega
const crearPuntoEntrega = async (req, res) => {
  const { ubicacion, horario_recepcion, cliente_id, transporte_id } = req.body;
  const query = `INSERT INTO PuntoEntrega (ubicacion, horario_recepcion, cliente_id, transporte_id) VALUES (?, ?, ?, ?)`;
  try {
    await pool.query(query, [ubicacion, horario_recepcion, cliente_id, transporte_id]);
    res.redirect("/puntosEntrega");
  } catch (err) {
    console.error("Error al crear punto de entrega:", err);
    res.status(500).send("Error al crear punto de entrega");
  }
};

// Controlador para editar punto de entrega
const editarPuntoEntrega = async (req, res) => {
  const { id_punto_entrega, ubicacion, horario_recepcion, cliente_id, transporte_id } = req.body;
  const query = `UPDATE PuntoEntrega SET ubicacion = ?, horario_recepcion = ?, cliente_id = ?, transporte_id = ? WHERE id_punto_entrega = ?`;
  try {
    await pool.query(query, [ubicacion, horario_recepcion, cliente_id, transporte_id, id_punto_entrega]);
    res.redirect("/puntosEntrega");
  } catch (err) {
    console.error("Error al editar punto de entrega:", err);
    res.status(500).send("Error al editar punto de entrega");
  }
};

// Controlador para eliminar punto de entrega
const eliminarPuntoEntrega = async (req, res) => {
  const { id_punto_entrega } = req.body;
  const query = `DELETE FROM PuntoEntrega WHERE id_punto_entrega = ?`;
  try {
    await pool.query(query, [id_punto_entrega]);
    res.redirect("/puntosEntrega");
  } catch (err) {
    console.error("Error al eliminar punto de entrega:", err);
    res.status(500).send("Error al eliminar punto de entrega");
  }
};

// Controlador para obtener los transportes
const obtenerTransportes = async (req, res) => {
  const query = `SELECT * FROM Transporte`;
  try {
    const [rows] = await pool.query(query);
    res.render("transporte", { transportes: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener transportes");
  }
};

export {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    obtenerEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
    obtenerInsumos,
    obtenerJefesProduccion,
    obtenerLineasProduccion,
    obtenerPedidos,
    crearPedido,
    actualizarPedido,
    eliminarPedido,
    obtenerProduccionInsumos,
    obtenerPuntosEntrega,
    crearPuntoEntrega,
    editarPuntoEntrega,
    eliminarPuntoEntrega,
    obtenerTransportes
};