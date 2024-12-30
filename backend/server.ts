import express, { Request, Response } from "express";
const server = express();

server.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Api is running",
  });
});

server.listen(3000, () => {
  console.log("Server is running in port 3000");
});
