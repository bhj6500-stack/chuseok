module.exports = async (req, res) => {
  const key = process.env.EX_KEY || "test";
  const url = "https://data.ex.co.kr/openapi/odtraffic/trafficAmountByRealtime?key=" + key + "&type=json&numOfRows=99&pageNo=1";
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const data = await r.json();
    const list = (data.list || [])
      .filter((x) => x.grade !== "0")
      .map((x) => ({
        routeName: x.routeName,
        conzoneName: x.conzoneName,
        updownType: x.updownTypeCode,
        speed: parseInt(x.speed, 10),
        grade: x.grade
      }));
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ list: list, count: list.length });
  } catch (e) {
    res.status(502).json({ error: "upstream fetch failed" });
  }
};
