<template>
    <div class="table">
        <div class="user_header">
            <el-button type="primary" @click="handleAddUser('add')">+新增用户</el-button>
            <el-form :model="formInline" label-width="120px" inline>
                <el-form-item>
                    <el-input v-model='formInline.keyword' placeholder="请输入" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleSearch">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="userList" border style="width: 100%" height="530px">
            <el-table-column v-for="item in tableList" :prop="item.prop" :label="item.label"
                :width="item.prop == 'addr' ? 380 : 180" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm cancel-button-text="否" confirm-button-text="是" title="是否删除用户?"
                        @confirm="confirmEvent(scope.row)">
                        <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="config.total" @current-change='changePage' />
    </div>

    <el-dialog v-model="dialogVisible" :title="showTitle == 'add' ? '新增用户' : '编辑用户'" width="40%"
        :before-close="handleClose">
        <el-form inline ref="userForm" :model="formUser">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name" :rules="[
                        { required: true, message: '姓名为必填项' }
                    ]">
                        <el-input v-model='formUser.name' placeholder="请输入姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别" prop="sex" :rules="[
                        { required: true, message: '姓名为必填项' }
                    ]">
                        <el-select v-model="formUser.sex" placeholder="请选择性别">
                            <el-option label="男" value="1" />
                            <el-option label="女" value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="年龄" prop="age" :rules="[
                        { required: true, message: '年龄为必填项' },
                        { type: 'number', message: '年龄必须为数字' }
                    ]">
                        <el-input v-model.number='formUser.age' placeholder="请输入年龄" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="生日" prop="birth" :rules="[
                        { required: true, message: '姓名为必填项' }
                    ]">
                        <el-date-picker v-model="formUser.birth" type="date" label="选择出生日期" placeholder="选择出生日期"
                            style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="地址" prop="addr" :rules="[
                { required: true, message: '姓名为必填项' }
            ]">
                <el-input v-model='formUser.addr' placeholder="请选择住址" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="submitUserInfo">提交</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup name="User">
import { getCurrentInstance, onMounted, ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserListData, deleteUserById, updateUserInfo, searchInfo, addUser } from '../../api/api'

// 实例
const { proxy } = getCurrentInstance()
const showTitle = ref('')

// 在列表中遍历的用户数据
const userList = ref([])

const config = reactive({
    page: 1,
    limit: 10,
    total: 0
})

// 获取用户数据
const getUserData = async (config) => {
    let result = await getUserListData(config)
    console.log(result);
    userList.value = result.data.list.map(item => {
        item.sex = item.sex == 0 ? item.sex = '女' : item.sex = '男'
        return item
    })
    config.total = result.data.total
}
// 点击不同的页码
const changePage = (page) => {
    config.page = page
    getUserData(config)
}
onMounted(() => {
    getUserData(config)
})



const tableList = [
    {
        prop: 'name',
        label: '姓名'
    },
    {
        prop: 'sex',
        label: '性别'
    },
    {
        prop: 'age',
        label: '年龄'
    },
    {
        prop: 'birth',
        label: '生日'
    },
    {
        prop: 'addr',
        label: '住址'
    }
]


// 新增用户------------------------------------------
const formUser = reactive({
    name: '',
    sex: '',
    age: '',
    birth: '',
    addr: ''
})

// 格式化日期
const formateDate = (Time) => {
    let time = new Date(Time)
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDate()
    function add(m) {
        return m < 10 ? '0' + m : m
    }
    return `${year}-${add(month)}-${add(day)}`
}

const dialogVisible = ref(false)


const handleClose = (done) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            dialogVisible.value = false
            proxy.$refs.userForm.resetFields()
            done()
        })
        .catch(() => {
            // catch error
        })
}


// 用户信息提交
const submitUserInfo = async () => {
    proxy.$refs.userForm.validate(async (valid) => {
        if(valid) {
            if (showTitle.value == 'add') {
                formUser.birth = formateDate(formUser.birth)
                let result = await addUser(formUser)
                if(result.data.status == 0) {
                    getUserData(config)
                    dialogVisible.value = false
                    ElMessage({
                        type: 'success',
                        message: result.data.message
                    })
                }
            } else {
                console.log('edit');
                formUser.birth = formateDate(formUser.birth)
                formUser.sex = formUser.sex == '男' ? 1 : 0
                let result = await updateUserInfo(formUser)
                if (result.data.status == 0) {
                    getUserData(config)
                    dialogVisible.value = false
                    ElMessage({
                        type: 'success',
                        message: result.data.message
                    })
                }
            } 
        }
    })
}


// 搜索的字符串
const formInline = reactive({
    keyword: ''
})

// 搜索功能
const handleSearch = async () => {
    let result = await searchInfo(formInline)
    config.total = result.data.total
    userList.value = result.data.list.map(item => {
        item.sex = item.sex == 0 ? item.sex = '女' : item.sex = '男'
        return item
    })
}

// 取消
const handleCancel = () => {
    dialogVisible.value = false
    proxy.$refs.userForm.resetFields()
}

// 点击新增用户按钮
const handleAddUser = () => {
    showTitle.value = 'add'
    dialogVisible.value = true
}

// 编辑用户信息
const handleEdit = (value) => {
    showTitle.value = 'edit'
    dialogVisible.value = true
    proxy.$nextTick(() => {
        Object.assign(formUser, value)
    })
}

// 删除用户
const confirmEvent = async (value) => {
    let result = await deleteUserById(value.id)
    if (result.data.status == 0) {
        getUserData(config)
        ElMessage({
            type: 'success',
            message: result.data.message
        })
    }
}

</script>

<style lang="scss" scoped>
.table {
    padding: 10px;
    position: relative;

    .user_header {
        display: flex;
        justify-content: space-between;
    }

    .el-pagination {
        position: absolute;
        left: 50%;
        bottom: -40px;
        transform: translateX(-50%);
    }
}
</style>