export interface BrandPartner {
  id: string;
  name: string;
  logo: string;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

import { ShoeImageItem, ShoeGroup, DEFAULT_SHOE_GROUPS } from "./shoeGroups";
export type { ShoeImageItem, ShoeGroup };
export { DEFAULT_SHOE_GROUPS };


export interface ShoeLinesConfig {
  title: string;
  groups: ShoeGroup[];
}

export interface HeroTitleLineConfig {
  text: string;
  fontSize: number;
  colorMode: "solid" | "gradient";
  color: string;
  gradient: {
    from: string;
    to: string;
    direction: "to right" | "to bottom" | "to bottom right" | "to top right";
  };
}

export interface WorkspaceImageItem {
  id: string;
  src: string;
  caption?: string;
  order: number;
}

export interface WorkspaceDepartment {
  id: string;
  name: string;
  icon: string;
  order: number;
  images: WorkspaceImageItem[];
}

export interface LandingCMSConfig {
  // 1. Hero Section
  hero: {
    titlePrefix: string;
    titleHighlight: string;
    prefixConfig?: HeroTitleLineConfig;
    highlightConfig?: HeroTitleLineConfig;
    quoteItalic: string;
    description: string;
    bgImage: string;
    handsImage: string;
    teamImage: string;
    quoteBadgeText: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };

  // 2. Workspace Gallery
  workspace: {
    headline: string;
    description: string;
    pillars: Array<{
      title: string;
      desc: string;
    }>;
  };

  // 3. Brand Excellence
  excellence: {
    title: string;
    description: string;
    image: string;
    points: Array<{
      title: string;
      desc: string;
    }>;
  };

  // 4. Products Showcase
  products: {
    title: string;
    description: string;
    items: Array<{
      name: string;
      code: string;
      image?: string;
    }>;
  };

  // 5. Brand Partners Carousel
  brandPartners: BrandPartner[];

  // 6. Featured Shoe Lines (Dòng Giày Tiêu Biểu)
  shoeLines: ShoeLinesConfig;

  // 7. Workspace Departments Gallery
  workspaceDepartments?: WorkspaceDepartment[];
}

export const DEFAULT_BRAND_PARTNERS: BrandPartner[] = [];



export const DEFAULT_SHOE_LINES_CONFIG: ShoeLinesConfig = {
  title: "DÒNG GIÀY TIÊU BIỂU",
  groups: [],
};

export const DEFAULT_WORKSPACE_DEPARTMENTS: WorkspaceDepartment[] = [];

export const DEFAULT_LANDING_CMS: LandingCMSConfig = {
  hero: {
    titlePrefix: "Skechers Miền Đông",
    titleHighlight: "TBS Group",
    prefixConfig: {
      text: "Skechers Miền Đông",
      fontSize: 36,
      colorMode: "solid",
      color: "#ffffff",
      gradient: { from: "#ffffff", to: "#2fd39a", direction: "to right" },
    },
    highlightConfig: {
      text: "TBS Group",
      fontSize: 54,
      colorMode: "gradient",
      color: "#2fd39a",
      gradient: { from: "#2fd39a", to: "#fbbf24", direction: "to right" },
    },
    quoteItalic: "",
    description: "",
    bgImage: "/images/tbs-gate.jpg",
    handsImage: "",
    teamImage: "",
    quoteBadgeText: "",
    stat1Value: "",
    stat1Label: "",
    stat2Value: "",
    stat2Label: "",
    stat3Value: "",
    stat3Label: "",
  },
  workspace: { headline: "", description: "", pillars: [] },
  workspaceDepartments: DEFAULT_WORKSPACE_DEPARTMENTS,
  excellence: { title: "", description: "", image: "", points: [] },
  products: { title: "", description: "", items: [] },
  brandPartners: DEFAULT_BRAND_PARTNERS,
  shoeLines: DEFAULT_SHOE_LINES_CONFIG,
};

export const CMS_STORAGE_KEY = "skechersmiendong_landing_cms";

export const VALID_SHOE_GROUP_TITLES = new Set([
  "WATER PROOF",
  "MEN'S SPORT",
  "MEN USA",
  "WORK SHOES",
  "PERFORMANCE",
]);

export function isGroupValid(group: any): boolean {
  if (!group || !group.title || typeof group.title !== "string") {
    return false;
  }
  const cleanTitle = group.title.trim().toUpperCase();
  if (!VALID_SHOE_GROUP_TITLES.has(cleanTitle)) {
    return false;
  }
  if (!Array.isArray(group.items) || group.items.length === 0) {
    return false;
  }
  for (const item of group.items) {
    if (!item || !item.url) return false;
    const lower = String(item.url).toLowerCase();
    if (lower.includes("kglv") || lower.includes("tbs-factory") || lower.includes("crawled")) {
      return false;
    }
  }
  return true;
}

export function parseCMSConfig(parsed: any): LandingCMSConfig {
  if (!parsed) return DEFAULT_LANDING_CMS;

  const storedProducts = parsed.products || {};
  const storedItems = storedProducts.items || [];
  const mergedItems = [...storedItems];
  for (const defItem of DEFAULT_LANDING_CMS.products.items) {
    if (!mergedItems.some((i: any) => i.code === defItem.code)) {
      mergedItems.push(defItem);
    }
  }

  const cleanedPartners = Array.isArray(parsed.brandPartners)
    ? parsed.brandPartners.filter((p: any) => p && p.id && p.name && p.logo)
    : DEFAULT_BRAND_PARTNERS;

  const existingIds = new Set(cleanedPartners.map((p: BrandPartner) => p.id));
  const mergedPartners = [...cleanedPartners];
  for (const defPartner of DEFAULT_BRAND_PARTNERS) {
    if (!existingIds.has(defPartner.id)) {
      mergedPartners.push(defPartner);
    }
  }

  const isShoeLinesValid =
    parsed.shoeLines &&
    Array.isArray(parsed.shoeLines.groups) &&
    parsed.shoeLines.groups.length > 0 &&
    parsed.shoeLines.groups.every((g: any) => isGroupValid(g));

  const rawShoeLines = isShoeLinesValid ? parsed.shoeLines : DEFAULT_SHOE_LINES_CONFIG;

  const rawWorkspaceDeps = Array.isArray(parsed.workspaceDepartments) && parsed.workspaceDepartments.length > 0
    ? parsed.workspaceDepartments
    : DEFAULT_WORKSPACE_DEPARTMENTS;

  return {
    hero: { ...DEFAULT_LANDING_CMS.hero, ...(parsed.hero || {}) },
    workspace: { ...DEFAULT_LANDING_CMS.workspace, ...(parsed.workspace || {}) },
    workspaceDepartments: rawWorkspaceDeps,
    excellence: { ...DEFAULT_LANDING_CMS.excellence, ...(parsed.excellence || {}) },
    products: {
      title: storedProducts.title || DEFAULT_LANDING_CMS.products.title,
      description: storedProducts.description || DEFAULT_LANDING_CMS.products.description,
      items: mergedItems,
    },
    brandPartners: mergedPartners,
    shoeLines: {
      title: rawShoeLines.title || DEFAULT_SHOE_LINES_CONFIG.title,
      groups: rawShoeLines.groups || [],
    },
  };
}

export function getLandingCMS(): LandingCMSConfig {
  if (typeof window === "undefined") return DEFAULT_LANDING_CMS;
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return DEFAULT_LANDING_CMS;
    const parsed = JSON.parse(raw);
    const config = parseCMSConfig(parsed);
    // If parsed had invalid or legacy groups, overwrite localStorage with sanitized config
    const isStoredValid =
      Array.isArray(parsed?.shoeLines?.groups) &&
      parsed.shoeLines.groups.length > 0 &&
      parsed.shoeLines.groups.every((g: any) => isGroupValid(g));

    if (!isStoredValid) {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(config));
    }
    return config;
  } catch (e) {
    return DEFAULT_LANDING_CMS;
  }
}

