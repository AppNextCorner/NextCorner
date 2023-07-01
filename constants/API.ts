// Configuring API Url to use when developing

export let API = ""

switch(process.env.NODE_ENV){
    case "production":
        API = ""
    case "development":
        API = "https://nextcornerdevelopment.onrender.com"
    case "local":
        API = `http://${process.env.IP}:4020`
}