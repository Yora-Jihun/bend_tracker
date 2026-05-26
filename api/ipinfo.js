export default async function handler(req, res) {
  try {
    const response = await fetch("https://ipinfo.io/json?token=5779678ae682d8");
    const data = await response.json();

    res.status(200).json({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      loc: data.loc,
      org: data.org,
      timezone: data.timezone
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch IP info" });
  }
}
