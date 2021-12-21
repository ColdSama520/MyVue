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
                path: "/case_add",
                name: "case_add",
                meta: {
                    // permission: [],
                    title: '添加案例'
                },
                component: () => import ( /* webpackChunkName: "case_add" */ "../views/teacher/Case_add.vue")
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
                path: "/1234",
                name: "",
                meta: {
                    // permission: [],
                    title: '项目详情'
                },
                component: () => import ( /* webpackChunkName: "case_add" */ "../views/teacher/Case_add.vue")
            },{
                path: "/table",
                name: "basetable",
                meta: {
                    // permission: [],
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import ( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import ( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/Editor.vue')
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
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;