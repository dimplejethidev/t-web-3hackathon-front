export const MAX_LV = 10;
export const STAGES = [
  { name: "初級", colspan: Math.ceil((MAX_LV - 1) * 0.1) },
  { name: "中級", colspan: Math.ceil((MAX_LV - 1) * 0.3) },
  { name: "上級", colspan: Math.floor((MAX_LV - 1) * 0.6) },
  { name: "神級", colspan: 1 },
];
export const NOT_FOUND_VALUE = -1;
export const REQUIRED_EXP_K = 100;
