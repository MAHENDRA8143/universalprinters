const AUTH_USER_KEY = "universal_printers_auth_user";

export function getCurrentUser() {
  const raw = window.localStorage.getItem(AUTH_USER_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed?.email || !parsed?.phone) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user) {
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("auth-updated"));
}

export function clearCurrentUser() {
  window.localStorage.removeItem(AUTH_USER_KEY);
  window.dispatchEvent(new Event("auth-updated"));
}
