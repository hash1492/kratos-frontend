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
    }
}

export default authService;
