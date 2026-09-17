// OpenStreetMap Nominatim(무료 지오코딩)으로 지명 -> 좌표를 찾는다.
// Nominatim 이용 정책상 앱을 식별할 수 있는 User-Agent를 반드시 넣어야 한다.
module.exports = async (req, res) => {
  var q = (req.query && req.query.q) || "";
  if (!q) {
    res.status(400).json({ error: "q required" });
    return;
  }
  try {
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=kr&q=" +
      encodeURIComponent(q + ", 대한민국");
    var r = await fetch(url, { headers: { "User-Agent": "chuseok-guide-app/1.0 (education project)" } });
    var data = await r.json();
    var item = data && data[0];
    if (!item) {
      res.status(404).json({ error: "not found" });
      return;
    }
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ lat: parseFloat(item.lat), lng: parseFloat(item.lon), name: item.display_name });
  } catch (e) {
    res.status(502).json({ error: "upstream fetch failed" });
  }
};
