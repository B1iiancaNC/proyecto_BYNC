const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(cors()); 

const MONGO_URI = "mongodb+srv://BiancaNevarez:bianyn11@freya123.fttg6lp.mongodb.net/?appName=freya123";

mongoose.connect(MONGO_URI)
    .then(() => console.log("¡Conectado exitosamente a MongoDB! 🚀"))
    .catch(err => console.error("Error al conectar a MongoDB:", err));

const PacienteSchema = new mongoose.Schema({
    nombre: String,
    edad: String,
    sexo: String,
    ocupacion: String,
    diagnostico: String,
    tratamiento: String 
});

const Paciente = mongoose.model('Paciente', PacienteSchema);

// 1. RUTA PARA GUARDAR (POST)
app.post('/api/pacientes', async (req, res) => {
    try {
        const nuevoPaciente = new Paciente(req.body);
        await nuevoPaciente.save();
        res.json({ mensaje: "Paciente guardado en MongoDB correctamente", paciente: nuevoPaciente });
    } catch (error) {
        res.status(500).json({ error: "No se pudo registrar en la base de datos" });
    }
});

// 2. RUTA PARA OBTENER TODOS LOS PACIENTES (GET)
app.get('/api/pacientes', async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pacientes" });
    }
});

// 3. RUTA PARA ELIMINAR UN PACIENTE (DELETE)
app.delete('/api/pacientes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Paciente.findByIdAndDelete(id);
        res.json({ mensaje: "Paciente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el paciente" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor Backend corriendo en http://localhost:${PORT}`));
