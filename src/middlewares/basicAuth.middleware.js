import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .send("Unauthorized: Authorization header is missing");
  }

  const base64Credentials = authHeader.replace("Basic ", ""); 
  const decodeCreds = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const creds = decodeCreds.split(":");
  if (!creds) {
    return res.status(400).send("Bad Request: Invalid credentials format");
  }

  const [email, password] = creds;

  const user = UserModel.getAll().find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).send("Unauthorized: Incorrect credentials");
  }

  // Attach user object to request for further processing if needed
  req.user = user;

  next();
};

export default basicAuthorizer;
