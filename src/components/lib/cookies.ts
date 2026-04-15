export function setCookie(name: string, value: string){
 document.cookie = `${name}=${value}; path=/`;
}

export function getCookie(name:string){
 return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}