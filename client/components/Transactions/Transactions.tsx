import * as React from "react";
import { Transaction } from "../../state";
import * as styles from "./Transactions.pcss";

interface TransactionsProps {
    transactions: Map<string, Transaction[]>;
}

export function Transactions({ transactions }: TransactionsProps) {
    return <ul className={styles.dayList}>{Array.from(transactions.keys()).sort().map(day => {
        const items = transactions.get(day)!;
        return <li key={day} className={styles.day}>
            <div className={styles.date}>{day.replace(/^(\d\d\d\d)(\d\d)(\d\d)$/, "$3/$2/$1")}</div>
            {items.sort((a, b) => a.time.getTime() - b.time.getTime()).map(({ id, description, currency, amount }) => <div key={id} className={styles.transaction}>
                <span>{description}</span>
                <span>{currency} {amount.toFixed(2)}</span>
            </div>)}
        </li>;
    })}</ul>;
}