const handlerNextMenu = async (currentIndex, updateIndex, visibleItemCount, nextButton, visibleItems) => {
  const maxIndex = visibleItems.length - visibleItemCount;
  currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
  const newIndex = Math.min(currentIndex + 1, maxIndex);
  nextButton.disabled = newIndex >= maxIndex;
  await updateIndex(newIndex);
};
export { handlerNextMenu };
