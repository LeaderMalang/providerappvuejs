<template>
  <div>
    <div v-if="showModelLoader == true">
      <Loader></Loader>
    </div>
    <b-container v-if="this.infoModal.content != '' && showModelLoader == false">
      <div class="contact-view">
        <b-card title="Contact Information" class="mb-2" aria-hidden="true">
          <b-row class="mt-3">
            <b-col md="6">
              <label class="mr-4 ml-0">Name: </label><span v-if="this.infoModal.content.contacts">{{ this.infoModal.content.contacts[0].fullname }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0" >Email: </label><span v-if="this.infoModal.content.contacts">{{ this.infoModal.content.contacts[0].email }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">Gender: </label><span v-if="this.infoModal.content.contacts">{{ this.infoModal.content.contacts[0].gender  }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0">Customer Type: </label><span v-if="this.infoModal.content.contact_type">{{ this.infoModal.content.contact_type }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">D.O.B: </label><span v-if="this.infoModal.content.contacts">{{ this.infoModal.content.contacts[0].birth_date  }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0">Phone: </label><span v-if="this.infoModal.content.contacts">{{ this.infoModal.content.contacts[0].mobile_number  }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">Referred By: </label><span>{{ this.infoModal.content.contacts[0].referred_by  }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">Address: </label><span>{{ this.infoModal.content.contacts[0].address  }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0">Address 2: </label><span>{{ this.infoModal.content.contacts[0].address2  }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">City: </label><span>{{ this.infoModal.content.contacts[0].city  }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0">State: </label><span>{{ this.infoModal.content.contacts[0].state  }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">ZIP code: </label><span>{{ this.infoModal.content.contacts[0].zip_code  }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0">Country: </label><span>{{ this.infoModal.content.contacts[0].country  }}</span>
            </b-col>
          </b-row>
        </b-card>
        <b-card title="Appointment Detail" aria-hidden="true">
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">Appointment From: </label><span>{{ this.infoModal.content.start_datetime  }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0">Appointment To: </label><span>{{ this.infoModal.content.end_datetime  }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">Duration: </label><span>{{ this.infoModal.content.end_datetime  }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0">Reason: </label><span v-if="this.infoModal.content.appointment_reason">{{ this.infoModal.content.appointment_reason[0].title  }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">Patient Type: </label><span>{{ this.infoModal.content.contact_type  }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0">Requested Date: </label><span>{{ this.infoModal.content.created_at  }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">Scheduling Method: </label><span>{{ this.infoModal.content.scheduling_method  }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="1">
              <label class="mr-4 ml-0">status: </label><span>{{ this.infoModal.appointment_status  }}</span>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </b-container>
  </div>
</template>
<script>
import Loader from './Loader.vue'

export default {
  name: 'AppointmentModel',
  components: {
    Loader
  },
  props: [ 'infoModal', 'showModelLoader' ]
}
</script>
