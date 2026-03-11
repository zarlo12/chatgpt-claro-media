# 🎯 Sistema 2 Stands - URLs Rápidas

## Stand A

### Pantalla 1 (Conversación)

```
http://localhost:5173/?stand=A
```

### Pantalla 2 (Resultados)

```
http://localhost:5173/display?stand=A
```

---

## Stand B

### Pantalla 1 (Conversación)

```
http://localhost:5173/?stand=B
```

### Pantalla 2 (Resultados)

```
http://localhost:5173/display?stand=B
```

---

## 🚀 Iniciar

```bash
npm run dev
```

Luego abre las 4 URLs en navegadores/pestañas diferentes.

---

## ✅ Funcionamiento

1. Usuario completa conversación en Pantalla 1
2. Datos se guardan en Firebase con `standId: "A"` o `"B"`
3. Pantalla 2 detecta automáticamente el cambio
4. Resultados aparecen instantáneamente en Pantalla 2
5. **Sin mezcla de datos** entre stands

---

Para más detalles ver: [SETUP_2_STANDS.md](SETUP_2_STANDS.md)
