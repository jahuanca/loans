const createUserController = require("./create_user");
const getUsersController = require("./get_users");
const updateUserController = require("./update_user");
const deleteUserController = require("./delete_user");

module.exports = {
    getUsersController,
    createUserController,
    updateUserController,
    deleteUserController,
}