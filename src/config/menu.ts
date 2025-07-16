export interface MenuItem {
  path: string;
  icon: string;
  class: string;
}

export const menuItems: MenuItem[] = [
  { path: "/add", icon: "profile", class: "profile-block" },
  { path: "/settings", icon: "settings", class: "settings-block" },
  { path: "/dashboard", icon: "dashboard", class: "dashboard-block" },
  { path: "/help", icon: "help", class: "help-block" },
];

export const addMenuItems: MenuItem[] = [
  { path: "/add/food", icon: "food", class: "food-block" },
  { path: "/add/travel", icon: "travel", class: "travel-block" },
  { path: "/add/shopping", icon: "shopping", class: "shopping-block" },
  { path: "/add/entertainment", icon: "entertainment", class: "entertainment-block" },
];
