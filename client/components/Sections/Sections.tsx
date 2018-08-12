import * as React from "react";
import * as styles from "./Sections.pcss";
import * as classnames from "classnames";

export function SectionList({ children }: { children?: React.ReactNode }) {
    return <div className={styles.sectionList}>{children}</div>;
}

interface SectionProps {
    active: boolean;
    children?: React.ReactNode;
}

export function Section({ active, children }: SectionProps) {
    return <div
        className={classnames(styles.section, { [styles.active]: active })}
    >
        {children}
    </div>;
}