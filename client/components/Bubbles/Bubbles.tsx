import * as React from "react";
import * as classnames from "classnames";
import { Bubble } from "../../state";
import * as styles from "./Bubbles.pcss";

interface BubblesItemProps {
    value: Bubble;
    currency: string | null;
    onClick: (category: string) => void;
    loading: boolean;
    open: boolean;
}

function BubblesItem({ value, currency, onClick, open }: BubblesItemProps) {
    const { x, y, radius, color, name, amount } = value;
    return <li
        onClick={() => onClick(value.name)}
        className={classnames(styles.bubble, { [styles.open]: open })} style={{
            width: radius * 2,
            height: radius * 2,
            left: x - radius,
            top: y - radius,
            backgroundColor: color
        }}
    >
        <div className={styles.category}>{name}</div>
        <div className={styles.amount}>{currency} {amount.toFixed(2)}</div>
    </li>;
}

export interface BubblesProps {
    items: Bubble[];
    currency: string | null;
    category: string | null;
    loading: boolean;
    detailsOpen: boolean;
    onClick: (category: string) => void;
}

export function Bubbles({ items, currency, onClick, category, loading, detailsOpen }: BubblesProps) {
    const height = items.reduce((r, v) => Math.max(r, v.y + v.radius), 0);
    return <ul style={{ height }} className={styles.bubbles}>
        {items.map(v => {
            return <BubblesItem
                key={v.name}
                value={v}
                currency={currency}
                onClick={onClick}
                loading={v.name === category && loading}
                open={v.name === category && detailsOpen}
            />;
        })}
    </ul>;
}
