const authService = require('../services/authService');

class AuthController {
  async login(req, res) {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
      const result = await authService.login(username, password);

      if (!result) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong while logging in' });
    }
  }
}

module.exports = new AuthController();
