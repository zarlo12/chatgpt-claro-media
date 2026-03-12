const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const chromium = require("@sparticuz/chromium");

admin.initializeApp();

// 📧 Configuración de Nodemailer con Gmail
// IMPORTANTE: Debes configurar estas variables en Firebase Functions:
// firebase functions:config:set gmail.email="tu-email@gmail.com" gmail.password="tu-app-password"
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zarlo0o12195@gmail.com",
    pass: "zmwc ttom wadk vmhk",
  },
});

/**
 * 🎨 Template HTML para el PDF con diseño profesional de ClaroMedia
 */
const generarHTMLPropuesta = (propuesta) => {
  // Helper para formatear arrays
  const formatearArray = (arr) => {
    if (!arr || !Array.isArray(arr)) return "";
    return arr.join(", ");
  };

  // Paquete recomendado
  const paquete = propuesta.paqueteRecomendado?.paquete;
  const alcanceTotal = propuesta.valorPropuesta?.alcanceTotal || "N/A";

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Propuesta Estratégica - ClaroMedia</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: #ffffff;
      padding: 40px;
      line-height: 1.6;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 24px;
      padding: 40px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 2px solid #E30613;
    }
    
    .logo-section {
      margin-bottom: 20px;
    }
    
    h1 {
      font-size: 42px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .subtitle {
      font-size: 20px;
      color: #E30613;
      font-weight: 600;
    }
    
    .section {
      margin-bottom: 35px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 16px;
      padding: 25px;
      border-left: 4px solid #E30613;
    }
    
    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: #E30613;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
    }
    
    .section-title::before {
      content: '▶';
      margin-right: 10px;
      font-size: 18px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .info-item {
      background: rgba(227, 6, 19, 0.1);
      padding: 15px;
      border-radius: 12px;
      border: 1px solid rgba(227, 6, 19, 0.3);
    }
    
    .info-label {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }
    
    .info-value {
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
    }
    
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 15px;
    }
    
    .tag {
      background: rgba(227, 6, 19, 0.2);
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      border: 1px solid rgba(227, 6, 19, 0.4);
    }
    
    .insights-list {
      list-style: none;
      padding: 0;
    }
    
    .insights-list li {
      background: rgba(255, 255, 255, 0.05);
      padding: 15px 20px;
      margin-bottom: 12px;
      border-radius: 10px;
      border-left: 3px solid #E30613;
      font-size: 15px;
    }
    
    /* Paquete destacado */
    .paquete-destacado {
      background: linear-gradient(135deg, rgba(227, 6, 19, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%);
      border: 2px solid #E30613;
      border-radius: 20px;
      padding: 35px;
      margin: 30px 0;
      text-align: center;
    }
    
    .paquete-badge {
      background: rgba(227, 6, 19, 0.3);
      display: inline-block;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 15px;
      border: 1px solid #E30613;
    }
    
    .paquete-nombre {
      font-size: 48px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 15px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .paquete-descripcion {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 25px;
    }
    
    .precio-section {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;
      margin-bottom: 20px;
    }
    
    .precio-anterior {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.5);
      text-decoration: line-through;
    }
    
    .precio-actual {
      font-size: 42px;
      font-weight: 900;
      color: #E30613;
      background: rgba(255, 255, 255, 0.1);
      padding: 15px 30px;
      border-radius: 12px;
    }
    
    .descuento-badge {
      background: rgba(34, 197, 94, 0.3);
      color: #4ade80;
      font-size: 18px;
      font-weight: 700;
      padding: 10px 20px;
      border-radius: 20px;
      border: 1px solid rgba(34, 197, 94, 0.5);
    }
    
    .alcance-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 25px 0;
    }
    
    .alcance-item {
      background: rgba(255, 255, 255, 0.05);
      padding: 20px;
      border-radius: 12px;
      text-align: center;
    }
    
    .alcance-label {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    
    .alcance-valor {
      font-size: 36px;
      font-weight: 900;
      color: #E30613;
    }
    
    .componentes-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin: 20px 0;
    }
    
    .componente-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 15px;
    }
    
    .componente-numero {
      background: linear-gradient(135deg, #E30613 0%, #ec4899 100%);
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 14px;
      margin-bottom: 8px;
    }
    
    .componente-nombre {
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 5px;
    }
    
    .componente-detalle {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 8px;
    }
    
    .componente-alcance {
      background: linear-gradient(135deg, #E30613 0%, #ec4899 100%);
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
    }
    
    .beneficios-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 20px;
    }
    
    .beneficios-col {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      border-radius: 12px;
      padding: 20px;
    }
    
    .col-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 15px;
      color: #4ade80;
    }
    
    .beneficios-col ul {
      list-style: none;
      padding: 0;
    }
    
    .beneficios-col li {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
      font-size: 13px;
    }
    
    .beneficios-col li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #4ade80;
      font-weight: 900;
      font-size: 16px;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 30px;
      border-top: 2px solid rgba(227, 6, 19, 0.5);
      text-align: center;
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
    }
    
    .footer-logo {
      margin-bottom: 15px;
      font-size: 24px;
      font-weight: 900;
      color: #E30613;
    }
    
    @media print {
      body {
        padding: 20px;
      }
      .container {
        border: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo-section">
        <div style="font-size: 36px; font-weight: 900; color: #E30613; margin-bottom: 5px;">CLARO</div>
        <div style="font-size: 14px; color: rgba(255,255,255,0.6); letter-spacing: 3px;">MEDIA</div>
      </div>
      <h1>Propuesta Estratégica</h1>
      <div class="subtitle">Sector: ${propuesta.sector}</div>
    </div>

    <!-- Datos de Contacto -->
    ${
      propuesta.nombre || propuesta.correo || propuesta.celular
        ? `
    <div class="section">
      <div class="section-title">Información de Contacto</div>
      <div class="info-grid">
        ${propuesta.nombre ? `<div class="info-item"><div class="info-label">Nombre</div><div class="info-value">${propuesta.nombre}</div></div>` : ""}
        ${propuesta.correo ? `<div class="info-item"><div class="info-label">Correo</div><div class="info-value">${propuesta.correo}</div></div>` : ""}
        ${propuesta.celular ? `<div class="info-item"><div class="info-label">Celular</div><div class="info-value">${propuesta.celular}</div></div>` : ""}
      </div>
    </div>
    `
        : ""
    }

    <!-- Perfil de Audiencia -->
    <div class="section">
      <div class="section-title">Perfil de Audiencia</div>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Género</div>
          <div class="info-value">${propuesta.audiencia?.genero || "N/A"}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Edad</div>
          <div class="info-value">${formatearArray(propuesta.audiencia?.edad) || "N/A"}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Nivel Socioeconómico</div>
          <div class="info-value">${formatearArray(propuesta.audiencia?.nivelSocioeconomico) || "N/A"}</div>
        </div>
      </div>
    </div>

    <!-- Afinidades -->
    ${
      propuesta.afinidades && propuesta.afinidades.length > 0
        ? `
    <div class="section">
      <div class="section-title">Afinidades Identificadas</div>
      <div class="tags">
        ${propuesta.afinidades.map((afinidad) => `<span class="tag">${afinidad}</span>`).join("")}
      </div>
    </div>
    `
        : ""
    }

    <!-- PAQUETE RECOMENDADO - SÚPER DESTACADO -->
    ${
      paquete
        ? `
    <div class="paquete-destacado">
      <div class="paquete-badge">📦 Tu Paquete Ideal</div>
      <div class="paquete-nombre">${paquete.nombre}</div>
      <div class="paquete-descripcion">${paquete.descripcion}</div>
      
      <div class="precio-section">
        <div class="precio-anterior">$${paquete.precio.toLocaleString("es-CO")}</div>
        <div class="precio-actual">$${paquete.precioPreventa.toLocaleString("es-CO")}</div>
        <div class="descuento-badge">${paquete.descuento}</div>
      </div>
      
      <div style="font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 20px;">${paquete.impuestos}</div>
      
      <!-- Alcance Comparativo -->
      <div class="alcance-grid">
        <div class="alcance-item">
          <div class="alcance-label">Alcance Ideal del Paquete</div>
          <div class="alcance-valor">${paquete.alcanceIdeal}</div>
        </div>
        <div class="alcance-item" style="border: 2px solid #E30613;">
          <div class="alcance-label">✨ Tu Alcance Potencial</div>
          <div class="alcance-valor">${alcanceTotal}</div>
        </div>
      </div>
      
      <!-- Todos los componentes -->
      <div style="margin-top: 30px; text-align: left;">
        <h3 style="font-size: 24px; font-weight: 900; color: #ffffff; text-align: center; margin-bottom: 20px;">
          TODO lo que Incluye
        </h3>
        <div class="componentes-grid">
          ${paquete.componentes
            .map(
              (comp, idx) => `
            <div class="componente-card">
              <div class="componente-numero">${idx + 1}</div>
              <div class="componente-nombre">${comp.nombre}</div>
              <div class="componente-detalle">${comp.detalle}</div>
              ${comp.alcance !== "N/A" ? `<div class="componente-alcance">${comp.alcance}</div>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
        <div style="text-align: center; margin-top: 20px; background: rgba(227,6,19,0.2); padding: 15px; border-radius: 12px; border: 1px solid rgba(227,6,19,0.4);">
          <span style="font-size: 18px; font-weight: 700;">🎁 Total: <span style="color: #ffffff;">${paquete.productos} productos completos</span></span>
        </div>
      </div>
      
      <!-- Beneficios e Ideal Para -->
      <div class="beneficios-grid" style="margin-top: 30px;">
        <div class="beneficios-col">
          <div class="col-title">Beneficios Clave</div>
          <ul>
            ${paquete.beneficios.map((b) => `<li>${b}</li>`).join("")}
          </ul>
        </div>
        <div class="beneficios-col" style="background: rgba(168, 85, 247, 0.1); border-color: rgba(168, 85, 247, 0.3);">
          <div class="col-title" style="color: #c084fc;">Ideal Para</div>
          <ul>
            ${paquete.recomendadoPara.map((r) => `<li>${r}</li>`).join("")}
          </ul>
        </div>
      </div>
      
      <!-- Argumento de la IA -->
      ${
        propuesta.paqueteRecomendado?.mensajePersonalizado
          ? `
      <div style="margin-top: 25px; background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; padding: 20px; text-align: left;">
        <h4 style="font-size: 18px; font-weight: 700; color: #c084fc; margin-bottom: 10px;">¿Por qué ${paquete.nombre}?</h4>
        <p style="font-size: 14px; color: rgba(255,255,255,0.9); line-height: 1.6;">${propuesta.paqueteRecomendado.mensajePersonalizado}</p>
      </div>
      `
          : ""
      }
    </div>
    `
        : ""
    }

    <!-- Insights Clave -->
    ${
      propuesta.insights && propuesta.insights.length > 0
        ? `
    <div class="section">
      <div class="section-title">Insights Clave</div>
      <ul class="insights-list">
        ${propuesta.insights.map((insight) => `<li>${insight}</li>`).join("")}
      </ul>
    </div>
    `
        : ""
    }

    <!-- Insights GeoEspaciales -->
    ${
      propuesta.insightsGeoespaciales &&
      propuesta.insightsGeoespaciales.length > 0
        ? `
    <div class="section" style="border-left-color: #3b82f6;">
      <div class="section-title" style="color: #3b82f6;">Insights Estación Analítica GeoEspacial</div>
      <ul class="insights-list">
        ${propuesta.insightsGeoespaciales.map((insight) => `<li style="border-left-color: #3b82f6;">${insight}</li>`).join("")}
      </ul>
    </div>
    `
        : ""
    }

    <!-- Recomendaciones Estratégicas -->
    ${
      propuesta.recomendaciones && propuesta.recomendaciones.length > 0
        ? `
    <div class="section">
      <div class="section-title">Recomendaciones Estratégicas</div>
      <ul class="insights-list">
        ${propuesta.recomendaciones.map((rec, idx) => `<li><strong>${idx + 1}.</strong> ${rec}</li>`).join("")}
      </ul>
    </div>
    `
        : ""
    }

    <!-- Próximos Pasos -->
    ${
      propuesta.proximosPasos && propuesta.proximosPasos.length > 0
        ? `
    <div class="section">
      <div class="section-title">Próximos Pasos</div>
      <ul class="insights-list">
        ${propuesta.proximosPasos.map((paso) => `<li>${paso}</li>`).join("")}
      </ul>
    </div>
    `
        : ""
    }

    <!-- Footer -->
    <div class="footer">
      <div class="footer-logo">CLARO MEDIA</div>
      <p>Propuesta estratégica generada por IA • ${new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</p>
      <p style="margin-top: 10px; font-size: 12px;">Este documento contiene información confidencial de ClaroMedia</p>
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * 📨 Cloud Function HTTP para enviar propuesta por correo
 * Uso: POST https://REGION-PROJECT_ID.cloudfunctions.net/enviarPropuestaPorCorreo
 * Body: { propuesta: {...}, destinatario: "email@example.com" }
 */
exports.enviarPropuestaPorCorreo = functions
  .region("us-central1") // Puedes cambiar la región
  .runWith({
    timeoutSeconds: 540,
    memory: "2GB",
  })
  .https.onRequest(async (req, res) => {
    // Configurar CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Manejar preflight OPTIONS request
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    // Solo permitir POST
    if (req.method !== "POST") {
      res.status(405).json({ error: "Método no permitido. Usa POST." });
      return;
    }

    try {
      const { propuesta, destinatario } = req.body;

      // Validaciones
      if (!propuesta || !destinatario) {
        res.status(400).json({
          error: "Faltan parámetros requeridos: propuesta y destinatario",
        });
        return;
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(destinatario)) {
        res.status(400).json({ error: "Email inválido" });
        return;
      }

      console.log("🚀 Generando PDF para:", destinatario);

      // Generar HTML
      const html = generarHTMLPropuesta(propuesta);

      // Generar PDF con Puppeteer (configuración para Cloud Functions)
      const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20px",
          right: "20px",
          bottom: "20px",
          left: "20px",
        },
      });

      await browser.close();

      console.log("✅ PDF generado exitosamente");

      // Preparar email
      const nombreCliente = propuesta.nombre || "Cliente";
      const sector = propuesta.sector || "su sector";

      const mailOptions = {
        from: `"ClaroMedia - Propuestas Estratégicas" <zarlo0o12195@gmail.com>`,
        to: destinatario,
        subject: `🎯 Tu Propuesta Estratégica Personalizada - ${sector}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px; border-radius: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #E30613; font-size: 36px; margin: 0;">CLARO MEDIA</h1>
                <p style="color: rgba(255,255,255,0.6); font-size: 14px; letter-spacing: 2px; margin-top: 5px;">PROPUESTA ESTRATÉGICA</p>
              </div>
              
              <div style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 30px; border: 1px solid rgba(255,255,255,0.1);">
                <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">¡Hola ${nombreCliente}! 👋</h2>
                
                <p style="color: rgba(255,255,255,0.8); font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  Nos complace presentarte tu <strong style="color: #E30613;">Propuesta Estratégica Personalizada</strong> 
                  para ${sector}, generada con nuestra avanzada inteligencia artificial.
                </p>
                
                <div style="background: linear-gradient(135deg, rgba(227, 6, 19, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%); border: 2px solid #E30613; border-radius: 12px; padding: 20px; margin: 25px 0; text-align: center;">
                  <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin-bottom: 10px;">📎 Documento adjunto:</p>
                  <p style="color: #ffffff; font-size: 18px; font-weight: 700; margin: 0;">Propuesta_Estrategica_${sector.replace(/\s+/g, "_")}.pdf</p>
                </div>
                
                <p style="color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.6; margin-bottom: 15px;">
                  <strong style="color: #E30613;">¿Qué encontrarás en este documento?</strong>
                </p>
                
                <ul style="color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.8; margin-left: 20px;">
                  <li>📊 Análisis detallado de tu audiencia objetivo</li>
                  <li>🎯 Insights clave y recomendaciones estratégicas</li>
                  <li>📦 Paquete comercial personalizado con descuentos especiales</li>
                  <li>🚀 Próximos pasos para implementar tu estrategia</li>
                  <li>🌍 Insights geoespaciales (cuando aplique)</li>
                </ul>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                  <p style="color: rgba(255,255,255,0.6); font-size: 13px; line-height: 1.6; margin: 0;">
                    <strong>💡 Próximo paso:</strong> Revisa el documento adjunto y contacta a tu ejecutivo de cuenta 
                    para una reunión personalizada donde podemos profundizar en esta propuesta.
                  </p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid rgba(227, 6, 19, 0.5);">
                <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 5px 0;">
                  <strong style="color: #E30613;">ClaroMedia</strong> - Conectando audiencias, impulsando resultados
                </p>
                <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 5px 0;">
                  Este documento es confidencial y está destinado únicamente a su destinatario.
                </p>
              </div>
            </div>
          `,
        attachments: [
          {
            filename: `Propuesta_Estrategica_${sector.replace(/\s+/g, "_")}.pdf`,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      };

      // Enviar email
      await transporter.sendMail(mailOptions);

      console.log("✅ Email enviado exitosamente a:", destinatario);

      res.status(200).json({
        success: true,
        message: "Propuesta enviada exitosamente",
        destinatario: destinatario,
      });
    } catch (error) {
      console.error("❌ Error en enviarPropuestaPorCorreo:", error);
      res.status(500).json({
        error: "Error al enviar la propuesta",
        details: error.message,
      });
    }
  });
