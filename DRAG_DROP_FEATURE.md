# Sistema de Drag & Drop - Tablero de Afinidades

## 📋 Descripción

Se ha implementado un sistema interactivo tipo tablero Kanban para la selección de afinidades en el Agente IA de Claro Media. Esta mejora sustituye la selección tradicional de múltiples opciones por una experiencia más visual y dinámica.

## ✨ Características

### Dos Zonas Interactivas

1. **Afinidades Disponibles** (Izquierda)
   - Muestra todas las afinidades disponibles con sus iconos
   - Tarjetas con fondo blanco translúcido
   - Efectos hover con escalado y cambio de opacidad

2. **Afinidades Seleccionadas** (Derecha)
   - Área de destino con gradiente rojo de Claro
   - Contador de afinidades seleccionadas
   - Tarjetas con fondo rojo translúcido
   - Área de drop con indicador visual cuando está vacía

### Interacciones

#### Arrastrar y Soltar (Drag & Drop)

- Las tarjetas son arrastrables entre ambas columnas
- Indicadores visuales cuando se arrastra sobre una zona
- Transiciones suaves y animaciones fluidas
- Efecto de opacidad mientras se arrastra

#### Doble Clic

- Alternativa al drag & drop
- Doble clic en una tarjeta la mueve a la columna opuesta
- Útil para dispositivos táctiles o preferencia del usuario

#### Botón Continuar

- Aparece dinámicamente cuando hay al menos 1 afinidad seleccionada
- Muestra el contador de afinidades seleccionadas
- Diseño destacado con sombra roja de Claro
- Efecto hover con escalado

## 🎨 Diseño

### Iconos de Afinidades

Cada afinidad tiene un emoji asociado:

- 📈 Educación financiera
- 🏗️ Construcción
- 📱 Tecnología
- ✈️ Turismo
- 📰 Noticias nacionales
- ⚽ Deportes
- 🎵 Música
- 🚗 Movilidad
- 🍽️ Gastronomía
- 🎬 Entretenimiento y OTT
- 🎓 Educación
- 🗳️ Participación ciudadana
- ❤️ Salud
- 💰 Criptomonedas
- 🩺 Telemedicina
- 🛒 E-Commerce
- 📸 Fotografía
- 🏋️ Bienestar y Fitness
- 🏬 Centro comercial
- 🔖 Ofertas y descuentos

### Colores y Estilos

**Zona Disponibles:**

- Fondo: `bg-white/5` con backdrop blur
- Borde: `border-white/20`
- Tarjetas: `bg-white/10` → `hover:bg-white/20`

**Zona Seleccionadas:**

- Fondo: Gradiente `from-claro-red/20 to-claro-red/5`
- Borde: `border-claro-red/40` → drag: `border-claro-red`
- Tarjetas: `bg-claro-red/30` → `hover:bg-claro-red/40`
- Sombra: `shadow-lg shadow-claro-red/30` al hacer drag over

### Animaciones

- **Entrada:** `animate-slide-up`
- **Hover:** `scale-105` + cambio de opacidad
- **Drag:** Opacidad al 50% en origen
- **Transiciones:** `transition-all duration-300`

## 🔧 Implementación Técnica

### Componentes

**DragDropBoard.jsx**

- Componente principal del tablero
- Maneja estado de disponibles y seleccionados
- Implementa API HTML5 Drag & Drop
- Props:
  - `options`: Array de opciones disponibles
  - `onComplete`: Callback cuando se confirma selección
  - `iconMap`: Objeto con mapeo texto → icono

**ChatAgent.jsx (Actualizado)**

- Detecta paso de 'afinidades'
- Renderiza `DragDropBoard` en lugar de `ChatOptions`
- Pasa `TODAS_AFINIDADES` e `ICONOS_AFINIDADES`

**mockData.js (Actualizado)**

- `TODAS_AFINIDADES`: Array completo de opciones
- `ICONOS_AFINIDADES`: Mapeo de afinidades a emojis
- `AFINIDADES_POR_SECTOR`: Mantiene estructura previa

### API HTML5 Drag & Drop

```javascript
// Events utilizados:
onDragStart    // Inicio de arrastre
onDragEnd      // Fin de arrastre
onDragOver     // Elemento sobre zona de drop
onDragEnter    // Entra a zona de drop
onDragLeave    // Sale de zona de drop
onDrop         // Suelta en zona de drop
```

### Estado

```javascript
const [available, setAvailable] = useState(options);
const [selected, setSelected] = useState([]);
const [draggedItem, setDraggedItem] = useState(null);
const [dragOverZone, setDragOverZone] = useState(null);
```

## 🚀 Flujo de Usuario

1. Usuario completa selección de nivel socioeconómico
2. Agente muestra mensaje explicando el tablero interactivo
3. Aparece el tablero con dos columnas
4. Usuario arrastra o hace doble clic en afinidades
5. Las tarjetas se mueven entre columnas con animaciones
6. Contador muestra número de afinidades seleccionadas
7. Botón "Continuar" aparece cuando hay al menos 1 selección
8. Al hacer clic en Continuar, se procesa la selección

## 📱 Responsive

- **Desktop:** Grid de 2 columnas (50/50)
- **Mobile:** Grid de 1 columna (columnas apiladas)
- Altura adaptativa con scroll interno
- Máxima altura de 500px con overflow-y-auto

## ♿ Accesibilidad

- Atributo `draggable` en elementos arrastrables
- Alternativa de doble clic para usuarios con limitaciones
- Indicadores visuales claros de estado
- Texto descriptivo en áreas vacías
- Iconos con significado visual

## 🎯 Mejoras Futuras

- [ ] Categorización de afinidades por grupos
- [ ] Búsqueda/filtro de afinidades
- [ ] Animación ordenada al mover múltiples items
- [ ] Reordenamiento dentro de cada columna
- [ ] Atajos de teclado (accesibilidad)
- [ ] Animación de confeti al completar selección
- [ ] Sugerencias inteligentes basadas en sector
- [ ] Versión touch optimizada para móvil

## 💡 Tips de UX

**Para el usuario:**

- Tip mostrado: "Arrastra las tarjetas o haz doble clic para moverlas entre columnas"
- Instrucciones claras en mensaje del agente
- Feedback visual inmediato en cada interacción
- Estado vacío ilustrativo con iconos y texto

## 🐛 Casos Especiales

- **Sin afinidades disponibles:** Mensaje "Todas las afinidades seleccionadas"
- **Sin afinidades seleccionadas:** Área de drop ilustrada con llamado a la acción
- **Durante drag:** Opacidad reducida en elemento arrastrado
- **Sobre zona válida:** Borde y fondo destacados

## 📊 Datos

Todas las afinidades disponibles se extraen de `TODAS_AFINIDADES` en lugar de filtrar por sector, dando al usuario libertad total para personalizar su selección independientemente del sector elegido.

---

**Implementado:** 6 de marzo de 2026  
**Componentes afectados:** ChatAgent.jsx, DragDropBoard.jsx (nuevo), mockData.js  
**Compatibilidad:** Todos los navegadores modernos con HTML5 Drag & Drop API
