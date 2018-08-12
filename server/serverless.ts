import "reflect-metadata";
import "./TransactionsController";
import * as routing from "routing-controllers";

const serverless = require("serverless-http"),
    app = require("express")();

routing.useExpressServer(app);
export const handler = serverless(app)
