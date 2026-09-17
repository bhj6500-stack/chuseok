module.exports = async (req, res) => {
  const key = process.env.EX_KEY || "test";
  const all = [];
  try {
    for (let page = 1; page <= 5; page++) {
      const url =
        "https://data.ex.co.kr/openapi/business/curStateStation?key=" +
        key + "&type=json&numOfRows=99&pageNo=" + page;
      const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      const data = await r.json();
      const list = data.list || [];
      all.push.apply(all, list);
      if (list.length < 99) break;
    }
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ list: all, count: all.length });
  } catch (e) {
    res.status(502).json({ error: "upstream fetch failed" });
  }
};
