// web/src/lib/rbac.ts

export const MODULE_ACCESS: Record<string, string[]> = {
  // Lễ Tân chỉ được phép truy cập 3 module cơ bản (và trang con liên quan)
  LE_TAN: ["home", "my-tasks", "my_tasks", "hr"],
  RECEPTIONIST: ["home", "my-tasks", "my_tasks", "hr"],
  
  // BGK (Guest Judge)
  JUDGE_GUEST: ["home", "ci"],
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
export const getAllowedModules = (_activeUser: any, _sysUser: any = null): string[] | "ALL" => {
  // Hệ thống Skechers Miền Đông — chỉ 1 nhà máy, không chia quyền module theo vai trò nữa: mọi
  // tài khoản đăng nhập đều thấy đầy đủ sidebar như Admin/BGĐ, theo yêu cầu người dùng.
  return "ALL";
};
