<template>
    <div class="frappe-list-form row no-gutters">
        <div class="col-4 border-right">
            <frappe-list :doctype="doctype" :filters="filters" :key="doctype" />
        </div>
        <div class="col-8">
            <frappe-form v-if="name" :key="doctype + name" :doctype="doctype" :name="name" />
            <div v-if="imgsec()">
                <h1>testing</h1>
                <img v-if="onload" :src="source()">
            </div>
        </div>
    </div>
</template>
<script>
import List from './List/List';
import Form from './Form/Form';

export default {
    data(){
        return{
            onload:true,
            src:'#'
        }
    },
    props: ['doctype', 'name', 'filters'],
    components: {
        FrappeList: List,
        FrappeForm: Form
    },
    async imgsrc(){
        if(this.doctype=="FileContent" && this.name!=undefined)
        {
            this.onload=false;
            let file = await frappe.getDoc('FileContent', this.name);
            this.src="../../images/"+file.path;
            this.onload=true;
        }
    },
    methods: {
        imgsec(){
            if(this.doctype=="FileContent" && this.name!=undefined )
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        source(){
            return this.src;
        }
    }
}
</script>
<style>
.frappe-list-form {
    min-height: calc(100vh - 4rem);
}
</style>
