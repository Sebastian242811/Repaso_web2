<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-toolbar-title v-if="isSelect === false">
        Inicio
      </v-toolbar-title>
      <v-toolbar-title v-else>
        {{ changeName.username }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          @click="navigateToHome"
          text
      >
        <span class="mr-2">Home</span>
      </v-btn>
      <v-btn
          v-if="isSelect === true"
          @click="navigateToUrgencies"
          text
      >
        <span class="mr-2">Urgencies</span>
      </v-btn>
    </v-app-bar>
    <v-container>
      <v-card>
        <v-toolbar flat color="white">
          <v-toolbar-title>My Guardians</v-toolbar-title>
          <v-divider
              class="mx-2"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
          </v-dialog>
        </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="guardians"
            item-key="name"
            class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn @click="selectItem(item)">Set Current</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import GuardianService from "@/services/guardian-service";

export default {
  name: "home",
  data() {
    return{
      isSelect: false,
      dialog: false,
      guardians: [
        {
          id: 0,
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          gender: '',
          address: ''
        }
      ],
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'FirstName', value: 'firstName' },
        { text: 'LastName', value: 'lastName' },
        { text: 'Gender', value: 'gender' },
        { text: 'Address', value: 'address' },
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      changeName: []
    }
  },
  methods: {
    retrieveGuardians(){
      GuardianService.getAll().then(response => {
        this.guardians = response.data;
        console.log(this.guardians);
      }).catch(e => {
        console.log(e);
      });
    },
    selectItem(item){
      this.isSelect = true;
      this.changeName = item;
      console.log(item.id);
    },
    navigateToHome(){
      this.$router.push({name: 'Home'});
    },
    navigateToUrgencies(){
      this.$router.push({name: 'Urgencies', params: {id: this.changeName.id}});
    }
  },
  mounted() {
    this.retrieveGuardians();
    //console.log("Termino");
  }
}
</script>

<style scoped>

</style>
