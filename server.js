require("dotenv").config({ quiet: true });

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "32kb" }));
app.use(express.static(__dirname));

const requiredFields = ["nome", "email", "whatsapp", "interesse", "mensagem"];

function getMissingFields(body) {
  return requiredFields.filter((field) => !String(body[field] || "").trim());
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

app.post(["/api/orcamento/email", "/.netlify/functions/send-budget-email"], async (request, response) => {
  const missingFields = getMissingFields(request.body);

  if (missingFields.length > 0) {
    return response.status(400).json({
      ok: false,
      message: "Preencha todos os campos obrigatórios.",
      missingFields
    });
  }

  const { nome, email, whatsapp, interesse, mensagem } = request.body;
  const transporter = createTransporter();
  const text = [
    "Novo pedido de orçamento pelo site.",
    "",
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    `WhatsApp: ${whatsapp}`,
    `Tipo de projeto: ${interesse}`,
    "",
    "Mensagem:",
    mensagem
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"Site Pedro Monteiro" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `Novo orçamento - ${nome}`,
      text
    });

    return response.json({
      ok: true,
      message: "Orçamento enviado por e-mail com sucesso."
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);

    return response.status(502).json({
      ok: false,
      message: "Não foi possível enviar o e-mail agora. Tente novamente em alguns instantes."
    });
  }
});

app.listen(port, () => {
  console.log(`Site rodando em http://localhost:${port}`);
});
