const createUserRepository = require("./create_user_repository");
const deleteUserRepository = require("./delete_user_repository");
const getUsersRepository = require("./get_users_repository");
const updateUserRepository = require("./update_user_repository");

module.exports = {
    getUsersRepository,
    createUserRepository,
    updateUserRepository,
    deleteUserRepository,
}