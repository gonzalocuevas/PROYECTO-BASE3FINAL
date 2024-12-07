import { engine } from 'express-handlebars';
import express from 'express';
import rutas from "./src/rutas.js";

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine({
  helpers: {
    eq: (a, b) => a === b
  }
}));

app.use(rutas);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});