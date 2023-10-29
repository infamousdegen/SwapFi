import clientPromise from "../../lib/mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("SwapFi");

    const movies = await db
      .collection("Pools")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    res.json(movies);
  } catch (e) {
    console.error(e);
  }
};
