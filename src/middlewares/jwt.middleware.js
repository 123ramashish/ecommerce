// import jwt from 'jsonwebtoken';

// const jwtAuth = (req,res,next)=>{

//     const token = req.header['authorization'];
// console.log(`token:${token}`);
//     if(!token){
//         res.status(401).send("UnAuthorized");
//     }
//     try{
//    const payload = jwt.verify(token, 'ePzGhWu2wY');
//    console.log(payload);
//     }catch(err){
//         console.log(err);
//       res.status(401).send("UnAuthorized token");

//     }
//     next();
// }

// export default jwtAuth;


import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  // Check if the token has the Bearer format
  if (!token.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized: Invalid token format");
  }

  const tokenValue = token.split(" ")[1]; // Extract the token value

  try {
   const payload = jwt.verify(tokenValue, "ePzGhWu2wY");
   req.userId = payload.userId;
    next(); 
  } catch (err) {
    return res.status(401).send("Unauthorized: Invalid token");
  }
};

export default jwtAuth;
