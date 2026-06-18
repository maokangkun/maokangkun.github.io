export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, corsHeaders);
    }

    if (!env.OPENROUTER_API_KEY) {
      return json({ error: "Missing OPENROUTER_API_KEY secret" }, 500, corsHeaders);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400, corsHeaders);
    }

    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (!messages.length) {
      return json({ error: "messages is required" }, 400, corsHeaders);
    }

    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": env.APP_URL || request.headers.get("Origin") || "https://example.com",
        "X-OpenRouter-Title": "一周旅行日语交互教程"
      },
      body: JSON.stringify({
        model: body.model || env.OPENROUTER_MODEL || "deepseek/deepseek-chat-v3-0324:free",
        messages,
        temperature: body.temperature ?? 0.95,
        max_tokens: body.max_tokens ?? 1400,
        response_format: { type: "json_object" }
      })
    });

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        ...corsHeaders,
        "Content-Type": upstream.headers.get("Content-Type") || "application/json"
      }
    });
  }
};

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  });
}