export async function fetchLandingCMSFromServer(): Promise<LandingCMSConfig> {
  if (typeof window === "undefined") return DEFAULT_LANDING_CMS;

  try {
    const res = await fetch("/api/landing-cms", {
      cache: "no-store",
      headers: { "Pragma": "no-cache" },
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data) {
        const serverConfig = parseCMSConfig(json.data);
        localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(serverConfig));
        return serverConfig;
      }
    }
  } catch (err) {
    console.warn("[CMS SERVER FETCH WARN]", err);
  }

  return getLandingCMS();
}

export async function checkAndMigrateLocalCMSToServer(): Promise<LandingCMSConfig | null> {
  if (typeof window === "undefined") return null;
  const rawLocal = localStorage.getItem(CMS_STORAGE_KEY);
  if (!rawLocal) return null;

  try {
    const localConfig = getLandingCMS();
    const isCustom = JSON.stringify(localConfig) !== JSON.stringify(DEFAULT_LANDING_CMS);
    if (!isCustom) return null;

    const res = await fetch("/api/landing-cms", { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && !json.data) {
        const saveRes = await saveLandingCMSToServer(localConfig);
        if (saveRes.success) {
          return localConfig;
        }
      }
    }
  } catch (err) {
    console.error("[CMS MIGRATION ERROR]", err);
  }
  return null;
}

export async function saveLandingCMSToServer(config: LandingCMSConfig): Promise<{ success: boolean; error?: string }> {
  if (typeof window !== "undefined") {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event("tbs_landing_cms_updated"));
  }

  try {
    const res = await fetch("/api/landing-cms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "HTTP Error " + res.status);
      return { success: false, error: `Máy chủ phản hồi lỗi (${res.status}): ${errText}` };
    }

    const data = await res.json().catch(() => ({}));
    if (data && data.success) {
      return { success: true };
    }
    return { success: false, error: data?.error || "Máy chủ không xác nhận được dữ liệu" };
  } catch (err: any) {
    return { success: false, error: err?.message || "Lỗi kết nối mạng khi gửi lên máy chủ" };
  }
}

export function saveLandingCMS(config: LandingCMSConfig) {
  saveLandingCMSToServer(config);
}
