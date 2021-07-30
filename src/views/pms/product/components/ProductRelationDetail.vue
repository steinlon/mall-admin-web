<template>
  <div style="margin-top: 50px">
    <el-form :model="value"
             ref="productRelationForm"
             label-width="120px"
             style="width: 680px"
             size="small">
      <el-form-item label="关联专题：">
        <el-transfer
          style="display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入专题名称"
          v-model="selectSubject"
          :titles="subjectTitles"
          :data="subjectList">
        </el-transfer>
      </el-form-item>
      <el-form-item label="关联优选：">
        <el-transfer
          style="display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入优选名称"
          v-model="selectPreferenceArea"
          :titles="preferenceAreaTitles"
          :data="preferenceAreaList">
        </el-transfer>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写商品属性</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchListAll as fetchSubjectList} from '@/api/subject'
  import {fetchList as fetchPreferenceAreaList} from '@/api/preferenceArea'

  export default {
    name: "ProductRelationDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        //所有专题列表
        subjectList: [],
        //专题左右标题
        subjectTitles: ['待选择', '已选择'],
        //所有专题列表
        preferenceAreaList: [],
        //专题左右标题
        preferenceAreaTitles: ['待选择', '已选择']
      };
    },
    created() {
      this.getSubjectList();
      this.getPreferenceAreaList();
    },
    computed:{
      //选中的专题
      selectSubject:{
        get:function () {
          let subjects =[];
          if(this.value.subjectProductRelationList==null||this.value.subjectProductRelationList.length<=0){
            return subjects;
          }
          for(let i=0;i<this.value.subjectProductRelationList.length;i++){
            subjects.push(this.value.subjectProductRelationList[i].subjectId);
          }
          return subjects;
        },
        set:function (newValue) {
          this.value.subjectProductRelationList=[];
          for(let i=0;i<newValue.length;i++){
            this.value.subjectProductRelationList.push({subjectId:newValue[i]});
          }
        }
      },
      //选中的优选
      selectPreferenceArea:{
        get:function () {
          let preferenceAreas =[];
          if(this.value.preferenceAreaProductRelationList==null||this.value.preferenceAreaProductRelationList.length<=0){
            return preferenceAreas;
          }
          for(let i=0;i<this.value.preferenceAreaProductRelationList.length;i++){
            preferenceAreas.push(this.value.preferenceAreaProductRelationList[i].preferenceAreaId);
          }
          return preferenceAreas;
        },
        set:function (newValue) {
          this.value.preferenceAreaProductRelationList=[];
          for(let i=0;i<newValue.length;i++){
            this.value.preferenceAreaProductRelationList.push({preferenceAreaId:newValue[i]});
          }
        }
      }
    },
    methods: {
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      getSubjectList() {
        fetchSubjectList().then(response => {
          let list = response.data;
          for (let i = 0; i < list.length; i++) {
            this.subjectList.push({
              label: list[i].title,
              key: list[i].id
            });
          }
        });
      },
      getPreferenceAreaList() {
        fetchPreferenceAreaList().then(response=>{
          let list = response.data;
          for (let i = 0; i < list.length; i++) {
            this.preferenceAreaList.push({
              label: list[i].name,
              key: list[i].id
            });
          }
        });
      },
      handlePrev(){
        this.$emit('prevStep')
      },
      handleFinishCommit(){
        this.$emit('finishCommit',this.isEdit);
      }
    }
  }
</script>

<style scoped>

</style>
