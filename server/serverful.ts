import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import "./TransactionsController";

createExpressServer().listen(3000);

console.log("Server started at 'http://localhost:3000/'");