// controllers/UsersController.js
import sha1 from 'sha1';
import dbClient from '../utils/db'; // Ensure this path is correct for your DbClient instance

class UsersController {
  /**
   * Creates a new user in the database.
   * @param {object} req - The request object (should contain email and password in body).
   * @param {object} res - The response object.
   */
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Validate if email is provided
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    // Validate if password is provided
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      // Get the 'users' collection
      const usersCollection = dbClient.db.collection('users');

      // Check if user with the given email already exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
      }

      // Hash the password using SHA1
      const hashedPassword = sha1(password);

      // Create a new user object
      const newUser = {
        email,
        password: hashedPassword,
      };

      // Insert the new user into the database
      const result = await usersCollection.insertOne(newUser);

      // Return the new user with only id and email
      return res.status(201).json({ id: result.insertedId.toString(), email });
    } catch (error) {
      console.error(`Error creating new user: ${error.message}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;

