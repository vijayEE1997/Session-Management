const corsAllow = (req, res, next) => {
  const corsWhitelist = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://aidatabases.in'
  ];
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header("Access-Control-Allow-Credentials", true);
  }

  next();
}

module.exports = corsAllow

// (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     res.header("Access-Control-Allow-Credentials", true);
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
//   }