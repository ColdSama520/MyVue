<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "系统首页",
            },
            {
                icon: "el-icon-lx-people",
                index: "manager",
                title: "管理员",
                subs: [
                    {
                        title: "教师管理",
                        subs: [
                            {
                                index: "/teacherliststabs",
                                title: "查看教师信息",
                            },
                            {
                                index: "/teacheraddform",
                                title: "添加教师",
                            }
                        ]
                    },
                    {
                        title: "课程查看",
                        subs: [
                            {
                                index: "/courseliststabs",
                                title: "查看课程",
                            }
                        ]
                    }
                ]
            },
            {
                icon: "el-icon-lx-peoplefill",
                index: "teacher",
                title: "教师",
                subs: [
                    {
                        title: "班课管理",
                        subs: [
                          {
                            title: "正常班课",
                            index: "/classmessage_common",
                          },
                          {
                            title: "归档班课",
                            index: "/classmessage_uncommon",
                          },
                          {
                            title: "学生浏览",
                            index: "/studentliststabs",
                          },
                        ]
                    },
                    {
                        title: "项目管理",
                        subs: [
                          {
                            title: "项目浏览",
                            index: "/classliststabs_project",
                          },
                          {
                            title: "小组浏览",
                            index: "/classliststabs_group",
                          },
                          {
                            title: "项目任务",
                            index: "/taskliststabs_group",
                          }
                        ]
                    },
                    {
                      title: "案例管理",
                      subs: [
                        {
                          title: "案例浏览",
                          index: "/classliststabs_case",
                        }
                      ]
                    }
                ]
            },
            {
              icon: "el-icon-lx-peoplefill",
              index: "student",
              title: "学生",
              subs: [
                {
                  title: "班课查看",
                  index: "/classliststabs_student",
                },
                {
                  title: "项目任务管理",
                  subs: [
                    {
                      title: "小组管理",
                      index: "/groupmessage_student",
                    },
                    {
                      title: "个人项目任务",
                      index: "/taskmessage_student",
                    },
                    {
                      title: "小组项目任务",
                      index: "/taskmessageothers_student",
                    }
                  ]
                },
                {
                  title: "案例管理",
                  index: "/caseliststabs",
                }
              ]
            },
        ];

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
