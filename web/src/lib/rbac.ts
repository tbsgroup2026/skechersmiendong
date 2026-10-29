// web/src/lib/rbac.ts

export const MODULE_ACCESS: Record<string, string[]> = {
  // Lễ Tân chỉ được phép truy cập 3 module cơ bản (và trang con liên quan)
  LE_TAN: ["home", "my-tasks", "my_tasks", "hr"],
  RECEPTIONIST: ["home", "my-tasks", "my_tasks", "hr"],
  
  // BGK (Guest Judge)
  JUDGE_GUEST: ["home", "ci"],

  // Trưởng/Thành viên Ban CI (Lê Khải & tương đương, vd 201711002): màn hình gọn,
  // tập trung CI/Kaizen + công việc + nhà máy. Ẩn 1-5-2, GEMBA, QC, R&D, Logistics.
  CI_LEAD: ["home", "overview", "my-tasks", "my_tasks", "tasks", "projects", "ci", "hr", "production", "production-output"],
};

/**
 * Hàm chuẩn hóa role từ user object
 */
export const getNormalizedRoles = (activeUser: any, sysUser: any = null): string[] => {
  if (!activeUser && !sysUser) return ["GUEST"];
  
  const roles = new Set<string>();
  
  const addRole = (r?: string) => {
    if (r) roles.add(r.trim().toUpperCase());
  };

  addRole(activeUser?.roleCode);
  addRole(activeUser?.role_code);
  addRole(sysUser?.roleCode);

  if (Array.isArray(activeUser?.roles)) {
    activeUser.roles.forEach(addRole);
  }
  if (Array.isArray(sysUser?.roles)) {
    sysUser.roles.forEach(addRole);
  }

  // Fallback for receptionist based on title/dept if roleCode is missing
  const title = (activeUser?.title || sysUser?.title || "").toUpperCase();
  const dept = (activeUser?.department || sysUser?.department || "").toUpperCase();
  if (title.includes("LỄ TÂN") || dept.includes("LỄ TÂN")) {
    roles.add("LE_TAN");
  }

  return Array.from(roles);
};

/**
 * Trả về danh sách các module ID được phép dựa trên cấu hình tập trung.
 * Nếu trả về mảng rỗng hoặc chứa "ALL", nghĩa là được full quyền (Admin/Exec).
 */

export const getAllowedModules = (activeUser: any, sysUser: any = null): string[] | "ALL" => {
  // 0. Nếu người dùng được cấu hình riêng danh sách màn hình (Custom Screen Display Permissions)
  const customModules = activeUser?.allowedModules || activeUser?.allowed_modules || sysUser?.allowedModules || sysUser?.allowed_modules;
  if (customModules) {
    let parsed: string[] = [];
    if (Array.isArray(customModules)) {
      parsed = customModules;
    } else if (typeof customModules === "string") {
      try {
        const json = JSON.parse(customModules);
        if (Array.isArray(json)) parsed = json;
      } catch {
        parsed = customModules.split(",").map((s: string) => s.trim()).filter(Boolean);
      }
    }
    if (parsed.length > 0) {
      if (parsed.includes("ALL") || parsed.includes("*")) return "ALL";
      const set = new Set(parsed);
      if (set.has("my-tasks")) set.add("my_tasks");
      if (set.has("my_tasks")) set.add("my-tasks");
      set.add("home");
      return Array.from(set);
    }
  }

  // Hệ thống Skechers Miền Đông — chỉ 1 nhà máy: ai không có cấu hình màn hình riêng thì thấy đầy đủ sidebar như Admin/BGĐ.
  return "ALL";
};
