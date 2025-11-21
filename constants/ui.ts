// 공통 UI 상수

export const BUTTON_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  OUTLINE: "outline",
  DANGER: "danger",
  GHOST: "ghost",
} as const;

export const BUTTON_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export const CARD_PADDING = {
  NONE: "none",
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export const BADGE_VARIANTS = {
  DEFAULT: "default",
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
  INFO: "info",
} as const;

// 공통 스타일 클래스
export const COMMON_STYLES = {
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  pageContainer: "min-h-screen bg-gray-50 py-8",
  sectionTitle: "text-3xl font-bold text-gray-900",
  card: "bg-white rounded-xl shadow-md border border-gray-100",
  cardHover: "hover:shadow-lg transition-shadow",
  buttonPrimary: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700",
  buttonSecondary: "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700",
  input: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",
} as const;

