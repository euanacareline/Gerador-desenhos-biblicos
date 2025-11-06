// A simple cache to avoid calling the IP API on every component render.
// This will be cleared on page reload, which is fine.
let cachedIdentifier: string | null = null;

/**
 * Fetches the user's IP address to use as a unique identifier.
 * Caches the result in a session variable to minimize API calls.
 * @returns A promise that resolves to the user's IP address string or a fallback.
 */
export const getUserIdentifier = async (): Promise<string> => {
    if (cachedIdentifier) {
        return cachedIdentifier;
    }
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
            throw new Error(`Failed to fetch IP: ${response.statusText}`);
        }
        const data = await response.json();
        cachedIdentifier = data.ip;
        return data.ip;
    } catch (error) {
        console.error("Could not fetch IP, using fallback identifier:", error);
        // Fallback for ad-blockers or network issues
        const fallback = 'session_' + Date.now().toString(36);
        cachedIdentifier = fallback;
        return fallback;
    }
};

const getUsageCountKey = (id: string) => `bbSceneGenCount_${id}`;
const getUnlockedKey = (id: string) => `bbSceneGenUnlocked_${id}`;

export const getUsageCount = (identifier: string): number => {
    return parseInt(localStorage.getItem(getUsageCountKey(identifier)) || '0');
};

export const isUnlocked = (identifier: string): boolean => {
    return localStorage.getItem(getUnlockedKey(identifier)) === 'true';
};

export const incrementUsageCount = (identifier: string) => {
    if (isUnlocked(identifier)) return;
    const currentCount = getUsageCount(identifier);
    localStorage.setItem(getUsageCountKey(identifier), (currentCount + 1).toString());
};

export const unlockApp = (identifier: string) => {
    localStorage.setItem(getUnlockedKey(identifier), 'true');
};
