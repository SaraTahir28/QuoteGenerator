import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000; //adding the port given by coolify so the app works in production.

const quotes = [
  {
    quote: "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
];

function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

app.get("/", (req, res) => {
  const quote = randomQuote();
  res.json(quote) //sends quote to frontend as JSON rather than a string, so that frontend can display as it pleases.
});
// 
app.post("/", (req, res) => {
  const bodyBytes = [];
  req.on("data", chunk => bodyBytes.push(...chunk));
  req.on("end", () => {
    const bodyString = String.fromCharCode(...bodyBytes);
    let body;
    try {
      body = JSON.parse(bodyString);
    } catch (error) {
      console.error(`Failed to parse body ${bodyString} as JSON: ${error}`);
      res.status(400).send("Expected body to be JSON.");
      return;
    }
    if (typeof body != "object" || !("quote" in body) || !("author" in body)) {
      console.error(`Failed to extract quote and author from post body: ${bodyString}`);
      res.status(400).send("Expected body to be a JSON object containing keys quote and author.");
      return;
    }
    //New Validation
    if (!body.quote.trim() || !body.author.trim()) { 
      res.status(400).send("Quote and author cannot be empty."); 
      return; 
    }
    quotes.push({
      quote: body.quote,
      author: body.author,
    });
    res.send("ok");
  });
});

app.listen(PORT, "0.0.0.0", () =>{ 
  console.log(`Quote server listening on port ${PORT}`); });