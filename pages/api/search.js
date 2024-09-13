import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("userdb");
    const users = await db
      .collection("users")
      .find({
        $or: [
          { first_name: { $regex: query, $options: "i" } },
          { last_name: { $regex: query, $options: "i" } },
          { city: { $regex: query, $options: "i" } },
        ],
      })
      .toArray();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data" });
  }
}
