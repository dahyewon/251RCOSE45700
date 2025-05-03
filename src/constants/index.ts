export const CANVAS = {
  WIDTH: 800,
  HEIGHT: 600,
}

export const DEFAULT_SHAPE = {
  WIDTH: 200,
  HEIGHT: 100,
  FONT_SIZE: 30,
}

export const PROPERTY_NAMES = {
  COLOR: "색",
  TEXT: "텍스트",
  FONT: "폰트",
  FONT_SIZE: "글자 크기",
  WIDTH: "너비",
  HEIGHT: "높이",
  HORIZONTAL_POS: "가로 위치",
  VERTICAL_POS: "세로 위치",
  LENGTH: "길이",
  LINEWIDTH: "선 굵기",
  SHADOW_ANGLE: "그림자 각도",
  SHADOW_RADIUS: "그림자 간격",
  SHADOW_BLUR: "그림자 흐리게",
  SHADOW_COLOR: "그림자 색",
  BORDER_WIDTH: "테두리 굵기",
  BORDER_COLOR: "테두리 색",
};

export const PROPERTY_TYPES = {
  COLOR: "color",
  TEXT: "text",
  NUMBER: "number",
  DROPDOWN: "dropdown",
  READ: "read",
};

export const DROPDOWN_OPTIONS: { [key: string]: string[] } = {
  [PROPERTY_NAMES.FONT]: ["Arial", "Sans Serif"],
};