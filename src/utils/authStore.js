import {create} from 'zustand'
import {persist} from 'zustand/middleware'

const useAuthStore = create( persist( 
    (set) => ({
        currentUser: null,
        setcurrentUser: (newUser) => set({currentUser: newUser}) ,
        updatecurrentUser: () => set( updateUser => ({currentUser: updateUser}) ),
        removecurrentUser: () => set( () => ({currentUser: null}) ),
    })
)
)

export default useAuthStore ;