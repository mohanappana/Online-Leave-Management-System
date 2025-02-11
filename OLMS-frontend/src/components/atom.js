import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "recoil-persist", // Unique key for localStorage
    storage: localStorage, // Choose localStorage or sessionStorage
  });

export const roleState =atom({
    key:"roleState",
    default: '',
    effects:[persistAtom],
})
export const userState = atom({
    key:"userState",
    default: '',
    effects:[persistAtom],
})

// export const rolesRoutes = atom({
//     key:"rolesRoutes",
//     default:{
//         "STUDENT":"/studentDashboard",
//         "TEACHER":"/teacherDashboard",
//         "HOD":"/hodDashboard",
//     },
// })