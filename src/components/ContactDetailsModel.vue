<template>
  <div>
    <div v-if="showModelLoader == true">
      <Loader></Loader>
    </div>
    <b-container v-if="this.contactDetails.content != '' && showModelLoader == false">
      <div class="contact-view">
        <b-card title="Contact Information" class="mb-2" aria-hidden="true">
          <b-row class="mt-3">
            <b-col md="6">
              <label class="mr-4 ml-0">Name: </label><span v-if="this.contactDetails.content.name">{{ this.contactDetails.content.name }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0" >Email: </label><span v-if="this.contactDetails.content.email">{{ this.contactDetails.content.email }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">Gender: </label><span v-if="this.contactDetails.content.gender">{{ this.contactDetails.content.gender  }}</span>
            </b-col>
            <b-col md="6">
              <!--                <label class="mr-4 ml-0">Customer Type: </label><span v-if="this.infoModal.content.contact_type">{{ this.infoModal.content.contact_type }}</span>-->
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">D.O.B: </label><span v-if="this.contactDetails.content.birth_date">{{ this.contactDetails.content.birth_date  }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0">Phone: </label><span v-if="this.contactDetails.content.phone">{{ this.contactDetails.content.phone  }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">Address: </label><span>{{ this.contactDetails.content.address  }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0">City: </label><span>{{ this.contactDetails.content.city  }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <label class="mr-4 ml-0">ZIP code: </label><span>{{ this.contactDetails.content.zip_code  }}</span>
            </b-col>
            <b-col md="6">
              <label class="mr-4 ml-0">State: </label><span>{{ this.contactDetails.content.state  }}</span>
            </b-col>
          </b-row>
          <b-row>

            <b-col md="6">
              <label class="mr-4 ml-0">Country: </label><span>{{ this.contactDetails.content.country  }}</span>
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
  name: 'ContactDetailsModel',
  components: {
    Loader
  },
  props: [ 'contactDetails', 'showModelLoader' ]
}
</script>
