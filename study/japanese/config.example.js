// Copy this file to config.local.js for local/private use.
// Best for public sites: deploy the Cloudflare Worker in cloudflare-worker-openrouter-proxy.js,
// put the real key in the Worker's OPENROUTER_API_KEY secret, then paste the Worker URL here.
window.JAPANESE_TUTOR_AI_PROXY_URL = "";

// Local-only fallback. Never commit a real OpenRouter key to a public repository or GitHub Pages source.
window.JAPANESE_TUTOR_OPENROUTER_KEY = "";
window.JAPANESE_TUTOR_OPENROUTER_MODEL = "deepseek/deepseek-chat-v3-0324:free";
