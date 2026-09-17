module.exports = async (req, res) => {
  const key = process.env.EX_KEY || "test";
  const all = [];
  try {
    for (let page = 1; page <= 5; page++) {
      const url =
        "https://data.ex.co.kr/openapi/locationinfo/locationinfoRest?key=" +
        key + "&type=json&numOfRows=99&pageNo=" + page;
      const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      const data = await r.json();
      const list = data.list || [];
      all.push.apply(all, list);
      if (list.length < 99) break;
    }
    var slim = all.map(function (item) {
      return {
        name: item.unitName,
        route: item.routeName,
        serviceAreaCode: (item.serviceAreaCode || "").replace(/^[A-Za-z]/, ""),
        lat: parseFloat(item.yValue),
        lng: parseFloat(item.xValue)
      };
    }).filter(function (item) { return !isNaN(item.lat) && !isNaN(item.lng); });

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ list: slim, count: slim.length });
  } catch (e) {
    res.status(502).json({ error: "upstream fetch failed" });
  }
};
