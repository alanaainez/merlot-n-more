import { jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    // Dispatch a custom event to notify components about the auth change
    window.dispatchEvent(new Event('auth-change'));
  }

  logout() {
    localStorage.removeItem('id_token');
    // Dispatch a custom event to notify components about the auth change
    window.dispatchEvent(new Event('auth-change'));
    window.location.assign('/');
  }
}

export default new AuthService();
