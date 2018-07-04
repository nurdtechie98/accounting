<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h1>File Pick</h1>
                <div class="row">
                    <div class="col-md-6">
                        <form action="/api/method/file_transfer" method="post" enctype="multipart/form-data">
                            <label for="image_title">File Name</label>
                            <input class="list-group-item item" type='text' ref="image_title" name="image_title"><br><br>
                            <input class="list-group-item item" type="file" ref="image" name="filetoupload" @change="display()"><br><br>
                            <input class="list-group-item item" type="submit">
                            <!--<button @click="logic()">Submit</button>-->
                        </form>
                    </div>
                    <div v-if="imgshow" class="col-md-6">
                        <img :src="preview()">
                    </div>
                </div>
            </div>
        </div>
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
            return true;
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
