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
      if (tokenObj && tokenObj.accessToken) {
         localStorage.setItem('accessToken', tokenObj.accessToken);
      }
   }
   function _getAccessToken() {
      const token = localStorage.getItem('accessToken');
      return token
   }
   
   function _clearToken() {
      localStorage.removeItem('accessToken');
     
   }
   function _tokenDecode() {
      if (localStorage.getItem("accessToken")) {
         return jwt_decode(localStorage.getItem("accessToken"))
      }
      else {
         return false
      }
   }
  
   return {
      getService: _getService,
      setToken: _setToken,
      getAccessToken: _getAccessToken,
      clearToken: _clearToken,
      getTokenDecode: _tokenDecode,
   }
})();
export default localStorageService;
