var ErrorsMap = new Map<string, string>([
    ["INVALID_ARGUMENTS", "Error communicating with the server, please try again later"],
    ["USER_NOT_FOUND", "Your session is invalid. Please login again"],
    ["USER_ALREADY_EXISTS", "An user with this username or email already exists"],
    ["USER_BALANCE_INSUFFICIENT", "Your balance is insufficient to play this game with the selected bet"],
    ["DAILY_SPIN_ALREADY_USED", "You have already used your daily spin today, come back tomorrow!"],
    ["USER_BANNED", "Your account has been banned! If you think this is a mistake, please contact support"],
    ["USER_NOT_ADMIN", "You are not an admin!"],
    ["CANNOT_BAN_ADMIN", "You cannot ban an administator!"],
]);

export function getErrorMessage(errorCode: string): string {
    if (ErrorsMap.has(errorCode)) {
        return ErrorsMap.get(errorCode);
    }
    else {
        return "Unknown server error! Please try again later";
    }
}