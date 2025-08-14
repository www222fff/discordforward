export default {
  async fetch(request) {
    const DISCORD_WEBHOOK = "";

    try {
      // 解析请求 JSON
      let data = {};
      try {
        data = await request.json();
      } catch {
        data = { content: "Default message (empty request)" };
      }

      // Discord 要求的 payload
      const payload = {
        content: data.content || "Default message"
      };

      const response = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      return new Response(JSON.stringify({ status: response.status }), { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }
};
