const rectsIntersect = (a, b) => {
  const aBox = a.getBounds();
  const bBox = b.getBounds();

  return aBox.x + aBox.width - 16 > bBox.x
    && aBox.x < bBox.x + bBox.width - 16
    && aBox.y + aBox.height - 16 > bBox.y
    && aBox.y < bBox.y + bBox.height - 44;
};

export default rectsIntersect;
