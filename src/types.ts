export type CellValue = "disabled" | "future" | number;

export type CellConfig = {
  size: number;
  radius: number;
  colors: [string, string];
  interpolation_method: string;
};

export type GridParams = {
  start_ts: Date;
  end_ts: Date;
  offset_seconds: number;
  selected_entry: string | null;
};

export type GridMeta = {
  step: "hour" | "day";
  min_value?: number;
  max_value?: number;
};

export type GridContent = Record<number, number>; // unix_timestamp: value

export type GridData = {
  meta: GridMeta;
  content: Record<string, GridContent>;
};


export const isGridMeta = (obj: unknown): obj is GridMeta =>
  typeof obj === "object" && obj !== null
  && "step" in obj && (obj.step === "hour" || obj.step === "day")
  && (!("min_value" in obj) || typeof obj.min_value === "number")
  && (!("max_value" in obj) || typeof obj.max_value === "number");

export const isGridContent = (obj: unknown): obj is GridContent =>
  typeof obj === "object" && obj !== null
  && Object.entries(obj).every(([key, value]) => Number(key) >= 0 && Number(value) >= 0);

export const isGridParams = (obj: unknown): obj is GridParams =>
  typeof obj === "object" && obj !== null
  && "start_ts" in obj && typeof obj.start_ts === "number"
  && "end_ts" in obj && typeof obj.end_ts === "number"
  && "offset" in obj && typeof obj.offset === "number";

export const isGridData = (obj: unknown): obj is GridData =>
  typeof obj === "object" && obj !== null
  && "meta" in obj && isGridMeta(obj.meta)
  && "content" in obj && typeof obj.content === "object"
  && obj.content !== null && Object.entries(obj.content).every(([key, value]) => typeof key === "string" && isGridContent(value));
