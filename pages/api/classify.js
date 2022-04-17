async function handler(req, res) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/joeddav/distilbert-base-uncased-go-emotions-student",
    {
      headers: { Authorization: `Bearer ${process.env.HF_KEY}` },
      method: "POST",
      body: JSON.stringify(req.body.sentence),
    }
  );
  const data = await response.json();
  // console.log(data);
  return res.json(data);
}

export default handler;
