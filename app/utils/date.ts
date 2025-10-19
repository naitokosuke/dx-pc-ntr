export const formatDate = (dateStr: string, locale: string, options?: Intl.DateTimeFormatOptions) => {
  const date = new Date(dateStr);
  const localeCode = locale === "ja" ? "ja-JP" : "en-US";
  const defaultOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString(localeCode, options ?? defaultOptions);
};

export const formatRelativeDate = (dateStr: string, t: (key: string, params?: Record<string, number>) => string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return t("dashboard.date.daysAgo", { days: Math.abs(diffDays) });
  if (diffDays === 0) return t("dashboard.date.today");
  if (diffDays === 1) return t("dashboard.date.tomorrow");
  return t("dashboard.date.daysLater", { days: diffDays });
};
