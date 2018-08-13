"use strict";

module.exports = User => {
  return (req, res) => {
    res.json(req.user);
  };
};
