export var BackendConstants = {
    url: 'http://localhost:8080',
    login: '/login',
    register: '/register',
    play: "/play",
    getBalance: "/getBalance",
    getLatestResults: "/getLatestGamesResults",
    getAllUsers: "/getListOfAllUsers",
    setUserBan: "/setUserBan",
    getLatestGamesResultsByUser: "/getadditionalXLatestGamesResultsByUser",
    getLatestTransactionsByUser: "/getadditionalXLatestTransactionsByUser",


    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 12,
    MIN_PASSWORD_LENGTH: 8,
    MAX_PASSWORD_LENGTH: 64,
    USERNAME_REGEX: "^[a-z0-9_]+$",
    EMAIL_REGEX: "^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$",
};