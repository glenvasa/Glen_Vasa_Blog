function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body; // Next automatically parses body object

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      !message.trim() === ""
    ) {
        res.status(422).json({message: "Invalid input"})
        return
    }

    // store data received in database
    const newMessage = {
        email,
        name, 
        message
    }

    console.log(newMessage);

    res.status(201).json({message: 'Message successfully stored', newMessage: newMessage})

  }
}

export default handler;
