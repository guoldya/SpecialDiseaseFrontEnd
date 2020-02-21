<template>
   <div class="adressinfo">
      <md-field-item title="所在区域" arrow="arrow-right" :addon="pickerValue1" @click="openAdress"> </md-field-item>
      <md-picker ref="picker1" v-model="isPickerShow1" :default-value="pickerDefaultIndex" :data="pickerData1" :cols="3" is-cascade title="选择省市区/县" @confirm="onPickerConfirm(1)"></md-picker>
   </div>
</template>
<script>
let appshippingAddressareaList = '/api/hos/bdArea/read/list';
export default {
   data() {
      return {
         pickerData1: [],
         pickerValue1: '',
         isPickerShow1: false,
         pickerDefaultIndex: [0, 0, 0],
         tese: '',
      }
   },
   props: ['defaultValue'],
   created() {
      this.$axios.put(appshippingAddressareaList, {
      }).then(res => {
         if (res.data.code == '200') {
            this.pickerData1 = [this.areaList(res.data.rows)];
            res.data.rows.forEach((value, index) => {
               console.log(value.areaCode)
               if (value.areaCode.slice(0, 2) == String(this.defaultValue[0]).slice(0, 2)) {
                  var aa = value.label;
                  this.pickerDefaultIndex[0] = Number(value.areaCode);
                  value.children.forEach((test, index1) => {
                     if (test.areaCode == this.defaultValue[1]) {
                        var bb = test.label;
                        this.pickerDefaultIndex[1] = Number(test.areaCode);
                        test.children.forEach((data, index2) => {
                           if (data.areaCode == this.defaultValue[2]) {
                              var cc = data.label;
                              this.pickerValue1 = aa + bb + cc;
                              this.pickerDefaultIndex[2] = Number(data.areaCode);
                           }
                        })
                     }
                  })
               }
            })
         }
      }).catch(function (err) {
         console.log(err);
      });

   },

   methods: {
      openAdress() {
         this.isPickerShow1 = !this.isPickerShow1;
      },
      areaList(list) {
         let newArea = [];
         for (let i = 0; i < list.length; i++) {
            console.log(list[i],"list[i]")
            let neslist = {
               text: list[i].label,
               value: list[i].id
            }
            if (list[i].children) {
               neslist.children = this.areaList(list[i].children)
            }
            newArea.push(neslist);
         }
         //  console.log(newArea,"newArea")
         return newArea;
      },
      onPickerConfirm(index) {

         const values = this.$refs[`picker${index}`].getColumnValues()
         let res = '';
         let test = '';
         values.forEach(value => {
            value && (res += `${value.text || value.label} `)
         })
         values.forEach(value => {
            console.log(value,"我是循环的value")
            value && (test += `${value.value || value.label} `)
         })
         console.log(res, test, values, "我是一个")
         this.$emit('adressByValue', test.split(' ')[2]);
         this.$store.commit('adressnameFun', res);
         this[`pickerValue${index}`] = res;
      },

   },
}
</script>
 
