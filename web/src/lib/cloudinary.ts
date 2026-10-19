/**
 * Cloudinary Utility Module - Miền Đông Skechers - TBS Group
 * Handles site-isolated folders, unique public_id generation, and cache-busting versioning.
 */

// Miền Đông: không dùng tài khoản Cloudinary của Văn phòng Chuỗi; tệp lưu R2 riêng qua /api/files/upload
export const CLOUDINARY_CLOUD_NAME = "";
export const CLOUDINARY_PRESET = "";

export interface CloudinaryUploadOptions {
  category?: string;
  fileType?: "image" | "video" | "auto";
  folder?: string;
}

/**
 * Automatically determine the isolated Cloudinary folder & prefix for skechersmiendong
 */
export function getSiteFolder(): { folder: string; prefix: string } {
  return { folder: "skechersmiendong", prefix: "sk" };
}

/**
 * Generate a 100% unique public_id with site prefix to prevent Cloudinary CDN & browser overwrite caching
 */
export function generateUniquePublicId(category: string = "img", fileName: string = "file", sitePrefix?: string): string {
  const { prefix } = sitePrefix ? { prefix: sitePrefix } : getSiteFolder();
  const timeTag = Date.now();
  const randTag = Math.random().toString(36).substring(2, 7);
  const cleanName = fileName
    .replace(/[^a-zA-Z0-9]/g, "_")
    .toLowerCase()
    .slice(0, 20);
  return `${prefix}_${category}_${timeTag}_${randTag}_${cleanName}`;
}

/**
 * Helper to append cache-busting version query string (?v=<timestamp>) to image URLs
 */
export function formatCloudinaryUrl(url: string | undefined | null, versionTag?: string | number): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("data:") || trimmed.startsWith("blob:") || trimmed.startsWith("/")) {
    return trimmed;
  }

  const tag = versionTag ? String(versionTag) : String(Date.now());
  if (trimmed.includes("?v=") || trimmed.includes("&v=") || trimmed.includes("?t=") || trimmed.includes("&t=")) {
    return trimmed;
  }

  const separator = trimmed.includes("?") ? "&" : "?";
  return `${trimmed}${separator}v=${tag}`;
}

/**
 * Generate a Cloudinary URL resized for thumbnails (width: 480, height: 320, crop: fill, auto format & quality)
 */
export function getCloudinaryThumbnail(url: string | undefined | null, width: number = 480): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed.includes("res.cloudinary.com")) return trimmed;
  // Insert transformation parameters before the version or folder name
  // Example original: https://res.cloudinary.com/dwl2xtbqa/image/upload/v12345/sk_img...
  // Example result:   https://res.cloudinary.com/dwl2xtbqa/image/upload/c_fill,w_480,h_320,f_auto,q_auto/v12345/sk_img...
  return trimmed.replace("/upload/", `/upload/c_fill,w_${width},h_${Math.round(width * 2/3)},f_auto,q_auto/`);
}

import { compressImage } from "./imageCompressor";

/**
 * Upload a file directly to Cloudinary with unique public_id and folder isolation for SKECHERS
 */
export async function uploadCloudinaryFile(
  file: File | string,
  options: CloudinaryUploadOptions = {}
): Promise<{ secure_url: string; public_id: string; folder: string }> {
  const { category = "general" } = options;

  // Data URL / blob URL → Blob để gửi lên máy chủ
  let uploadPayload: File | Blob = typeof file === "string" ? await (await fetch(file)).blob() : file;

  // Nén ảnh lớn ngay trên trình duyệt trước khi tải
  if (uploadPayload.type && uploadPayload.type.startsWith("image/") && !uploadPayload.type.includes("gif")) {
    try {
      const asFile = uploadPayload instanceof File ? uploadPayload : new File([uploadPayload], "image.jpg", { type: uploadPayload.type });
      const compressed = await compressImage(asFile, { maxWidth: 1600, maxHeight: 1600, quality: 0.8 });
      uploadPayload = compressed.file;
    } catch (err) {
      console.warn("Client compression fallback, uploading original:", err);
    }
  }

  const formData = new FormData();
  formData.append("file", uploadPayload, uploadPayload instanceof File ? uploadPayload.name : "upload");
  formData.append("fileType", category);
  const token = typeof window !== "undefined" ? localStorage.getItem("tbs_token") || sessionStorage.getItem("tbs_token") || "" : "";
  const res = await fetch("/api/files/upload", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success || !data.data?.url) {
    throw new Error(data?.message || "Không thể tải tệp lên!");
  }
  return { secure_url: data.data.url, public_id: data.data.r2Key, folder: "r2" };
}
