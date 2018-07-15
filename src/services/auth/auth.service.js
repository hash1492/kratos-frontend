import Storage from './../storage/storage.service'

let authService = {
    setAuthToken(token) {
        Storage.set('token', token);
    },
    removeAuthToken() {
        Storage.remove('token');
    },
    isLoggedIn() {
        return !!Storage.get('token');
    },
    setCurrentUser(user) {
        Storage.set('currentUser', JSON.stringify(user));
    },
    getCurrentUser() {
        return JSON.parse(Storage.get('currentUser'));
    },
    removeCurrentUser() {
        Storage.remove('currentUser');
    }
}

export default authService;
