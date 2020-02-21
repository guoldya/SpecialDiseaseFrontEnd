<template>
    <div class="result">
        <Header post-title="搜索结果"></Header>
        <div class="margin55 outCarint"  v-show="!loadingtrue">
            <div class="mu-sub-header margin14">科室</div>
            <md-cell-item v-if="departData.length!=0" v-for="(item2,index2) in departData" :title="item2.orgName" arrow @click="intodoctorList(item2)" :key="'AAA'+index2" />
            <div v-if="departData.length==0" class="margin7">
                <p>暂无科室信息</p>
            </div>
            <div class="mu-sub-header  margin14">医生</div>
            <md-cell-item v-if="doctorList.length!=0" v-for="(item,index) in doctorList" @click="intodoctorinfo(item)" :key="index+'aa'" :title="item.name" :brief="item.introduce" arrow>
                <span class="holder" slot="left"><img src="@/assets/images/3.jpg"></span>
            </md-cell-item>
            <div v-if="doctorList.length==0" class="margin7">
                <p>暂无医生信息</p>
            </div>
        </div>
        <Loading v-show="loadingtrue"></Loading>
    </div>
    <!-- <div class="aui-footer" @click="lookagain">
      <span>复诊</span>
    </div> -->

</template>
<script type="text/babel">
let bdHospitalOrg = '/api/hos/bdHospitalOrg/read/searchClinicListByClinicOrDoctor';
export default {
    data() {
        return {
            hospitaldata: [],
            departData: [],
            doctorList: [],
            page: 1,
            pageSize: 10,
            loadingtrue: true,
            busy: true,
            nomore: false,
        };
    },
    created() {

    },
    watch: {

    },
    mounted() {
        this.orgFun();
    },
    methods: {


        intodoctorinfo(data) {
            if (this.$route.query.type) {
                this.$router.push({
                    name: 'doctorschedu',
                    query: { doctorId: data.id, islist: 1 }
                });
            } else {
                this.$router.push({
                    name: 'doctordetail',
                    query: { doctorId: data.id, islist: 1 }
                });
            }

        },
        intodoctorList(data) {
            let argu = { deptName: data.orgName, deptId: data.id, yuanId: data.parentId };
            if (this.searchType == "workdepart") {
                this.$router.push({
                    name: 'workdoctor',
                    query: argu
                });
                return;
            }
            if (this.$route.query.type) {
                this.$router.push({
                    name: 'workdoctor',
                    query: argu
                });
                return;
            }

            this.$router.push({
                name: 'doctorList',
                query: argu
            });
        },
        orgFun() {
            // let deptparams = {};
            // deptparams.pageNumber = this.page;
            // deptparams.pageSize = this.pageSize;
            // deptparams.keyword = this.$route.query.val;
            this.$axios.put(bdHospitalOrg,
                {
                    name: this.$route.query.val,
                    orgId: this.$store.state.feeActiveId,
                    orgType: this.$route.query.orgType ? this.$route.query.orgType : undefined,
                }).then((res) => {
                    if (res.data.code == '200') {
                        this.loadingtrue = false;
                        this.doctorList = res.data.data.doctorList;
                        this.departData = res.data.data.orgList;
                    } else {
                        this.hospitaldata = []
                    }
                }).catch(function (err) {
                    console.log(err);
                });
        },



    },


};
</script>
 <style scoped>
.result {
  background: #ffffff;
}
</style>