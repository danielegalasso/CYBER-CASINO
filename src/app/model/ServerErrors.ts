var ErrorsMap = new Map<string, string>([
    ["INVALID_ARGUMENTS", "Error communicating with the server, please try again later"],
    ["USER_NOT_FOUND", "Your session is invalid. Please login again"],
    ["USER_ALREADY_EXISTS", "An user with this username or email already exists"],
    ["USER_BALANCE_INSUFFICIENT", "Your balance is insufficient to play this game with the selected bet"],
    ["DAILY_SPIN_ALREADY_USED", "You have already used your daily spin today, come back tomorrow!"],
]);

export function getErrorMessage(errorCode: string): string {
    if (ErrorsMap.has(errorCode)) {
        return ErrorsMap.get(errorCode);
    }
    else {
        return "Unknown server error! Please try again later";
    }
}