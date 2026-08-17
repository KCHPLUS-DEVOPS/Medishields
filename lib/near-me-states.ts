import {
  Anchor,
  Building2,
  Dices,
  Landmark,
  Mountain,
  Palmtree,
  Ship,
  Star,
  Waves,
  type LucideIcon,
} from "lucide-react";

export interface NearMeState {
  Icon: LucideIcon;
  tag: string;
  title: string;
  slug: string;
  description: string;
}

export const nearMeStates: NearMeState[] = [
  {
    Icon: Palmtree,
    tag: "West Coast",
    title: "California",
    slug: "california",
    description: "Full-service billing support across every major CA metro market.",
  },
  {
    Icon: Waves,
    tag: "Southeast",
    title: "Florida",
    slug: "florida",
    description: "Coastal and inland practices, covered coast to coast.",
  },
  {
    Icon: Building2,
    tag: "Midwest",
    title: "Illinois",
    slug: "illinois",
    description: "Chicago-area and statewide practices, billed with precision.",
  },
  {
    Icon: Mountain,
    tag: "Appalachia",
    title: "West Virginia",
    slug: "west-virginia",
    description: "Rural and regional practices supported end to end.",
  },
  {
    Icon: Star,
    tag: "South Central",
    title: "Texas",
    slug: "texas",
    description: "From Austin to Houston, high-volume billing handled at scale.",
  },
  {
    Icon: Landmark,
    tag: "Northeast",
    title: "New York",
    slug: "new-york",
    description: "Metro and upstate practices, backed by one revenue team.",
  },
  {
    Icon: Anchor,
    tag: "Northeast",
    title: "New Jersey",
    slug: "new-jersey",
    description: "Dense provider networks billed accurately, every time.",
  },
  {
    Icon: Dices,
    tag: "Southwest",
    title: "Nevada",
    slug: "nevada",
    description: "Las Vegas and statewide practices, fully supported.",
  },
  {
    Icon: Ship,
    tag: "South",
    title: "Mississippi",
    slug: "mississippi",
    description: "River-region practices with dedicated billing coverage.",
  },
  {
    Icon: Anchor,
    tag: "New England",
    title: "Massachusetts",
    slug: "massachusetts",
    description: "Boston-area and statewide practices, billed with care.",
  },
];
