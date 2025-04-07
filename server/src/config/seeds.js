import db from './connection.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

db.once('open', async () => {
  try {
    // Clean up existing users
    await User.deleteMany({});

    // Create default users
    const users = [
      {
        username: 'test123',
        password: 'password',
      },
      {
        username: 'JollyGuru',
        password: 'password',
      },
      {
        username: 'sample',
        password: 'password',
      },
    ];

    await User.create(users);

    console.log('Default users seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
