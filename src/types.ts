export interface GridConfig {
    hue: number,
    gap: number,
    size: number,
    radius: number
}

export interface JsonData {
    meta: {
        step: "hour" | "day";
        min_value?: number;
        max_value?: number;
    };
    content: Record<number, number>;
}

export function isJsonData(data: unknown): data is JsonData {
    if (typeof data !== 'object' || data === null) return false;

    const obj = data as Record<string, unknown>;

    if (!obj.meta || typeof obj.meta !== 'object') return false;
    const meta = obj.meta as Record<string, unknown>;

    if (meta.step !== 'hour' && meta.step !== 'day') return false;
    if (meta.min_value !== undefined && typeof meta.min_value !== 'number') return false;
    if (meta.max_value !== undefined && typeof meta.max_value !== 'number') return false;

    if (!obj.content || typeof obj.content !== 'object') return false;

    const content = obj.content as Record<string, unknown>;
    return Object.entries(content).every(([key, value]) => {
        const timestamp = Number(key);
        return !isNaN(timestamp) && typeof value === 'number';
    });
}
