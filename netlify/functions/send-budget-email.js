const nodemailer = require("nodemailer");

const requiredFields = ["nome", "email", "whatsapp", "interesse", "mensagem"];

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
}

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

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, {
      ok: false,
      message: "Método não permitido."
    });
  }

  let body;

  try {
    body = JSON.parse(event.body || "{}");
  } catch (_error) {
    return json(400, {
      ok: false,
      message: "JSON inválido."
    });
  }

  const missingFields = getMissingFields(body);

  if (missingFields.length > 0) {
    return json(400, {
      ok: false,
      message: "Preencha todos os campos obrigatórios.",
      missingFields
    });
  }

  const { nome, email, whatsapp, interesse, mensagem } = body;
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
    await createTransporter().sendMail({
      from: `"Site Pedro Monteiro" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `Novo orçamento - ${nome}`,
      text
    });

    return json(200, {
      ok: true,
      message: "Orçamento enviado por e-mail com sucesso."
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);

    return json(502, {
      ok: false,
      message: "Não foi possível enviar o e-mail agora. Tente novamente em alguns instantes."
    });
  }
};

