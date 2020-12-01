<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-toolbar-title>
        Inicio
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          @click="navigateToHome"
          text
      >
        <span class="mr-2">Back Home</span>
      </v-btn>
    </v-app-bar>
    <h1>{{ guardian.username }}</h1>
    <v-container>
      <v-card>
        <v-toolbar flat color="white">
          <v-toolbar-title>My Urgencies</v-toolbar-title>
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
            :items="urgencies"
            item-key="name"
            class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn @click="edit(item)">Edit</v-btn>
            <v-btn @click="deleteItem(item)">Delete</v-btn>
          </template>
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">asd</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model.number="addUrgency.id" label="Id"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="addUrgency.title" label="Title"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="addUrgency.summary" label="Summary"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="addUrgency.latitude" label="Latitude"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="addUrgency.longitude" label="Longitude"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="addUrgency.reportAt" label="ReportAt"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import GuardianService from "@/services/guardian-service";
import UrgencyService from "@/services/urgency-service"

export default {
  name: 'Urgencies',
  data(){
    return{
      dialog: false,
      guardian: [],
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Title', value: 'title' },
        { text: 'Summary', value: 'summary' },
        { text: 'Latitude', value: 'latitude' },
        { text: 'Longitude', value: 'longitude' },
        { text: 'ReportAt', value: 'reportAt' },
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      urgencies: [],
      addUrgency: {
          id: 0,
          title: '',
          summary: '',
          latitude: '',
          longitude: '',
          reportAt: '',
          guardianId: 0
        }
    }
  },
  methods: {
    retrieveUrgenciesByGuardianId(){
      UrgencyService.getByGuardianId(this.$route.params.id).then(response => {
        this.urgencies = response.data;
        console.log(this.urgencies);
      }).catch(e => {console.log(e);})
    },

    getDisplayUrgency(urgency) {
      return {
        id: urgency.id,
        title: urgency.title,
        summary: urgency.summary,
        latitude: urgency.latitude,
        longitude: urgency.longitude,
        reportAt: urgency.reportAt,
        guardianId: parseInt(this.$route.params.id)
      };
    },

    retrieveGuardian(){
      GuardianService.getById(this.$route.params.id).then(response => {
        this.guardian = response.data;
        console.log(this.guardian);
      }).catch(e => { console.log(e);})
    },

    close() {
      this.dialog = false
    },

    save(){
      this.addUrgency.guardianId = parseInt(this.$route.params.id);
      UrgencyService.postUrgency(this.addUrgency).then(response => {
        let item = response.data;
        console.log(item);
        this.addUrgency.push(this.getDisplayUrgency(item));
      }).catch(e => {console.log(e);});
      this.close();
    },

    navigateToHome(){
      this.$router.push({name: 'Home'})
    },

    edit(item){
      console.log(item);
    },

    deleteItem(item){
      console.log(item);
    },

    create(item){
      console.log(item);
    }
  },
  mounted() {
    this.retrieveGuardian();
    this.retrieveUrgenciesByGuardianId();
  }
}
</script>
