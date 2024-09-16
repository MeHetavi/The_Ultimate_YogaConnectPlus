const storeToken = (value) => {
    if (value) {
        const { access, refresh } = value
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
    }
}

const getToken = () => {
    let access_token = localStorage.getItem('access_token')
    let refresh_token = localStorage.getItem('refresh_token')
    return { access_token, refresh_token }
}

const removeToken = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}



// Configuration
const API_BASE_URL = 'http://localhost:8000';  // Adjust this to match your backend URL

// Helper function to construct the full avatar path
const getFullAvatarPath = (avatarPath) => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith('http')) {
        return avatarPath;
    }
    // Remove any leading slash from avatarPath
    const cleanPath = avatarPath.replace(/^\//, '');
    return `${API_BASE_URL}/${cleanPath}`;
};

export { storeToken, getToken, removeToken, getFullAvatarPath }