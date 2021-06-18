// const fetch = require("node-fetch");

// export default async function handler(data) {
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
//     {
//       headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
//       method: "POST",
//       body: JSON.stringify(data),
//     }
//   );
//   const result = await response.json();
//   return {
//     props: {
//       output: result,
//     },
//   };
// }

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
