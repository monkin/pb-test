import * as React from "react";
import * as slassnames from "classnames";
import * as styles from "./Header.pcss";

interface BackButtonProps {
    visible: boolean;
    onClick: () => void;
}

function BackButton({ visible, onClick }: BackButtonProps) {
    return <button
        onClick={onClick}
        className={slassnames(styles.backButton, { [styles.hidden]: !visible })}
    >
        <svg
            className={styles.backButtonImage}
            style={{
                width: 24,
                height: 24
            }}
            viewBox="0 0 24 24"
        >
            <path fill="#000000" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
        </svg>
    </button>;
}

export interface HeaderProps {
    category: string | null;
    isDetailsOpen: boolean;
    onBack: () => void;
}

export function Header({ category, onBack, isDetailsOpen }: HeaderProps) {
    return <div className={styles.header}>
        <BackButton visible={isDetailsOpen} onClick={onBack}/>
        <h1 className={styles.title}>{isDetailsOpen ? `Expenses details for ${category}` : "Expenses overview"}</h1>
    </div>;
}