import express from 'express';
import cors from 'cors';

import {
  users,
  User,
  saveUsers
} from './users';
import { records } from './records';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// ========================================
// HEALTH CHECK
// ========================================

app.get('/api/health', (req, res) => {

  res.json({
    success: true,
    message: 'VerifyHub API is running'
  });

});


// ========================================
// LOGIN
// ========================================

app.post('/api/login', (req, res) => {

  const { userId, password, role } = req.body;

  // Do not log passwords
  console.log('Login attempt:', {
    userId,
    role
  });

  const user = users.find(
    (item) =>
      item.userId === userId &&
      item.password === password &&
      item.role === role
  );

  if (!user) {

    console.log('Login rejected');

    return res.status(401).json({
      success: false,
      message: 'Invalid User ID, password or role'
    });

  }

  console.log('Login accepted:', {
    userId: user.userId,
    role: user.role
  });

  res.json({

    success: true,

    message: 'Login successful',

    user: {
      id: user.id,
      userId: user.userId,
      name: user.name,
      role: user.role
    }

  });

});


// ========================================
// RECORDS
// ========================================

app.get('/api/records', async (req, res) => {

  const delay =
    Number(req.query.delay) || 0;

  const role =
    req.query.role as string;


  // Simulate API delay
  if (delay > 0) {

    await new Promise(resolve =>
      setTimeout(resolve, delay)
    );

  }


  // Start with all records
  let filteredRecords = records;


  // General User can only see
  // General User records
  if (role === 'General User') {

    filteredRecords =
      records.filter(
        record =>
          record.accessLevel === 'General User'
      );

  }


  // Admin can see all records


  res.json({

    success: true,

    message:
      'Records fetched successfully',

    delay,

    role,

    records: filteredRecords

  });

});


// ========================================
// ADMIN - GET USERS
// ========================================

app.get('/api/users', (req, res) => {

  const role =
    req.query.role as string;


  // Only Admin can access users
  if (role !== 'Admin') {

    return res.status(403).json({

      success: false,

      message:
        'Admin access required'

    });

  }


  // Do not return passwords
  const safeUsers = users.map(user => ({

    id: user.id,

    userId: user.userId,

    name: user.name,

    role: user.role

  }));


  res.json({

    success: true,

    users: safeUsers

  });

});


// ========================================
// ADMIN - ADD USER
// ========================================

app.post('/api/users', (req, res) => {

  const {
    role: requesterRole,
    userId,
    password,
    name,
    userRole
  } = req.body;


  // Only Admin can add users
  if (requesterRole !== 'Admin') {

    return res.status(403).json({

      success: false,

      message:
        'Admin access required'

    });

  }


  // Validate required fields
  if (
    !userId ||
    !password ||
    !name ||
    !userRole
  ) {

    return res.status(400).json({

      success: false,

      message:
        'User ID, password, name and role are required'

    });

  }


  // Check duplicate User ID
  const existingUser =
    users.find(
      user => user.userId === userId
    );


  if (existingUser) {

    return res.status(409).json({

      success: false,

      message:
        'User ID already exists'

    });

  }


  // Generate a new ID
  const newId =
    users.length > 0
      ? Math.max(
          ...users.map(user => user.id)
        ) + 1
      : 1;


  const newUser: User = {

    id: newId,

    userId,

    password,

    name,

    role: userRole

  };


 users.push(newUser);

saveUsers(users);

res.status(201).json({

    success: true,

    message: 'User created successfully',

    user: {

      id: newUser.id,

      userId: newUser.userId,

      name: newUser.name,

      role: newUser.role

    }

  });

});


// ========================================
// ADMIN - DELETE USER
// ========================================

app.delete('/api/users/:id', (req, res) => {

  const requesterRole =
    req.query.role as string;

  const userId =
    Number(req.params.id);


  // Only Admin can delete users
  if (requesterRole !== 'Admin') {

    return res.status(403).json({

      success: false,

      message:
        'Admin access required'

    });

  }


  const index =
    users.findIndex(
      user => user.id === userId
    );


  if (index === -1) {

    return res.status(404).json({

      success: false,

      message:
        'User not found'

    });

  }


  // Prevent deleting the main Admin account
  if (
    users[index].userId === 'admin01'
  ) {

    return res.status(400).json({

      success: false,

      message:
        'Main Admin account cannot be deleted'

    });

  }


 users.splice(index, 1);

saveUsers(users);

res.json({

    success: true,

    message:
      'User deleted successfully'

  });

});


// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {

  console.log(
    `VerifyHub API running at http://localhost:${PORT}`
  );

});