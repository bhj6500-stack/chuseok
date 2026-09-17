module.exports = async (req, res) => {
  const key = process.env.EX_KEY || "test";
  const url = "https://data.ex.co.kr/openapi/safeDriving/forecast?key=" + key + "&type=json&numOfRows=99&pageNo=1";
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const data = await r.json();
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: "upstream fetch failed" });
  }
};
