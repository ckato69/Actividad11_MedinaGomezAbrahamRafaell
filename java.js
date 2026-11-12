class RolloAuditado {
    constructor(id, totales, defecto) {
        this.idRollo = id;
        this.metrosTotales = totales;
        this.metrosDefecto = defecto;
    }

    // 2. Calcular porcentaje de defecto/merma
    calcularPorcentaje() {
        return ((this.metrosDefecto / this.metrosTotales) * 100).toFixed(2);
    }
}
const btn = document.getElementById("btnAuditar");
const tabla = document.getElementById("tablaMermas");
let rollos = [];

// Cargar datos al iniciar
document.addEventListener("DOMContentLoaded", renderizar);

btn.addEventListener("click", () => {
    const id = document.getElementById("idRollo").value;
    const totales = parseFloat(document.getElementById("mtsTotales").value);
    const defecto = parseFloat(document.getElementById("mtsDefecto").value);

    // 3. Validación preventiva
    if (defecto > totales) {
        alert("¡Error! Los metros con defecto no pueden superar a los metros totales.");
        return;
    }

    if (!id || isNaN(totales) || isNaN(defecto)) {
        alert("Por favor, llena todos los campos correctamente.");
        return;
    }

    // Crear objeto y guardar
    const nuevoRollo = new RolloAuditado(id, totales, defecto);
    rollos.push(nuevoRollo);
    
    localStorage.setItem("rollos", JSON.stringify(rollos));
    renderizar();
    
    // Limpiar inputs
    document.getElementById("idRollo").value = "";
    document.getElementById("mtsTotales").value = "";
    document.getElementById("mtsDefecto").value = "";
});

// 4. Renderizar tabla en el DOM
function renderizar() {
    tabla.innerHTML = "";
    rollos.forEach(r => {
        // Reconstruimos el objeto para usar su método
        const rollo = new RolloAuditado(r.idRollo, r.metrosTotales, r.metrosDefecto);
        const porcentaje = rollo.calcularPorcentaje();
        
        tabla.innerHTML += `
            <tr>
                <td>${rollo.idRollo}</td>
                <td>${rollo.metrosTotales} m</td>
                <td>${porcentaje}%</td>
                <td>${porcentaje > 5 ? '<span class="badge bg-danger">Rechazado</span>' : '<span class="badge bg-success">Aprobado</span>'}</td>
            </tr>
        `;
    });
}