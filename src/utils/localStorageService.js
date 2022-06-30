import jwt_decode from 'jwt-decode'
const localStorageService = (function () {
   var _service;
   function _getService() {
      if (!_service) {
         _service = this;
         return _service
      }
      return _service
   }
   function _setToken(tokenObj) {
      if (tokenObj && tokenObj.accessToken && tokenObj.refreshToken) {
         localStorage.setItem('accessToken', tokenObj.accessToken);
         localStorage.setItem('refreshToken', tokenObj.refreshToken);
      }
   }
   function _getAccessToken() {
      const token = localStorage.getItem('accessToken');
      return token
   }
   function _getRefreshToken() {
      return localStorage.getItem('refreshToken');
   }
   function _clearToken() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
   }
   function _tokenDecode() {
      if (localStorage.getItem("accessToken")) {
         return jwt_decode(localStorage.getItem("accessToken"))
      }
      else {
         return false
      }
   }
   function _refreshTokenDecode() {
      if (localStorage.getItem("refreshToken")) {
         return jwt_decode(localStorage.getItem("refreshToken"))
      }
      else {
         return false
      }
   }
   return {
      getService: _getService,
      setToken: _setToken,
      getAccessToken: _getAccessToken,
      getRefreshToken: _getRefreshToken,
      clearToken: _clearToken,
      getTokenDecode: _tokenDecode,
      getRefreshTokenDecode: _refreshTokenDecode
   }
})();
export default localStorageService;
