import { JsonController, Header, Get, Param } from "routing-controllers";
import { transactions } from "./data";

@JsonController()
export class TransactionsController {
    @Get("/overview")
    @Header("Access-Control-Allow-Origin", "*")
    getAll() {
        const sums = transactions.reduce((r, { category, amount }) => {
            r.set(category, (r.get(category) || 0) + parseFloat(amount));
            return r;
        }, new Map<string, number>());
        return Array.from(sums.entries())
            .map(([name, amount]) => ({ name, amount }))
            .sort((a, b) => b.amount - a.amount);
    }

    @Get("/currency")
    @Header("Access-Control-Allow-Origin", "*")
    getCurrency() {
        return transactions[0].currency;
    }

    @Get("/transactions/:category")
    @Header("Access-Control-Allow-Origin", "*")
    getTransactions(@Param("category") category: string) {
        return transactions.filter(t => t.category === category);
    }
}