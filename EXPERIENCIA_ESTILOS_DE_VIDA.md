# Experiencia Estilos de Vida — Rueda de Negocios 2026

Actualización del chat IA para el nuevo evento de Experiencias. El flujo, el diseño
y la arquitectura del proyecto se mantienen: cambia el **contenido** (estilos de
vida, benchmarks de interacción y paquetes comerciales) y se agregan dos pasos a
la conversación.

## Archivos fuente del evento

| Archivo | Qué aporta |
|---|---|
| `nuevoEventoExperiencias/Contenidos_Estilos_de_Vida_ClaroMedia.xlsx` | Los 10 estilos de vida, sus afinidades, dato observado, interpretación, sector principal/conectados, pregunta IA y la regla narrativa |
| `nuevoEventoExperiencias/Rueda de Negocios 2026 - 2_OF.pptx` | Los 6 paquetes vigentes y las tasas de interacción por categoría |

## Qué cambió

### 1. Nuevos datos

- **`src/data/estilosDeVida.js`** — Los 10 estilos de vida completos. Incluye las
  funciones que arman la narrativa (`construirLecturaEstilo`,
  `construirRutaSectores`, `construirResumenEstilo`) y la equivalencia entre las
  etiquetas de afinidad del Excel y el catálogo del tablero.
- **`src/data/benchmarksInteraccion.js`** — Tasas de interacción por formato y
  categoría (lámina "Conocemos cómo interactúan las audiencias"), más el mapa
  `SECTOR_A_CATEGORIA` que conecta los sectores del chat con las categorías del
  estudio. Cuando el nombre no coincide exacto se usa la categoría más cercana y
  la interfaz lo muestra como *categoría de referencia*.
- **`src/data/journey.js`** — Fuente única de las etapas del journey: Conoce,
  Encuentra, Atrae, Conecta, Decide y Descubre, con su icono, descripción y
  color. La usan el selector del chat, los ejemplos por sector, la recomendación
  de paquetes y la pantalla de resultados.
- **`src/data/paquetesComerciales.js`** — Reemplaza los 4 paquetes anteriores por
  los 6 vigentes: ELITE + Investigación, ELITE 360, VIP, CONNECT, SMART y BASIC.
  Cada paquete se declara por **fases** (tal como en la lámina) y de ahí se
  derivan `componentes` y `productos`, para no tener la misma información en dos
  lugares.

### 2. Nuevos pasos en el chat (`src/components/ChatAgent.jsx`)

El flujo queda así (en negrita lo nuevo):

1. Datos personales
2. Sector → **el agente muestra cómo interactúa esa categoría por formato**
3. Género, edad y nivel socioeconómico
4. **Estilo de vida** (tablero de 10 tarjetas)
5. **Lectura de audiencia**: dato observado → *esto sugiere* → pregunta de
   profundización, con las opciones de respuesta del estilo elegido
6. Afinidades (el tablero arranca con las afinidades del estilo ya marcadas)
7. **Customer journey**: una sola selección entre las 6 etapas, seguida de los
   ejemplos por sector y los aprendizajes
8. **Rango de inversión** (incluye "Aún no lo defino")
9. **Propuesta en la misma pantalla** (ya no manda a la pantalla de resultados)

La conversación se escribe ahora de forma lineal con `await decir(...)` en lugar
de `setTimeout` anidados: para cambiar el guion basta leer el handler del paso.

### 3. Regla narrativa

El Excel exige separar siempre **dato observado** de **interpretación** y usar
*"esto sugiere"* cuando no hay causalidad directa. Se respeta en los tres lugares
donde aparece el contenido: el chat, la pantalla de resultados y el PDF que se
envía por correo. La regla también está escrita en el prompt del modelo.

### 4. Recomendación de paquete

`recomendarPaquete()` es ahora un motor declarativo de criterios independientes:

| Criterio | Peso | De dónde sale |
|---|---|---|
| Presupuesto | 45 | Rango elegido por el usuario. Gana el paquete más completo que cabe |
| Etapa del journey | 25 | Etapa elegida vs. `etapasJourney` de cada paquete |
| Alcance potencial | 15 | Banderas demográficas (escala calibrada con el rango real: 6,7M–54,9M) |
| Sector | 15 | `sectoresDestacados` de cada paquete (criterio comercial, ajustable) |
| NSE y edad | 8 + 8 | Perfil de audiencia |

