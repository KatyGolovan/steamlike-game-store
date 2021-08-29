export interface User {
    email: string
    password: string
    returnSecureToken?: boolean
  }
  
  export interface FbAuthResponse {
    idToken: string
    expiresIn: string
  }
 
  export interface Game {
    id: string
    bougth: boolean
    name: string
    price: string
    tags: []
  }

  export interface Friend {
    id: string
    added: boolean
    name: string
  }
  