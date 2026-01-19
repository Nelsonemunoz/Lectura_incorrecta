document.addEventListener('DOMContentLoaded', function() {
    // Asignar fecha actual por defecto a la fecha del usuario
    const today = new Date();
    document.getElementById('fechaUsuario').valueAsDate = today;
    
    // Evento para calcular al hacer clic en el botón
    document.getElementById('calcular').addEventListener('click', calcularAjuste);
    
    function calcularAjuste() {
        // Obtener valores de los inputs
        const lecturaAnterior = parseFloat(document.getElementById('lecturaAnterior').value);
        const fechaAnterior = new Date(document.getElementById('fechaAnterior').value);
        const lecturaActual = parseFloat(document.getElementById('lecturaActual').value);
        const fechaActual = new Date(document.getElementById('fechaActual').value);
        const lecturaUsuario = parseFloat(document.getElementById('lecturaUsuario').value);
        const fechaUsuario = new Date(document.getElementById('fechaUsuario').value);
        const nombreUsuario = document.getElementById('nombreUsuario').value;
        const numeroProceso = document.getElementById('numeroProceso').value;
        
        // Obtener valores de los nuevos campos
        const numeroFactura = document.getElementById('numeroFactura').value;
        const periodoFacturacion = document.getElementById('periodoFacturacion').value;
        const valorPesosAjustado = document.getElementById('valorPesosAjustado').value;
        const valorRealCancelar = document.getElementById('valorRealCancelar').value;
        const causaFinalRespuesta = document.getElementById('causaFinalRespuesta').value;
        
        // Validar que todos los campos estén completos
        if (!lecturaAnterior || !fechaAnterior || !lecturaActual || 
            !fechaActual || !lecturaUsuario || !fechaUsuario || 
            isNaN(fechaAnterior.getTime()) || isNaN(fechaActual.getTime()) || 
            isNaN(fechaUsuario.getTime())) {
            alert('Por favor, complete todos los campos de lectura y fechas correctamente.');
            return;
        }
        
        // 1. Calcular el consumo real según la lectura del usuario
        const consumoReal = lecturaUsuario - lecturaAnterior;
        
        // 2. Calcular los días transcurridos
        const diasTranscurridos = Math.round((fechaUsuario - fechaAnterior) / (1000 * 60 * 60 * 24));
        
        // 3. Calcular el consumo diario
        const consumoDiario = consumoReal / diasTranscurridos;
        
        // 4. Calcular el consumo en 30 días (ciclo de facturación)
        const consumo30Dias = Math.round(consumoDiario * 30);
        
        // 5. Calcular la lectura correcta para la factura
        const lecturaCorrecta = lecturaAnterior + consumo30Dias;
        
        // 6. Calcular el ajuste necesario
        const ajusteNecesario = lecturaActual - lecturaCorrecta;
        
        // Formatear mes y año de la fecha actual para el texto de respuesta
        const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const mesActual = monthNames[fechaActual.getMonth()];
        const anoActual = fechaActual.getFullYear();
        
        // Generar texto de respuesta con auto-llenado
        const textoRespuesta = `
        <p>Para ESSA es muy importante conocer, entender y brindar una solución a las inquietudes de sus clientes y usuarios, por ello analizamos su solicitud registrada mediante proceso número ${numeroProceso}; y con el fin de brindarle la atención correspondiente, le comunicamos:</p>
        
        <p>Se procede a analizar la factura número ${numeroFactura}, en la cual se registraron ${lecturaActual-lecturaAnterior} kilovatios hora (kWh) para el periodo comprendido entre el ${periodoFacturacion}. En relación con los consumos facturados, es importante precisar que ESSA mensualmente envía personal técnico para realizar la toma de lectura en el equipo de medida que se encuentra instalado en el predio y de esta manera determinar los kWh consumidos por el cliente o usuario para cada periodo.</p>
        
        <p>Lo que quiere decir, que el consumo se ha determinado por diferencia de lecturas tomadas desde el equipo de medida, siendo el resultado de la sencilla resta entre la lectura actual y la lectura anterior.</p>
        
        <p>Ahora bien; teniendo en cuenta la lectura ${lecturaUsuario} kWh suministrada por usted en la reclamación, se procede a modificar el consumo facturado, retirando ${Math.abs(ajusteNecesario)} kWh equivalentes al valor de $${valorPesosAjustado}, actualizando la lectura hasta ${lecturaCorrecta} kWh.</p>
        
        <p>Así las cosas, en cumplimiento del artículo 155 de la ley 142 de 1994, le informamos que no se entrega factura de sumas no objeto de reclamo, ni se constituyen valores en reclamación, teniendo en cuenta el ajuste realizado. Se emite la factura modificada por valor de $${valorRealCancelar}.</p>
        
        <p>De acuerdo con lo expuesto, ESSA decide ${causaFinalRespuesta} a su requerimiento, atenta a escuchar sus necesidades, siempre adelante con el propósito que nos inspira, contribuir en la generación de bienestar y desarrollo con equidad.</p>
        
        <p>Finalmente se notifica personalmente al señor(a) ${nombreUsuario} de la presente decisión empresarial.</p>
        
        <p>La interposición de recursos podrá realizarla en nuestras oficinas de atención al cliente; o mediante nuestra página web www.essa.com.co: a través de la opción "transacciones" – "solicita tu PQR", o comunicándose a la línea de atención al cliente 01 8000 97 19 03. Si es de su preferencia también podrá realizar su solicitud escribiendo al WhatsApp Empresarial 318 833 91 21 o en www.essa.com.co opción chat, botón servicio al cliente, donde "Luisa" nuestra asistente virtual lo orientará.</p>
        `;
        
        // Mostrar texto de respuesta
        const textoRespuestaElement = document.getElementById('textoRespuesta');
        textoRespuestaElement.innerHTML = textoRespuesta;
        textoRespuestaElement.style.display = 'block';
        
        // Mostrar resultados
        document.getElementById('nombreUsuarioResultado').textContent = nombreUsuario || 'No especificado';
        document.getElementById('numeroProcesoResultado').textContent = numeroProceso || 'No especificado';
        
        // Mostrar resultados de los nuevos campos
        document.getElementById('numeroFacturaResultado').textContent = numeroFactura || 'No especificado';
        document.getElementById('periodoFacturacionResultado').textContent = periodoFacturacion || 'No especificado';
        document.getElementById('valorPesosAjustadoResultado').textContent = valorPesosAjustado ? `$${valorPesosAjustado}` : 'No especificado';
        document.getElementById('valorRealCancelarResultado').textContent = valorRealCancelar ? `$${valorRealCancelar}` : 'No especificado';
        document.getElementById('causaFinalRespuestaResultado').textContent = causaFinalRespuesta || 'No especificado';
        
        document.getElementById('consumoReal').textContent = `${consumoReal} kWh`;
        document.getElementById('diasTranscurridos').textContent = `${diasTranscurridos} días`;
        document.getElementById('consumoDiario').textContent = `${consumoDiario.toFixed(3)} kWh/día`;
        document.getElementById('consumo30Dias').textContent = `${consumo30Dias} kWh`;
        document.getElementById('lecturaCorrecta').textContent = `${lecturaCorrecta} kWh`;
        
        const ajusteElement = document.getElementById('ajusteNecesario');
        ajusteElement.textContent = `${Math.abs(ajusteNecesario)} kWh ${ajusteNecesario > 0 ? '(cobro en exceso)' : '(cobro correcto)'}`;
        
        if (ajusteNecesario > 0) {
            ajusteElement.className = 'adjust-negative';
        } else if (ajusteNecesario < 0) {
            ajusteElement.className = 'adjust-positive';
        } else {
            ajusteElement.className = '';
        }
        
        // Mostrar pasos de cálculo
        const pasosContainer = document.getElementById('pasos');
        pasosContainer.innerHTML = '';
        
        const pasos = [
            {
                titulo: 'Paso 1: Calcular consumo real',
                contenido: `Lectura usuario (${lecturaUsuario} kWh) - Lectura anterior (${lecturaAnterior} kWh) = ${consumoReal} kWh`
            },
            {
                titulo: 'Paso 2: Calcular días transcurridos',
                contenido: `De ${formatDate(fechaAnterior)} a ${formatDate(fechaUsuario)} = ${diasTranscurridos} días`
            },
            {
                titulo: 'Paso 3: Calcular consumo diario',
                contenido: `Consumo real (${consumoReal} kWh) ÷ Días transcurridos (${diasTranscurridos}) = ${consumoDiario.toFixed(3)} kWh/día`
            },
            {
                titulo: 'Paso 4: Calcular consumo en 30 días',
                contenido: `Consumo diario (${consumoDiario.toFixed(3)} kWh/día) × 30 días = ${consumo30Dias} kWh`
            },
            {
                titulo: 'Paso 5: Calcular lectura correcta',
                contenido: `Lectura anterior (${lecturaAnterior} kWh) + Consumo en 30 días (${consumo30Dias} kWh) = ${lecturaCorrecta} kWh`
            },
            {
                titulo: 'Paso 6: Calcular ajuste necesario',
                contenido: `Lectura actual (${lecturaActual} kWh) - Lectura correcta (${lecturaCorrecta} kWh) = ${ajusteNecesario} kWh`
            }
        ];
        
        pasos.forEach(paso => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'step';
            
            const stepTitle = document.createElement('div');
            stepTitle.className = 'step-title';
            stepTitle.textContent = paso.titulo;
            
            const stepContent = document.createElement('div');
            stepContent.textContent = paso.contenido;
            
            stepDiv.appendChild(stepTitle);
            stepDiv.appendChild(stepContent);
            pasosContainer.appendChild(stepDiv);
        });
        
        // Mostrar sección de resultados
        document.getElementById('result').style.display = 'block';
    }
    
    function formatDate(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
});