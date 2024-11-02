export const baseMiddleware = (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(404).json({ error: 'Request not found' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
