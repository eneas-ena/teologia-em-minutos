// api/_porteiro.js — confere, NO SERVIDOR, se quem pede é o Bispo.
// (O nome começa com "_" para a Vercel não publicar este arquivo como endereço.)
//
// O app envia o "crachá" do login (token do Supabase). Aqui perguntamos ao
// Supabase se esse crachá é válido e se pertence ao dono (função eh_dono).
// Sem isso, ninguém usa a IA nem os favoritos, mesmo que descubra o endereço.
// A URL e a chave abaixo são as PÚBLICAS do projeto; não há segredo aqui.

const SUPA_URL = "https://ghjbljypxksubmcsvaig.supabase.co";
const SUPA_KEY = "sb_publishable_qXCYqg1WdmelY9D1mptZXg_U8NdoKby";

module.exports = async function exigirDono(req, res) {
  const h = String(req.headers["authorization"] || "");
  const token = h.startsWith("Bearer ") ? h.slice(7).trim() : "";
  if (!token) {
    res.status(401).json({ error: "Entre com o seu e-mail e senha.", login: true });
    return false;
  }
  try {
    const r = await fetch(SUPA_URL + "/rest/v1/rpc/eh_dono", {
      method: "POST",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + token, "content-type": "application/json" },
      body: "{}",
    });
    if (r.status === 401) {
      res.status(401).json({ error: "Sessão expirada. Entre de novo.", login: true });
      return false;
    }
    const ok = await r.json().catch(() => null);
    if (ok === true) return true;
    res.status(403).json({ error: "Esta conta não tem acesso.", login: true });
    return false;
  } catch (e) {
    res.status(503).json({ error: "Não foi possível conferir o login. Tente de novo." });
    return false;
  }
};
