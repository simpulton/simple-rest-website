angular.module('SimpleRESTWebsite', [])
    .constant('ENDPOINT_URI', 'http://localhost:1337/api/')
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AccessTokenInterceptor');
    })
    .controller('MainCtrl', function (LoginService, UserService, ItemsModel) {
        var main = this;

        function submit(user) {
            main.newUser ? main.register(user) : main.login(user);
        }

        function login(user) {
            LoginService.login(user)
                .then(function(response) {
                    user.access_token = response.data.id;
                    main.currentUser = user;
                    UserService.setCurrentUser(user);
                    getItems();
                }, function(error) {
                    alert("We couldn't find that username/password combination :(");
                });
        }

        function register(user) {
            LoginService.register(user)
                .then(function(response) {
                    login(user);
                });
        }

        function getItems() {
            ItemsModel.all()
                .then(function (result) {
                    main.items = result.data;
                });
        }

        function createItem(item) {
            ItemsModel.create(item)
                .then(function (result) {
                    initCreateForm();
                    getItems();
                });
        }

        function updateItem(item) {
            ItemsModel.update(item.id, item)
                .then(function (result) {
                    cancelEditing();
                    getItems();
                });
        }

        function deleteItem(itemId) {
            ItemsModel.destroy(itemId)
                .then(function (result) {
                    cancelEditing();
                    getItems();
                });
        }

        function initCreateForm() {
            main.newItem = { name: '', description: '' };
        }

        function setEditedItem(item) {
            main.editedItem = angular.copy(item);
            main.isEditing = true;
        }

        function isCurrentItem(itemId) {
            return main.editedItem !== null && main.editedItem.id === itemId;
        }

        function cancelEditing() {
            main.editedItem = null;
            main.isEditing = false;
        }

        main.newUser = false;
        main.currentUser = UserService.getCurrentUser();
        main.items = [];
        main.editedItem = null;
        main.isEditing = false;
        main.login = login;
        main.register = register;
        main.submit = submit;
        main.getItems = getItems;
        main.createItem = createItem;
        main.updateItem = updateItem;
        main.deleteItem = deleteItem;
        main.setEditedItem = setEditedItem;
        main.isCurrentItem = isCurrentItem;
        main.cancelEditing = cancelEditing;

        initCreateForm();
        getItems();
    })
    .service('ItemsModel', function ($http, ENDPOINT_URI) {
        var service = this,
            path = 'items/';

        function getUrl() {
            return ENDPOINT_URI + path;
        }

        function getUrlForId(itemId) {
            return getUrl(path) + itemId;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (itemId) {
            return $http.get(getUrlForId(itemId));
        };

        service.create = function (item) {
            return $http.post(getUrl(), item);
        };

        service.update = function (itemId, item) {
            return $http.put(getUrlForId(itemId), item);
        };

        service.destroy = function (itemId) {
            return $http.delete(getUrlForId(itemId));
        };
    })
    .service('LoginService', function($http, ENDPOINT_URI) {
        var service = this,
            path = 'Users/';

        function getUrl() {
            return ENDPOINT_URI + path;
        }

        function getLogUrl(action) {
            return getUrl() + action;
        }

        service.login = function(credentials) {
            return $http.post(getLogUrl('login'), credentials);
        };

        service.logout = function() {
            return $http.post(getLogUrl('logout'));
        };

        service.register = function(user) {
            return $http.post(getUrl(), user);
        };
    })
    .service('UserService', function() {
        var service = this,
            currentUser = null;

        service.setCurrentUser = function(user) {
            currentUser = user;
        };

        service.getCurrentUser = function() {
            return currentUser;
        };
    })
    .factory('AccessTokenInterceptor', function(UserService) {
       return {
           request: function(config) {
               var currentUser = UserService.getCurrentUser(),
                   access_token = currentUser ? currentUser.access_token : null;

               if (access_token) {
                   config.headers.authorization = access_token;
               }
               return config;
           }
       }
    });
;
