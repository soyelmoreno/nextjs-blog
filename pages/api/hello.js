// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
  // A good use case for API routes is handling form input.
  const email = req.body.email;
  const name = req.body.name;
  // etc.
  // Then write more server code to save email, name to your database.

  // Send a response
  res.status(200).json({ text: 'Hello' });
}
