
export const getTypeIcon = (type: string) => {
  switch (type) {
    case "academic": return "📚";
    case "news": return "📰";
    case "documentation": return "📖";
    default: return "🌐";
  }
};
