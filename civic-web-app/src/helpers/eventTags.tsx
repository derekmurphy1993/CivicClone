export function getEventTagLink(eventTag: string): string {
  const tagImageName = eventTag.toLowerCase()
    .replace(/('|\+)/g, "")
    .replace(/&/g, "and")
    .replace(/(\s)/g, "_");
  return `/Assets/explore_images/${tagImageName}.jpg`;
}
