import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },{
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            },{
                path: "/teacheraddform",
                name: "teacheraddform",
                meta: {
                    // permission: [],
                    title: '添加教师'
                },
                component: () => import ( /* webpackChunkName: "teacheraddform" */ "../views/manager/TeacherAddForm.vue")
            },{
                path: "/teacherliststabs",
                name: "teacherliststabs",
                meta: {
                    // permission: [],
                    title: '教师列表'
                },
                component: () => import ( /* webpackChunkName: "teacherliststabs" */ "../views/manager/TeacherListsTabs.vue")
            }, {
                path: "/teachermessage",
                name: "teachermessage",
                meta: {
                    // permission: [],
                    title: '教师详情'
                },
                component: () => import ( /* webpackChunkName: "teachermessage" */ "../views/manager/TeacherMessage.vue")
            },{
                path: "/courseliststabs",
                name: "courseliststabs",
                meta: {
                    // permission: [],
                    title: '班课列表'
                },
                component: () => import ( /* webpackChunkName: "courseliststabs" */ "../views/manager/CourseListsTabs.vue")
            },{
                path: "/coursemessage",
                name: "coursemessage",
                meta: {
                    // permission: [],
                    title: '班课信息'
                },
                component: () => import ( /* webpackChunkName: "coursemessage" */ "../views/manager/CourseMessage.vue")
            },{
                path: "/classmessage_common",
                name: "classmessage_common",
                meta: {
                    // permission: [],
                    title: '正常班课'
                },
                component: () => import ( /* webpackChunkName: "classmessage_common" */ "../views/teacher/ClassMessage_common.vue")
            },{
                path: "/classmessage_common_add",
                name: "classmessage_common_add",
                meta: {
                    // permission: [],
                    title: '添加班课'
                },
                component: () => import ( /* webpackChunkName: "classmessage_common_add" */ "../views/teacher/ClassMessage_common_add.vue")
            },{
                path: "/classmessage_uncommon",
                name: "classmessage_uncommon",
                meta: {
                    // permission: [],
                    title: '归档班课'
                },
                component: () => import ( /* webpackChunkName: "classmessage_uncommon" */ "../views/teacher/ClassMessage_uncommon.vue")
            },{
                path: "/studentliststabs",
                name: "studentliststabs",
                meta: {
                    // permission: [],
                    title: '学生浏览'
                },
                component: () => import ( /* webpackChunkName: "studentliststabs" */ "../views/teacher/StudentListsTabs.vue")
            },{
                path: "/student_add",
                name: "student_add",
                meta: {
                    // permission: [],
                    title: '添加学生'
                },
                component: () => import ( /* webpackChunkName: "student_add" */ "../views/teacher/Student_add.vue")
            },{
                path: "/studentmessage",
                name: "studentmessage",
                meta: {
                    // permission: [],
                    title: '学生详情'
                },
                component: () => import ( /* webpackChunkName: "studentmessage" */ "../views/teacher/StudentMessage.vue")
            },{
                path: "/classliststabs_project",
                name: "classliststabs_project",
                meta: {
                    // permission: [],
                    title: '项目浏览'
                },
                component: () => import ( /* webpackChunkName: "classliststabs_project" */ "../views/teacher/ClassListsTabs_project.vue")
            },{
                path: "/projectmessage",
                name: "projectmessage",
                meta: {
                    // permission: [],
                    title: '项目详情'
                },
                component: () => import ( /* webpackChunkName: "projectmessage" */ "../views/teacher/ProjectMessage.vue")
            },{
                path: "/project_add",
                name: "project_add",
                meta: {
                    // permission: [],
                    title: '添加项目'
                },
                component: () => import ( /* webpackChunkName: "project_add" */ "../views/teacher/Project_add.vue")
            },{
                path: "/classliststabs_group",
                name: "classliststabs_group",
                meta: {
                    // permission: [],
                    title: '小组浏览'
                },
                component: () => import ( /* webpackChunkName: "classliststabs_group" */ "../views/teacher/ClassListsTabs_group.vue")
            },{
                path: "/groupmessage",
                name: "groupmessage",
                meta: {
                    // permission: [],
                    title: '小组详情'
                },
                component: () => import ( /* webpackChunkName: "groupmessage" */ "../views/teacher/GroupMessage.vue")
            },{
                path: "/group_add",
                name: "group_add",
                meta: {
                    // permission: [],
                    title: '添加小组'
                },
                component: () => import ( /* webpackChunkName: "group_add" */ "../views/teacher/Group_add.vue")
            },{
                path: "/classliststabs_case",
                name: "classliststabs_case",
                meta: {
                    // permission: [],
                    title: '案例浏览'
                },
                component: () => import ( /* webpackChunkName: "classliststabs_case" */ "../views/teacher/ClassListsTabs_case.vue")
            },{
                path: "/casemessage",
                name: "casemessage",
                meta: {
                    // permission: [],
                    title: '案例详情'
                },
                component: () => import ( /* webpackChunkName: "casemessage" */ "../views/teacher/CaseMessage.vue")
            },{
                path: "/resourcemessage",
                name: "resourcemessage",
                meta: {
                    // permission: [],
                    title: '资源查看'
                },
                component: () => import ( /* webpackChunkName: "resourcemessage" */ "../views/teacher/ResourceMessage.vue")
            },{
                path: "/case_add",
                name: "case_add",
                meta: {
                    // permission: [],
                    title: '添加案例'
                },
                component: () => import ( /* webpackChunkName: "case_add" */ "../views/teacher/Case_add.vue")
            },{
                path: "/taskliststabs_group",
                name: "taskliststabs_group",
                meta: {
                    // permission: [],
                    title: '小组展示-项目任务管理'
                },
                component: () => import ( /* webpackChunkName: "taskliststabs_group" */ "../views/teacher/TaskListsTabs_group.vue")
            },{
                path: "/taskliststabs_groupmember",
                name: "taskliststabs_groupmember",
                meta: {
                    // permission: [],
                    title: '小组成员-项目任务管理'
                },
                component: () => import ( /* webpackChunkName: "taskliststabs_groupmember" */ "../views/teacher/TaskListsTabs_groupMember.vue")
            },{
                path: "/taskmessage_teacher",
                name: "taskmessage_teacher",
                meta: {
                    // permission: [],
                    title: '成员任务详情'
                },
                component: () => import ( /* webpackChunkName: "taskmessage_teacher" */ "../views/teacher/taskMessage_teacher.vue")
            },{
                path: "/classliststabs_student",
                name: "classliststabs_student",
                meta: {
                    // permission: [],
                    title: '班课查看'
                },
                component: () => import ( /* webpackChunkName: "classliststabs_student" */ "../views/student/ClassListsTabs_student.vue")
            },{
                path: "/classmessage_student",
                name: "classmessage_student",
                meta: {
                    // permission: [],
                    title: '班课详情'
                },
                component: () => import ( /* webpackChunkName: "classmessage_student" */ "../views/student/ClassMessage_student.vue")
            },{
                path: "/projectmessage_student",
                name: "projectmessage_student",
                meta: {
                    // permission: [],
                    title: '项目详情'
                },
                component: () => import ( /* webpackChunkName: "case_add" */ "../views/student/ProjectMessage_student.vue")
            },{
                path: "/casemessage_student",
                name: "casemessage_student",
                meta: {
                    // permission: [],
                    title: '查看案例'
                },
                component: () => import ( /* webpackChunkName: "casemessage_student" */ "../views/student/CaseMessage_student.vue")
            },{
                path: "/caseliststabs",
                name: "caseliststabs",
                meta: {
                    // permission: [],
                    title: '案例管理'
                },
                component: () => import ( /* webpackChunkName: "caseliststabs" */ "../views/student/CaseListsTabs.vue")
            },{
                path: "/groupmessage_student",
                name: "groupmessage_student",
                meta: {
                    // permission: [],
                    title: '小组管理'
                },
                component: () => import ( /* webpackChunkName: "groupmessage_student" */ "../views/student/GroupMessage_student.vue")
            },{
                path: "/taskmessage_student",
                name: "taskmessage_student",
                meta: {
                    // permission: [],
                    title: '个人项目任务'
                },
                component: () => import ( /* webpackChunkName: "taskmessage_student" */ "../views/student/TaskMessage_student.vue")
            },{
                path: "/task_add",
                name: "task_add",
                meta: {
                    // permission: [],
                    title: '添加任务'
                },
                component: () => import ( /* webpackChunkName: "task_add" */ "../views/student/Task_add.vue")
            },{
                path: "/taskmessageothers_student",
                name: "taskmessageothers_student",
                meta: {
                    // permission: [],
                    title: '小组项目任务'
                },
                component: () => import ( /* webpackChunkName: "taskmessageothers_student" */ "../views/student/TaskMessageOthers_student.vue")
            },{
                path: "/resourcemessage_student",
                name: "resourcemessage_student",
                meta: {
                    // permission: [],
                    title: '案例资源'
                },
                component: () => import ( /* webpackChunkName: "resourcemessage_student" */ "../views/student/ResourceMessage_student.vue")
            },{
                path: "/user",
                name: "user",
                meta: {
                    // permission: [],
                    title: '个人中心'
                },
                component: () => import ( /* webpackChunkName: "user" */ "../views/User.vue")
            },{
                path: "/user_student_change",
                name: "user_student_change",
                meta: {
                    // permission: [],
                    title: '修改个人信息'
                },
                component: () => import ( /* webpackChunkName: "user_student_change" */ "../views/user_student_change.vue")
            },{
                path: "/user_teacher_change",
                name: "user_teacher_change",
                meta: {
                    // permission: [],
                    title: '修改个人信息'
                },
                component: () => import ( /* webpackChunkName: "user_teacher_change" */ "../views/user_teacher_change.vue")
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_role');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        if (role === '管理员')
            next();
        else if (role === '')next('/403');
    } else {
        next();
    }
});

export default router;