Ante empate gana la opción de menor inversión. Agregar o quitar un paquete no
requiere tocar el motor: alcanza con editar su definición.

### 5. Resultados, Excel y PDF

- Nueva sección **Lectura de Audiencia** (`EstiloVidaCard`) y nueva sección
  **Cómo interactúa tu categoría** (`BenchmarkInteraccion`, barras en escala común
  de 0% a 7,10% con el formato líder destacado).
- El recuadro "Alcance ideal del paquete" pasó a ser **Enfoque del paquete**
  (claim + vigencia), porque los paquetes nuevos se definen por objetivo y
  duración, no por tamaño de audiencia.
- Cada componente muestra la fase a la que pertenece.
- Al terminar, la propuesta se muestra en la misma pantalla del chat, con una
  barra superior que confirma el stand y un botón para empezar de nuevo. Se
  eliminó `CompletionScreen.jsx`, que solo servía para mandar al visitante a otra
  pantalla.
- El export a Excel suma las columnas `empresa`, `estiloVida`,
  `presupuestoEstimado`, `etapaJourney` y `propuesta_estiloVida`.
- El PDF de `functions/index.js` incluye las dos secciones nuevas.
  **Requiere redespliegue**: `npm run functions:deploy`.

## Dos correcciones de paso

- **NSE no se estaba aplicando.** `MAPEO_NSE` en `banderasDemograficas.js` usaba
  claves (`"Alto (1-2)"`) que no coincidían con las del chat
  (`"Alto (E5-E6)"`), así que el nivel socioeconómico no sumaba nada al cálculo
  de banderas. Además estaban invertidas: estrato 1-2 es NSE bajo. Ya corregido.
- **Escrituras a Firestore sin límite de tiempo.** Si la red del stand fallaba,
  el chat se quedaba congelado en el formulario esperando respuesta del servidor.
  Ahora hay un límite de 8 segundos: si no responde, la experiencia continúa y
  queda registrado en consola.

## Dónde cambiar contenido

| Quiero cambiar... | Archivo |
|---|---|
| Texto, dato o pregunta de un estilo de vida | `src/data/estilosDeVida.js` |
| Precios, componentes o fases de un paquete | `src/data/paquetesComerciales.js` |
| Rangos de inversión del chat | `RANGOS_PRESUPUESTO` en `paquetesComerciales.js` |
| Tasas de interacción por categoría | `src/data/benchmarksInteraccion.js` |
| Qué categoría le corresponde a cada sector | `SECTOR_A_CATEGORIA` |
| Nombre, icono o descripción de una etapa del journey | `src/data/journey.js` |
| Ejemplos de mensaje por sector y etapa | `MENSAJES_JOURNEY_POR_SECTOR` en `mockData.js` |
| Lo que dice el agente en cada paso | Handlers de `src/components/ChatAgent.jsx` |
| Instrucciones del modelo | `SYSTEM_PROMPT` en `src/services/apiService.js` (se arma solo desde la data) |

## Cambios posteriores (2 de octubre de 2026)

- **Campo "Nombre de empresa"** en el formulario inicial. Se guarda como `empresa`
  en Firestore desde el primer paso y viaja a resultados, Excel, PDF y al prompt.
- **Etapas del journey renombradas** a Conoce, Encuentra, Atrae, Conecta, Decide y
  Descubre. Los ejemplos por sector se re-mapearon a las cinco primeras etapas y
  se escribió una línea nueva por sector para "Descubre", entendida como lo que
  el cliente descubre después de decidir. Es copy de ejemplo: ajústenlo si el
  equipo comercial lo quiere con otras palabras.
- **El journey se pregunta una sola vez.** Antes se pedía la etapa, se mostraban
  los ejemplos y se volvía a pedir. Ahora se pide una vez y los ejemplos y
  aprendizajes vienen después. En Firestore se guarda un solo campo,
  `etapaJourney`; los registros del evento anterior con
  `primeraSeleccionJourney`/`segundaSeleccionJourney` se siguen leyendo.
