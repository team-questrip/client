export interface PlaceCategoriesData {
  groupList: CategoryGroup[];
}

export interface CategoryGroup {
  groupName: string;
  enumName: string;
  categories: Category[];
  placeCounts: number;
}

export interface Category {
  category: string;
  enumName: string;
}
