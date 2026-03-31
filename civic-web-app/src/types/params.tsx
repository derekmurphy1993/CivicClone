export enum SearchParamKey {
  DATES = "dates",
  TAGS = "tags",
  TYPES = "types",
  SEARCH = "search",
  VIRTUAL = "virtualOnly",
}

export interface SearchParams {
  [paramLabel: string]: string;
}