- **Los resultados se muestran en el mismo flujo**, sin enviar al visitante a otra
  pantalla.

## Voz del agente (octubre 2026)

El agente ahora habla. El visitante sigue respondiendo solo con clics.

### Modos

| Modo | Qué ve y oye el visitante |
|---|---|
| **Texto** | Igual que antes: mensajes escritos, sin audio |
| **Audio** | El agente habla y no hay burbujas de texto. Las ondas ocupan la parte alta de la pantalla |
| **Texto y audio** (por defecto) | Mensajes escritos y voz a la vez. La burbuja que se está leyendo se ilumina con un mini ecualizador |

El modo se elige en la **pantalla de inicio** (nueva) y se puede cambiar en cualquier
momento con los tres botones de la barra superior. La configuración queda guardada
en el equipo, así que el stand arranca como lo dejó el operador.

### Ondas

`OndasVoz` dibuja cuatro ondas superpuestas que se agitan mientras el agente habla y
casi se aplanan en reposo. El navegador no entrega el audio de la voz sintética, así
que la amplitud se simula con el ritmo del habla y se refuerza cada vez que el
navegador avisa que se pronunció una palabra. Respeta `prefers-reduced-motion`.

### Qué cambió en el flujo

- **Pantalla de inicio.** Es obligatoria: los navegadores solo dejan reproducir audio
  después de un toque del usuario. Al terminar una propuesta, "Crear nueva propuesta"
  vuelve a esta pantalla para el siguiente visitante.
- **Los modales de transición también se leen.**
- **Mientras la IA arma la propuesta**, el agente lo dice en voz alta en vez de dejar
  la pantalla quieta.
- **Al mostrar los resultados**, el agente anuncia el paquete recomendado y su
  inversión; las mini-ondas aparecen en la barra superior mientras habla.
- **Botón "Saltar"** corta la frase en curso y sigue con la siguiente.
- **Ajustes de voz** (engranaje): voz, velocidad, tono, volumen y "Probar voz".
- Cada frase se limpia antes de leerse: sin emojis, flechas ni símbolos, y se
  traducen `$25.000/mes`, `24/7`, `km` y `+` a lenguaje hablado.
- El layout pasó de "página que hace scroll" a pantalla de alto fijo, con el
  escenario siempre visible arriba y el chat desplazándose por dentro.

### Archivos

| Archivo | Responsabilidad |
|---|---|
| `src/services/vozService.js` | Síntesis de voz: limpieza de texto, fragmentos, ranking de voces, vigilante |
| `src/hooks/useVoz.js` | Modo y ajustes persistentes, voces del equipo, estado "hablando" |
| `src/components/voz/OndasVoz.jsx` | Las ondas (canvas) |
| `src/components/voz/EscenarioVoz.jsx` | Barra superior: estado, Saltar, selector de modo, ajustes |
| `src/components/voz/PantallaInicio.jsx` | Inicio y elección de modo |
| `src/components/voz/PanelVoz.jsx` | Ajustes de voz |

El único punto de enganche en el chat es `decir()` en `ChatAgent.jsx`: todo lo que
el agente dice pasa por ahí.

### Límites a tener presentes

- **Es la voz del sistema operativo/navegador.** Sin costo mensual y sin internet,
  pero suena a sintetizador; en Chrome con internet, las voces "Google español" son
  las más naturales. Si se quiere una voz realmente humana, el cambio se limita a
  `vozService.js` (conectar un servicio de voz), con costo por uso.
- **La experiencia hablada dura unos 4,5 minutos** (medido: ~4.300 caracteres). El
  tramo más largo es el del journey (ejemplos por sector + aprendizajes). Si el
  evento tiene mucho flujo, conviene acortar esos textos o dejar solo el resumen
  hablado.
- Si el equipo no tiene voces en español, el panel lo avisa y se usa la voz
  predeterminada del sistema. Sin soporte de voz, la experiencia queda en texto.
- La prueba automatizada usó un simulador de la API de voz; la calidad real de la
  voz conviene escucharla en el equipo del stand.
