import clientPromise from "../../lib/mongodb";

// Define the asynchronous function to handle the API
const createPool = async (req, res) => {
  if (req.method === "POST") {
    try {
      const {
        tokenAContractAddress,
        tokenBContractAddress,
        poolContractAddress,
      } = req.body;
      const poolName = `${tokenAContractAddress}-${tokenBContractAddress}`;

      const client = await clientPromise;
      const db = client.db("SwapFi");

      // Insert the new pool into the "pools" collection
      const result = await db.collection("pools").insertOne({
        poolName,
        tokenAContractAddress,
        tokenBContractAddress,
        poolContractAddress,
      });

      // Respond with the newly created pool data
      if (result.insertedId) {
        const newlyCreatedPool = await db
          .collection("pools")
          .findOne({ _id: result.insertedId });
        res.json(newlyCreatedPool);
      } else {
        res.status(500).send("Pool creation failed");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  } else {
    res.status(405).end(); // Method Not Allowed if it's not a POST request
  }
};

export default createPool;
