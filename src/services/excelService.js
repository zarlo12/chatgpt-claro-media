// 📊 Servicio para exportar datos a Excel
import * as XLSX from 'xlsx';
import { obtenerTodosLosRegistros } from './firebaseService';

/**
 * Convertir timestamp de Firebase a formato legible
 * @param {Object} timestamp - Timestamp de Firebase
 * @returns {string} - Fecha en formato DD/MM/YYYY HH:MM:SS
 */
const formatearTimestamp = (timestamp) => {
  if (!timestamp) return '';
  
  try {
    // Si es un timestamp de Firebase con toDate()
    if (timestamp.toDate) {
      const fecha = timestamp.toDate();
      return fecha.toLocaleString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
    // Si es un objeto Date normal
    if (timestamp instanceof Date) {
      return timestamp.toLocaleString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
    // Si es un string o número
    return new Date(timestamp).toLocaleString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch (error) {
    console.error('Error formateando timestamp:', error);
    return String(timestamp);
  }
};

/**
 * Convertir objeto a texto legible recursivamente (SIN JSON)
 * @param {*} valor - Valor a procesar
 * @param {number} nivel - Nivel de indentación (para recursión)
 * @returns {string} - Valor como string legible
 */
const objetoATextoLegible = (valor, nivel = 0) => {
  const indent = '  '.repeat(nivel);
  const indentSiguiente = '  '.repeat(nivel + 1);
  
  if (valor === null) return 'null';
  if (valor === undefined) return '';
  
  // Timestamps de Firebase
  if (typeof valor === 'object' && valor.seconds !== undefined) {
    return formatearTimestamp(valor);
  }
  
  // Arrays
  if (Array.isArray(valor)) {
    if (valor.length === 0) return '';
    
    // Si todos los elementos son primitivos y hay pocos, unir con comas
    if (valor.length <= 5 && valor.every(v => typeof v !== 'object')) {
      return valor.join(', ');
    }
    
    // Si hay objetos en el array, listar cada uno
    return valor.map((item, i) => {
      if (typeof item === 'object' && item !== null) {
        // Intentar extraer un identificador principal
        const id = item.nombre || item.titulo || item.id || item.text;
        if (id && typeof id !== 'object') {
          return `${i + 1}. ${id}`;
        }
        // Si no tiene identificador simple, mostrar todas las propiedades
        return `${i + 1}. ${objetoATextoLegible(item, nivel + 1)}`;
      }
      return `${i + 1}. ${item}`;
    }).join('\n');
  }
  
  // Objetos
  if (typeof valor === 'object') {
    const keys = Object.keys(valor);
    if (keys.length === 0) return '';
    
    // Si el objeto tiene solo una propiedad simple, devolverla
    if (keys.length === 1) {
      const key = keys[0];
      const subvalor = valor[key];
      if (typeof subvalor !== 'object' || subvalor === null) {
        return `${key}: ${subvalor}`;
      }
    }
    
    // Para objetos complejos, mostrar cada propiedad
    const lineas = [];
    for (const key of keys) {
      const subvalor = valor[key];
      
      // Saltar propiedades nulas o undefined
      if (subvalor === null || subvalor === undefined) continue;
      
      // Si el valor es primitivo
      if (typeof subvalor !== 'object') {
        lineas.push(`${key}: ${subvalor}`);
      }
      // Si es array
      else if (Array.isArray(subvalor)) {
        if (subvalor.length === 0) continue;
        
        // Arrays pequeños de primitivos en una línea
        if (subvalor.length <= 3 && subvalor.every(v => typeof v !== 'object')) {
          lineas.push(`${key}: ${subvalor.join(', ')}`);
        } else {
          const arrayTexto = objetoATextoLegible(subvalor, nivel + 1);
          const lineasArray = arrayTexto.split('\n');
          lineas.push(`${key}:`);
          lineasArray.forEach(linea => lineas.push(`  ${linea}`));
        }
      }
      // Si es objeto anidado
      else {
        // Timestamp
        if (subvalor.seconds !== undefined) {
          lineas.push(`${key}: ${formatearTimestamp(subvalor)}`);
        } else {
          const objetoTexto = objetoATextoLegible(subvalor, nivel + 1);
          if (objetoTexto.includes('\n')) {
            lineas.push(`${key}:`);
            const lineasObjeto = objetoTexto.split('\n');
            lineasObjeto.forEach(linea => lineas.push(`  ${linea}`));
          } else {
            lineas.push(`${key}: ${objetoTexto}`);
          }
        }
      }
    }
    
    return lineas.join('\n');
  }
  
  // Primitivos
  return String(valor);
};

/**
 * Convertir cualquier valor a string legible (wrapper simplificado)
 * @param {*} valor - Valor a procesar
 * @returns {string} - Valor como string
 */
const procesarValor = (valor) => {
  if (valor === null || valor === undefined) {
    return '';
  }
  
  // Usar la función recursiva para convertir TODO a texto legible
  return objetoATextoLegible(valor, 0);
};

/**
 * Extraer todos los campos únicos de todos los registros
 * @param {Array} registros - Array de registros de Firebase
 * @returns {Array} - Array con todos los nombres de campos únicos
 */
const extraerTodosLosCampos = (registros) => {
  const camposSet = new Set();
  
  registros.forEach((registro) => {
    Object.keys(registro).forEach((campo) => {
      camposSet.add(campo);
    });
  });
  
  // Convertir a array y ordenar
  const campos = Array.from(camposSet);
  
  // Ordenar campos para que los más importantes estén primero
  const camposOrdenados = [];
  
  // Campos prioritarios al inicio
  const camposPrioridad = [
    'id',
    'timestamp',
    'ultimaActualizacion',
    'standId',
    'estado',
    'nombre',
    'correo',
    'celular',
    'sector',
    'genero',
    'edad',
    'nivelSocioeconomico',
    'afinidades',
    'primeraSeleccionJourney',
    'segundaSeleccionJourney',
  ];
  
  // Agregar campos prioritarios en orden
  camposPrioridad.forEach((campo) => {
    if (campos.includes(campo)) {
      camposOrdenados.push(campo);
    }
  });
  
  // Agregar los demás campos
  campos.forEach((campo) => {
    if (!camposPrioridad.includes(campo)) {
      camposOrdenados.push(campo);
    }
  });
  
  return camposOrdenados;
};

/**
 * Procesar propuesta para agregarla como columnas separadas
 * @param {Object} propuesta - Objeto propuesta con insights, recomendaciones, etc.
 * @returns {Object} - Objeto con propuesta desglosada
 */
const procesarPropuesta = (propuesta) => {
  if (!propuesta || typeof propuesta !== 'object') {
    return {
      propuesta_insights: '',
      propuesta_recomendaciones: '',
      propuesta_proximosPasos: '',
      propuesta_paquete: '',
      propuesta_alcance: '',
      propuesta_resumen: '',
      propuesta_datos_adicionales: '',
    };
  }
  
  const resultado = {};
  
  // Procesar insights
  if (propuesta.insights) {
    resultado.propuesta_insights = Array.isArray(propuesta.insights)
      ? propuesta.insights.map((item, i) => `${i + 1}. ${item}`).join('\n')
      : String(propuesta.insights);
  } else {
    resultado.propuesta_insights = '';
  }
  
  // Procesar recomendaciones
  if (propuesta.recomendaciones) {
    resultado.propuesta_recomendaciones = Array.isArray(propuesta.recomendaciones)
      ? propuesta.recomendaciones.map((item, i) => `${i + 1}. ${item}`).join('\n')
      : String(propuesta.recomendaciones);
  } else {
    resultado.propuesta_recomendaciones = '';
  }
  
  // Procesar próximos pasos
  if (propuesta.proximosPasos) {
    resultado.propuesta_proximosPasos = Array.isArray(propuesta.proximosPasos)
      ? propuesta.proximosPasos.map((item, i) => `${i + 1}. ${item}`).join('\n')
      : String(propuesta.proximosPasos);
  } else {
    resultado.propuesta_proximosPasos = '';
  }
  
  // Procesar paquete recomendado
  if (propuesta.paqueteRecomendado) {
    const paquete = propuesta.paqueteRecomendado;
    let textoPaquete = '';
    
    if (paquete.paquete) {
      // Si paquete.paquete es un objeto (con nombre, precio, etc.)
      if (typeof paquete.paquete === 'object' && paquete.paquete !== null) {
        const paqObj = paquete.paquete;
        textoPaquete += `PAQUETE: ${paqObj.nombre || paqObj.id || 'No especificado'}\n`;
        if (paqObj.precio) {
          textoPaquete += `PRECIO: $${paqObj.precio.toLocaleString('es-MX')}\n`;
        }
        if (paqObj.descripcion) {
          textoPaquete += `DESCRIPCIÓN: ${paqObj.descripcion}\n`;
        }
        textoPaquete += '\n';
      } else {
        // Si es un string simple
        textoPaquete += `PAQUETE: ${paquete.paquete}\n\n`;
      }
    }
    
    if (paquete.razonamiento) {
      textoPaquete += `POR QUÉ: ${paquete.razonamiento}\n\n`;
    }
    
    if (paquete.mensajePersonalizado) {
      textoPaquete += `MENSAJE: ${paquete.mensajePersonalizado}\n\n`;
    }
    
    if (paquete.alternativas && Array.isArray(paquete.alternativas)) {
      textoPaquete += `ALTERNATIVAS:\n${paquete.alternativas.map((alt, i) => {
        // Si alternativa es objeto, extraer nombre usando la función recursiva
        if (typeof alt === 'object' && alt !== null) {
          const nombre = alt.nombre || alt.id || objetoATextoLegible(alt, 0).split('\n')[0];
          return `${i + 1}. ${nombre}`;
        }
        return `${i + 1}. ${alt}`;
      }).join('\n')}`;
    }
    
    resultado.propuesta_paquete = textoPaquete.trim();
  } else {
    resultado.propuesta_paquete = '';
  }
  
  // Procesar valor de propuesta (alcance)
  if (propuesta.valorPropuesta) {
    const valor = propuesta.valorPropuesta;
    let textoAlcance = '';
    
    if (valor.alcanceTotal) {
      textoAlcance += `ALCANCE TOTAL: ${valor.alcanceTotal}\n\n`;
    }
    
    if (valor.alcanceTotalNumerico) {
      textoAlcance += `ALCANCE NUMÉRICO: ${valor.alcanceTotalNumerico.toLocaleString('es-MX')}\n\n`;
    }
    
    if (valor.banderasPrincipales && Array.isArray(valor.banderasPrincipales)) {
      textoAlcance += `BANDERAS PRINCIPALES:\n${valor.banderasPrincipales.map((bandera, i) => {
        // Convertir bandera a texto legible (puede ser objeto o string)
        const textoLegible = typeof bandera === 'object' && bandera !== null 
          ? objetoATextoLegible(bandera, 0)
          : String(bandera);
        return `${i + 1}. ${textoLegible}`;
      }).join('\n')}`;
    }
    
    resultado.propuesta_alcance = textoAlcance.trim();
  } else {
    resultado.propuesta_alcance = '';
  }
  
  // Crear resumen completo legible
  let resumen = '';
  
  // Sector y audiencia
  if (propuesta.sector) {
    resumen += `📊 SECTOR: ${propuesta.sector}\n\n`;
  }
  
  if (propuesta.audiencia) {
    resumen += `👥 AUDIENCIA:\n`;
    if (propuesta.audiencia.genero) {
      resumen += `  • Género: ${propuesta.audiencia.genero}\n`;
    }
    if (propuesta.audiencia.edad) {
      resumen += `  • Edad: ${propuesta.audiencia.edad}\n`;
    }
    if (propuesta.audiencia.nivelSocioeconomico) {
      resumen += `  • NSE: ${propuesta.audiencia.nivelSocioeconomico}\n`;
    }
    resumen += '\n';
  }
  
  // Afinidades
  if (propuesta.afinidades && Array.isArray(propuesta.afinidades) && propuesta.afinidades.length > 0) {
    resumen += `🎯 AFINIDADES: ${propuesta.afinidades.join(', ')}\n\n`;
  }
  
  // Paquete recomendado
  if (propuesta.paqueteRecomendado && propuesta.paqueteRecomendado.paquete) {
    // Extraer nombre del paquete (puede ser objeto o string)
    let nombrePaquete = propuesta.paqueteRecomendado.paquete;
    if (typeof nombrePaquete === 'object' && nombrePaquete !== null) {
      nombrePaquete = nombrePaquete.nombre || nombrePaquete.id || 'No especificado';
    }
    
    resumen += `📦 PAQUETE RECOMENDADO: ${nombrePaquete}\n`;
    if (propuesta.paqueteRecomendado.razonamiento) {
      resumen += `   Razón: ${propuesta.paqueteRecomendado.razonamiento}\n`;
    }
    resumen += '\n';
  }
  
  // Alcance
  if (propuesta.valorPropuesta && propuesta.valorPropuesta.alcanceTotal) {
    resumen += `📈 ALCANCE POTENCIAL: ${propuesta.valorPropuesta.alcanceTotal}\n\n`;
  }
  
  // TODOS los Insights (sin límite)
  if (propuesta.insights && Array.isArray(propuesta.insights) && propuesta.insights.length > 0) {
    resumen += `💡 INSIGHTS (${propuesta.insights.length}):\n`;
    propuesta.insights.forEach((insight, i) => {
      resumen += `   ${i + 1}. ${insight}\n`;
    });
    resumen += '\n';
  }
  
  // TODAS las Recomendaciones (sin límite)
  if (propuesta.recomendaciones && Array.isArray(propuesta.recomendaciones) && propuesta.recomendaciones.length > 0) {
    resumen += `✅ RECOMENDACIONES (${propuesta.recomendaciones.length}):\n`;
    propuesta.recomendaciones.forEach((rec, i) => {
      resumen += `   ${i + 1}. ${rec}\n`;
    });
  }
  
  resultado.propuesta_resumen = resumen.trim();
  
  // PROCESAR TODOS LOS DEMÁS CAMPOS que no hayan sido procesados explícitamente
  const camposProcesados = [
    'insights', 
    'recomendaciones', 
    'proximosPasos', 
    'paqueteRecomendado', 
    'valorPropuesta',
    'sector',
    'audiencia',
    'afinidades'
  ];
  
  let datosAdicionales = '';
  Object.keys(propuesta).forEach(campo => {
    if (!camposProcesados.includes(campo)) {
      const valor = propuesta[campo];
      if (valor !== null && valor !== undefined) {
        const valorLegible = objetoATextoLegible(valor, 0);
        if (valorLegible) {
          datosAdicionales += `\n${campo.toUpperCase()}:\n${valorLegible}\n`;
        }
      }
    }
  });
  
  resultado.propuesta_datos_adicionales = datosAdicionales.trim();
  
  return resultado;
};

/**
 * Normalizar registros para que todos tengan los mismos campos
 * @param {Array} registros - Array de registros de Firebase
 * @param {Array} todosCampos - Array con todos los campos posibles
 * @returns {Array} - Array de registros normalizados
 */
const normalizarRegistros = (registros, todosCampos) => {
  return registros.map((registro) => {
    const registroNormalizado = {};
    
    todosCampos.forEach((campo) => {
      if (campo === 'propuesta') {
        // Procesar propuesta como campos separados
        const propuestaDesglosada = procesarPropuesta(registro.propuesta);
        Object.assign(registroNormalizado, propuestaDesglosada);
      } else if (campo === 'timestamp' || campo === 'ultimaActualizacion') {
        // Formatear timestamps
        registroNormalizado[campo] = formatearTimestamp(registro[campo]);
      } else {
        // Para todos los demás campos
        registroNormalizado[campo] = procesarValor(registro[campo]);
      }
    });
    
    return registroNormalizado;
  });
};

/**
 * Exportar todos los registros a Excel
 * @returns {Promise<void>} - Descarga el archivo Excel automáticamente
 */
export const exportarRegistrosAExcel = async () => {
  try {
    console.log('📊 Iniciando exportación a Excel...');
    
    // 1. Obtener todos los registros de Firebase
    const registros = await obtenerTodosLosRegistros();
    
    if (registros.length === 0) {
      alert('No hay registros para exportar');
      console.warn('⚠️ No hay registros en la base de datos');
      return;
    }
    
    console.log(`📦 Procesando ${registros.length} registros...`);
    
    // 2. Extraer todos los campos únicos
    const todosCampos = extraerTodosLosCampos(registros);
    console.log('📋 Campos encontrados:', todosCampos);
    
    // Agregar campos de propuesta desglosada (remover 'propuesta' y agregar subcampos)
    const camposSinPropuesta = todosCampos.filter(c => c !== 'propuesta');
    const camposFinales = [
      ...camposSinPropuesta,
      'propuesta_insights',
      'propuesta_recomendaciones',
      'propuesta_proximosPasos',
      'propuesta_paquete',
      'propuesta_alcance',
      'propuesta_resumen',
      'propuesta_datos_adicionales',
    ];
    
    // 3. Normalizar todos los registros
    const registrosNormalizados = normalizarRegistros(registros, todosCampos);
    
    // 4. Crear libro de Excel (workbook)
    const wb = XLSX.utils.book_new();
    
    // 5. Crear hoja de cálculo (worksheet) a partir de JSON
    const ws = XLSX.utils.json_to_sheet(registrosNormalizados);
    
    // 6. Agregar la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Registros');
    
    // 7. Generar nombre de archivo con fecha
    const fecha = new Date().toISOString().split('T')[0];
    const nombreArchivo = `ClaroMedia_Registros_${fecha}.xlsx`;
    
    // 8. Descargar archivo
    XLSX.writeFile(wb, nombreArchivo);
    
    console.log(`✅ Archivo exportado: ${nombreArchivo}`);
    console.log(`📊 Total de registros: ${registros.length}`);
    console.log(`📋 Total de campos: ${camposFinales.length}`);
    
    return {
      exito: true,
      totalRegistros: registros.length,
      totalCampos: camposFinales.length,
      nombreArchivo,
    };
  } catch (error) {
    console.error('❌ Error exportando a Excel:', error);
    alert(`Error al exportar: ${error.message}`);
    throw error;
  }
};

export default {
  exportarRegistrosAExcel,
};
