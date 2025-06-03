export const buildCategoryMap = (categoriesData) => {
  const raw = Array.isArray(categoriesData) ? categoriesData : categoriesData?.results || [];
  const map = {};
  raw.forEach((cat) => {
    map[cat.id] = cat.name;
  });
  return map;
};

export const calculateGenreStats = (books, categoryMap) => {
  const genreMap = {};
  books.forEach((book) => {
    const categoryId = typeof book.category === "object" ? book.category?.id : book.category;
    const name = categoryMap[categoryId] || "Uncategorized";
    genreMap[name] = (genreMap[name] || 0) + 1;
  });
  return Object.entries(genreMap).map(([name, value]) => ({ name, value }));
};

export const calculateMonthlyStats = (books) => {
  const monthly = new Array(12).fill(0);
  books.forEach((book) => {
    const date = new Date(book.updated_at || book.created_at);
    if (!isNaN(date.getTime())) {
      monthly[date.getMonth()] += 1;
    }
  });
  return monthly.map((count, idx) => ({
    month: new Date(0, idx).toLocaleString("en", { month: "short" }),
    count,
  }));
};

export const calculateAverages = (books) => {
  let pageSum = 0, ratingSum = 0, ratingCount = 0, authorMap = {};

  books.forEach((book) => {
    const pages = parseInt(book.pages);
    if (!isNaN(pages) && pages > 0) pageSum += pages;

    const rating = parseFloat(book.rating);
    if (!isNaN(rating) && rating > 0) {
      ratingSum += rating;
      ratingCount++;
    }

    const author = typeof book.author === "string" ? book.author : book.author?.name || null;
    if (author) {
      authorMap[author] = (authorMap[author] || 0) + 1;
    }
  });

  const avgPages = books.length ? (pageSum / books.length).toFixed(0) : 0;
  const avgRating = ratingCount ? (ratingSum / ratingCount).toFixed(1) : 0;
  const topAuthor = Object.entries(authorMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  return { avgPages, avgRating, topAuthor };
};
