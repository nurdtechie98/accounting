<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h1>Point of Sale</h1>
                <div class="row">
                    <div class="col-md-6">
                        <h6>Customer</h6>
                        <frappe-control
                            :docfield="customerDocfield"
                            :value="value"
                            @change="value => updateValue(this.customerDocfield.fieldname, value)"
                            :onlyInput="true"
                        />
                        <br>
                        <br>
                        <transaction :items="lineItems" :edit="toggleEdit" :remove="removeItem" ></transaction>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>Subtotal:</td>
                                    <td>{{ this.subTotal }}</td>
                                </tr>
                                <tr>
                                    <td>Tax:</td>
                                    <td>{{ this.taxAmount }}</td>
                                </tr>
                                <tr>
                                    <td>Total:</td>
                                    <td>{{ this.totalAmount }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="list-group">
                          <button class="list-group-item item" @click="createInvoice()">
                              <strong>Create Invoice</strong>
                          </button>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Item Select</h6>
                                <frappe-control
                                    :docfield="itemDocfield"
                                    :value="palue"
                                    @change="palue => updateValue(docfield.fieldname, palue)"
                                    :onlyInput="true"
                                />
                            </div>
                        </div>
                        <br>
                        <item-list :items="items" :add="onItemClick"></item-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Transaction from "./Transaction";
import ItemList from "./ItemList";
import frappe from "frappejs";
import FrappeControl from './controls/FrappeControl';

export default {
  components: {
    Transaction,
    ItemList
  },
  data() {
    this.customerDocfield={
      fieldname: "customer",
      label: "Customer",
      fieldtype: "Link",
      target: "Party"
    };
    this.itemDocfield={
      fieldname: "name",
      label: "Item Name",
      fieldtype: "Link",
      target: "Item"
    };
    return {
      items: [],
      lineItems: []
    };
  },
  async created(){ 
  this.items=await frappe.db.getAll({
          doctype: "Item",
          fields: ["name", "rate"],
        });
      this.subTotal=0;
      this.taxAmount=0;
      this.totalAmount=0;
  /*this.items=it.filter(function(el) {
      return el.name.toLowerCase().indexOf(this.itemfilter.toLowerCase()) > -1;
      })*/
  },
  methods: {
    onItemClick: function(item) {
      console.log("in", item);
      var found = false;

      for (var i = 0; i < this.lineItems.length; i++) {
        if (this.lineItems[i].item === item) {
          this.lineItems[i].numberOfItems++;
          this.updateInvoice();
          found = true;
          break;
        }
      }
  
      if (!found) {
        this.lineItems.push({ item: item, numberOfItems: 1, editing: false });
        this.updateInvoice();
      }
      
    },
    toggleEdit: function(lineItem) {
      lineItem.editing = !lineItem.editing;
    },
    removeItem: function(lineItem) {
      for (var i = 0; i < this.lineItems.length; i++) {
        if (this.lineItems[i] === lineItem) {
          this.lineItems.splice(i, 1);
          break;
        }
      }
      this.updateInvoice();
    },
    updateValue(field, value) {
                  this.value = value;
                },
    async tempInvoice(){
      var temp_item=[];
      for(var i=0;i<this.lineItems.length;i++)
      {
        console.log(this.lineItems[i].item.name+" "+this.lineItems[i].numberOfItems);
        var temp={
          item:this.lineItems[i].item.name,
          quantity:this.lineItems[i].numberOfItems
        };
        temp_item.push(temp);
      }
      let tempdoc = await frappe.newDoc({
        doctype: 'Invoice', 
        name: 'something',
        customer:'Test Customer',
        items:temp_item
        });
      await tempdoc.applyChange()
      this.grandTotal=tempdoc.grandTotal;
      this.netTotal=tempdoc.netTotal;
    },
    updateInvoice(){
      this.tempInvoice().then(this.updateVal());
    },
    updateVal(){
      this.subTotal=this.netTotal;
      this.taxAmount=this.grandTotal-this.netTotal;
      this.totalAmount=this.grandTotal;
      console.log(this.grandTotal+" "+this.netTotal);
    },
    async createInvoice(){
      var final_item=[];
      for(var i=0;i<this.lineItems.length;i++)
      {
        console.log(this.lineItems[i].item.name+" "+this.lineItems[i].numberOfItems);
        var temp={
          item:this.lineItems[i].item.name,
          quantity:this.lineItems[i].numberOfItems
        };
        final_item.push(temp);
      }
      frappe.insert({
            doctype:'Invoice',
            customer: this.value,
            items:final_item
        });
      alert("Invoice added");
    }
  }
};
</script>
<style>
</style>
