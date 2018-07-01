<template>
    <div>
        <!--<form action="/api/method/file_transfer" method="post" enctype="multipart/form-data">-->
            <input type='text' ref="image_title" name="image_title"><br><br>
            <input type="file" ref="image" name="filetoupload" @change="display()"><br><br>
            <img v-if="imgshow" :src="preview()">
            <!--<input type="submit" @click="logger()">-->
            <button @click="logic()">Submit</button>
        <!--</form>-->
    </div>
</template>
<script>
import frappe from "frappejs";
export default{
    data(){
        return {
            imgshow : false,
        }
    },
    methods: {
        async logic(){
            console.log(this.$refs.image_title.value);
            console.log(this.$refs.image.files[0].name);
            let file = await frappe.newDoc({
                doctype: 'FileContent', 
                name:this.$refs.image_title.value,
                path:this.$refs.image.files[0].name
            });
            await file.insert();
        },
        display(){
            this.imgshow=true;
        },
        preview(){
                return URL.createObjectURL(this.$refs.image.files[0]);
        }
    }
}
</script>