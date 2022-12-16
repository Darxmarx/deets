// this file controls usage of tokens, relating to a user's logged in status
import decode from 'jwt-decode';

// one class that contains all function related to authorization with jwt
class AuthService {
    // retrieves user profile
    getProfile() {
        return decode(this.getToken());
    }

    // if there is a non-expired token saved, user is logged in
    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true : false;
    }

    // function that checks if token is expired
    isTokenExpired(token) {
        // decode token to check the expiration time set by the server
        const decoded = decode(token);

        // if expiration time is less than current time, calculated in seconds, token is expired
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('id_token');
            return true;
        }

        // otherwise return false, declaring token still valid
        return false;
    }

    // gets token saved in local storage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // upon logging in, set the token saved in local storage to the new token, and send user back to the home page
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    // upon logging out, remove the token from local storage and reload the page with logged out credentials
    logout() {
        localStorage.removeItem('id_token');
        window.location.reload();
    }
}

// export the authservice for use elsewhere
export default new AuthService();
