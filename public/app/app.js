angular.module('SimpleRESTWebsite', ['lbServices'])
    .controller('MainCtrl', function (Item) {
        var main = this;

        function getItems() {
            Item.find(
                function (result) {
                    main.items = result;
                });
        }

        function createItem(item) {
            Item.create(item,
                function (result) {
                    initCreateForm();
                    getItems();
                });
        }

        function updateItem(item) {
            Item.upsert(item,
                function (result) {
                    cancelEditing();
                    getItems();
                });
        }

        function deleteItem(itemId) {
            Item.deleteById({id: itemId},
                function (result) {
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

        main.items = [];
        main.editedItem = null;
        main.isEditing = false;
        main.getItems = getItems;
        main.createItem = createItem;
        main.updateItem = updateItem;
        main.deleteItem = deleteItem;
        main.setEditedItem = setEditedItem;
        main.isCurrentItem = isCurrentItem;
        main.cancelEditing = cancelEditing;

        initCreateForm();
        getItems();
    });
