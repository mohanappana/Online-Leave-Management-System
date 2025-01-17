import { atom } from "recoil";

export const roleState =atom({
    key:"roleState",
    default: '',
})
export const userState = atom({
    key:"userState",
    default: '',
})

// export const rolesRoutes = atom({
//     key:"rolesRoutes",
//     default:{
//         "STUDENT":"/studentDashboard",
//         "TEACHER":"/teacherDashboard",
//         "HOD":"/hodDashboard",
//     },
// })