const rectsIntersect = (a, b) => {
  const aBox = a.getBounds();
  const bBox = b.getBounds();

  return aBox.x + aBox.width > bBox.x
    && aBox.x < bBox.x + bBox.width
    && aBox.y + aBox.height > bBox.y
    && aBox.y < bBox.y + bBox.height;
};

export default rectsIntersect;
