import {MongoClient} from 'mongodb'

async function handler(req, res) {
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

    let client

    try {
    client = await MongoClient.connect('mongodb+srv://gv_blog:gv_blog@cluster0.icgtj.mongodb.net/my-site?retryWrites=true&w=majority')
    } catch (error) {
        res.status(500).json({message: 'Could not connect to database.'});
        return
    }

    const db = client.db()
    let result

    try {
     result = await db.collection('messages').insertOne(newMessage)
     // don't need this code b/c result object automatically adds mongodb _id 
     //  newMessage.id = result.insertedId
    }  catch (error) {
            client.close()
            res.status(500).json({message: 'Something went wrong. Message not saved in database.'});
            return
    }
    

    client.close()
    res.status(201).json({message: 'Message successfully stored', newMessage: newMessage})
   
  }
}

export default handler;
