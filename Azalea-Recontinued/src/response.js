export const ERROR = "ERROR";
export const SUCCESS = "SUCCESS";
export const INFO = "INFO";
export const WARNING = "WARNING";
export function responseStr(format,text) {
    return `${format} ${text}`;
}