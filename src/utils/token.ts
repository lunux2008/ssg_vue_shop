export const SET_TOKEN = (token:string) => {
	localStorage.setItem("TOKEN", token)
}

export const GET_TOKEN = ():string => {
	return localStorage.getItem("TOKEN")
}

export const REMOVE_TOKEN = ():string => {
	return localStorage.removeItem("TOKEN")
}