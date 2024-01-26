
// local
export function setLocalStorage(params) {
    localStorage.setItem(params.key, JSON.stringify(params.obj));
}

export function getLocalStorage(params) {
    if (localStorage.getItem(params.key) !== null) {
        localStorage.getItem(params.key, JSON.stringify(params.obj));
    }
}

// session
export function setSessionStorage(params) {
    sessionStorage.setItem(params.key, JSON.stringify(params.obj));
}

export function getSessionStorage(params) {
    if (sessionStorage.getItem(params.key) !== null) {
        sessionStorage.getItem(params.key, JSON.stringify(params.obj));
    }
}

// cookie
const setCookieMethod = (key, value, expires) => {
    let toDay = new Date();
    toDay.setDate(toDay.getDate() + expires); // 3일간 열리지 않음
    document.cookie = `${key}=${value}; path=/; expires=${toDay.toUTCString()};`;
}