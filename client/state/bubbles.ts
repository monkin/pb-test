import { Category } from "./categories";

export interface Bubble {
    name: string;
    amount: number;
    radius: number;
    color: string;
    x: number;
    y: number;
}

// Material design '500' colors
const colors: string[] = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"];

// indent from screen edge
const margin = 16;

function clamp(bubbles: Bubble[], screenWidth: number) {
    let minY = Number.POSITIVE_INFINITY,
        minX = Number.POSITIVE_INFINITY,
        maxX = Number.NEGATIVE_INFINITY;
    for (const { x, y, radius } of bubbles) {
        minY = Math.min(minY, y - radius);
        minX = Math.min(minX, x - radius);
        maxX = Math.max(maxX, x + radius);
    }
    const centerX = (minX + maxX) / 2,
        clampMinX = centerX - screenWidth / 2 + margin,
        clampMaxX = centerX + screenWidth / 2 - margin;
    return bubbles.map(({ x, y, radius, ...rest }): Bubble => {
        return {
            ...rest,
            radius,
            x: Math.min(clampMaxX - radius, Math.max(clampMinX + radius, x)) - centerX + screenWidth / 2,
            y: y - minY + margin
        };
    });
}

export function initialDistribution(categories: Category[], screenWidth: number): Bubble[] {
    if (categories.length) {
        const maxAmount = categories.reduce((r, v) => Math.max(r, v.amount), 0),
            maxRadius = Math.max(screenWidth / 8, 75),
            radiusPerAmount = maxRadius / maxAmount;
        return clamp(categories.map(({ name, amount }, i): Bubble => {
            const radius = radiusPerAmount * amount,
                angle = i / (categories.length - 1) * 2 * Math.PI,
                position = i ? vec(Math.sin(angle), Math.cos(angle)).mul(maxRadius * 2) : vec(0, 0);
            return {
                name, amount, radius,
                color: colors[i % colors.length],
                x: position.x,
                y: position.y,
            };
        }), screenWidth);
    } else {
        return [];
    }
}

class Vec {
    constructor(public readonly x: number, public readonly y: number) {}
    add({ x, y }: Vec) {
        return vec(this.x + x, this.y + y);
    }
    sub({ x, y }: Vec) {
        return vec(this.x - x, this.y - y);
    }
    mul(v: number) {
        return vec(this.x * v, this.y * v);
    }
    abs() {
        const { x, y } = this;
        return Math.sqrt(x * x + y * y);
    }
    distance(v: Vec) {
        return this.sub(v).abs();
    }
    normalize() {
        return this.mul(1 / this.abs());
    }
    neg() {
        return vec(-this.x, -this.y);
    }
}

function vec(x: number, y: number) {
    return new Vec(x, y)
}

export function improoveDistribution(bubbles: Bubble[], screenWidth: number): Bubble[] {
    return clamp(bubbles.map(bubble => {
        const p1 = vec(bubble.x, bubble.y),
            targetSum = bubbles.map(({ x, y, radius, name  }) => {
                if (name !== bubble.name) {
                    const p2 = vec(x, y),
                        pushWeight = ((radius + bubble.radius + margin) / p1.distance(p2)) ** 8,
                        gravityWeight = radius / bubble.radius ** 3;
                    return {
                        point: p1.sub(p2).normalize().mul(bubble.radius + radius + margin).add(p2),
                        weight: gravityWeight + pushWeight
                    };
                } else {
                    return {
                        point: vec(0, 0),
                        weight: 0
                    };
                }
            }).reduce(({ point, scale }, p) => {
                return {
                    point: point.add(p.point.mul(p.weight)),
                    scale: scale + p.weight
                };
            }, { point: vec(0, 0), scale: 0 }),
            target = targetSum.point.mul(1 / targetSum.scale),
            { x, y } = target.add(p1).mul(0.5);
        return { ...bubble, x, y };
    }), screenWidth);
}
