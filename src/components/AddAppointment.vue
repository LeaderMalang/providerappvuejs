<template>
<div>
  <b-button v-b-modal.modal-1 class="btn btn-primary float-right">Add Appointment Local</b-button>
  <b-modal id="modal-1" size="lg" title="Add Appointment" :hide-footer="true">
  <form class="mt-3">
    <div class="row">
      <div class="col-md-12 mb-2">
        <div>
          <v-select label="email" v-model="ContactAppointment" :options="ContactAppointmentlist"
                    @search="wishpondFetchOptions"
          @input="wishpondUser"></v-select>
<!--          <v-select label="email" v-model="ContactAppointment" :options="ContactAppointmentlist" @search="fetchOptions" ></v-select>-->
        </div>
      </div>
    </div>
    <div v-if="ContactAppointment">
      <b-card title="Contact Detail" aria-hidden="true">
        <div class="row">
          <div class="col-md-6">
            First Name: {{ContactAppointment.first_name}}
          </div>
          <div class="col-md-6">
            Last Name: {{ContactAppointment.last_name}}
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            Phone: {{ContactAppointment.mobile_number}}
          </div>
          <div class="col-md-6">
            Email: {{ContactAppointment.email}}
          </div>
        </div>
      </b-card>
      <b-card class="mt-2" title="Book Appointment" aria-hidden="true">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="reasion">Appointment Reasion</label>
              <input type="text" class="form-control" v-model="reasion" name="reasion" id="reasion" aria-describedby="emailHelp"
                     placeholder="Appointment Reasion">
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label for="schedulingmethod">Scheduling Method</label>
              <select name="schedulingmethod" id="schedulingmethod" v-model="schedulingmethod" class="form-control">
                <option value="">Select Scheduling Method</option>
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="patienttype">Patient Type</label>
              <select name="patienttype" id="patienttype" v-model="patienttype" class="form-control">
                <option value="">Select Patient Type</option>
                <option value="new">New</option>
                <option value="existing">Existing</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Provider</label>
              <v-select label="name" @input="selectedOption" v-model="companyProvider" :options="companyProviders"></v-select>
            </div>
          </div>
        </div>

        <div class="row" v-if="this.slots_available.length >= 1">
          <div class="col-md-6">
            <div class="form-group">
              <label for="appointmentslot">Appointment Slot</label>
              <select name="appointmentslot" v-model="appointmentslot" id="appointmentslot" class="form-control">
                <option v-for="item in this.slots_available" :key="item">{{ item }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row" v-if="appointmentslot != ''">
          <div class="col-md-6">
            <div class="form-group">
              <label>From Time</label>
              <div>
                <b-form-timepicker v-model="from_time" locale="en"></b-form-timepicker>
              </div>

            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>To Time</label>
              <div>
                <b-form-timepicker v-model="to_time" locale="en"></b-form-timepicker>
              </div>

            </div>
          </div>
        </div>
      </b-card>
      <div class="row">
        <div class="col-12">
          <div v-if="errors.length" class="alert alert-danger alert-dismissible fade show">
            <ul><li v-for="error in errors" :key="error" >
              <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
              {{ error }}
            </li><br></ul>
          </div>
          <div class="alert alert-success alert-dismissible fade show" v-if="success">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            {{ success }}
          </div>
        </div>
      </div>
      <div class="row mt-1" v-if="this.reasion && this.ContactAppointment && this.companyProvider && this.appointmentslot && this.companyProvider">
        <div class="col-12">
          <div class="float-right">
            <!--              <button class="btn btn-primary" @click="addAppointment">Save</button>-->
            <input class="btn btn-primary" @click="addAppointment" type="button" value="Save">
          </div>
        </div>

      </div>
    </div>
  </form>
  </b-modal>
  <!--  Update Appointment-->
  <b-modal id="modalupdate" size="lg" title="Rescheduled Appointment" :hide-footer="true">
    <form class="mt-3">
      <div v-if="updateappcontact">
        <b-card title="Contact Detail" aria-hidden="true">
          <div class="row">
            <div class="col-md-6">
              First Name: {{updateappcontact.first_name}}
            </div>
            <div class="col-md-6">
              Last Name: {{updateappcontact.last_name}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              Phone: {{updateappcontact.mobile_number}}
            </div>
            <div class="col-md-6">
              Email: {{updateappcontact.email}}
            </div>
          </div>
        </b-card>
        <b-card class="mt-2" title="Book Appointment" aria-hidden="true">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="reasion">Appointment Reasion</label>
                <input type="text" class="form-control" v-model="reasion" name="reasion" id="reasion" aria-describedby="emailHelp"
                       placeholder="Appointment Reasion">
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="schedulingmethod">Scheduling Method</label>
                <select name="schedulingmethod" id="schedulingmethod" v-model="schedulingmethod" class="form-control">
                  <option value="">Select Scheduling Method</option>
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="patienttype">Patient Type</label>
                <select name="patienttype" id="patienttype" v-model="patienttype" class="form-control">
                  <option value="">Select Patient Type</option>
                  <option value="new">New</option>
                  <option value="existing">Existing</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Provider</label>
                <v-select label="name" @input="selectedOption"
                          v-model="companyProvider"
                          :options="companyProviders"
                ></v-select>
              </div>
            </div>
          </div>

          <div class="row" v-if="this.slots_available.length >= 1">
            <div class="col-md-6">
              <div class="form-group">
                <label for="appointmentslot">Appointment Slot</label>
                <select name="appointmentslot" v-model="appointmentslot" class="form-control">
                  <option v-for="item in this.slots_available" :key="item">{{ item }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row" v-if="appointmentslot != ''">
            <div class="col-md-6">
              <div class="form-group">
                <label>From Time</label>
                <div>
                  <b-form-timepicker v-model="from_time" locale="en"></b-form-timepicker>
                </div>

              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>To Time</label>
                <div>
                  <b-form-timepicker v-model="to_time" locale="en"></b-form-timepicker>
                </div>

              </div>
            </div>
          </div>
        </b-card>
        <div class="row">
          <div class="col-12 mt-1">
            <div v-if="errors.length" class="alert alert-danger alert-dismissible fade show">
              <ul><li v-for="error in errors" :key="error" >
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                {{ error }}
              </li><br></ul>
            </div>
            <div class="alert alert-success alert-dismissible fade show" v-if="success">
              <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
              {{ success }}
            </div>
          </div>
        </div>
        <div class="row mt-1" v-if="this.reasion && this.companyProvider && this.appointmentslot && this.companyProvider">
          <input type="hidden" value="true" name="reschedule" v-model="reschedule">
          <input type="hidden" name="appointment_id" v-model="appointment_id">
          <div class="col-12">
            <div class="float-right">
              <input class="btn btn-primary" type="button" @click="rescheduleAppointment" value="Update">
            </div>
          </div>
        </div>
      </div>
    </form>
  </b-modal>
</div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'AddAppointmentModel',
  components: {},
  data () {
    return {
      wishpound_auth_key: 'a3d356dde0047ba0afaf352a1999bfdf',
      ContactAppointmentlist: [],
      success: '',
      errors: [],
      ContactAppointment: '',
      companyProviders: '',
      companyProvider: '',
      appointment_id: '',
      updateappcontact: [],
      reasion: '',
      patienttype: '',
      reschedule: false,
      slots_available: '',
      appointmentslot: '',
      to_time: '',
      from_time: '',
      schedulingmethod: '',
      apiKey: '51494738-e6c1-48e0-b4e8-18491abb4192'
    }
  },
  props: [ 'showModelLoader', 'bus' ],
  methods: {
    fetchOptions: function (search, loading) {
      axios.post('https://app.evergenius.com/api/contacts/search-contacts', {
        auth_key: this.apiKey,
        searched_text: search
      })
        .then(response => {
          this.ContactAppointmentlist = response.data.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      this.getCompanyProvider()
    },
    wishpondFetchOptions: function (search, loading) {
      // a3d356dde0047ba0afaf352a1999bfdf
      axios.get('https://jambo.staging1.wishpond.com/api/v1/leads', {
        params: {
          email: this.ContactAppointment
        },
        headers: {
          'X-Api-Token': this.wishpound_auth_key
        }
      })
        .then(response => {
          console.log(response)
          this.ContactAppointmentlist = response.data.leads
        })
        .catch(e => {
          this.errors.push(e)
        })
      // this.getCompanyProvider()
    },
    wishpondUser () {
      console.log(this.ContactAppointment)
    },
    getCompanyProvider () {
      axios.get('https://app.evergenius.com/api/appointments/company-providers', {
        params: {auth_key: this.apiKey}
      })
        .then(response => {
          this.companyProviders = response.data.data.company_providers
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    selectedOption () {
      var dateStart = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
      var today = new Date()
      var dateEnd = new Date()
      dateEnd.setDate(today.getDate() + 90)
      dateEnd = dateEnd.toJSON().slice(0, 10).replace(/-/g, '-')
      var providerId = this.companyProvider.id
      axios.get('https://app.evergenius.com/api/appointments/provider-slots', {
        params: {
          auth_key: this.apiKey,
          date_from: dateStart,
          date_to: dateEnd,
          user_id: providerId
        }
      })
        .then(response => {
          var slots = response.data.data.slots_available
          var widthRange = []
          for (var key in slots) {
            widthRange.push(key)
          }
          this.slots_available = widthRange
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    addAppointment (e) {
      // http://localhost:3000/api/contacts/add-contact-modal
      if (this.companyProvider && this.reasion && this.ContactAppointment && this.appointmentslot !== '') {
        var startIs = this.appointmentslot + ' ' + this.from_time
        var endIs = this.appointmentslot + ' ' + this.to_time
        axios.post('https://app.evergenius.com/api/appointments/add-modal-appointment', {
          auth_key: this.apiKey,
          appointment_reason: this.reasion,
          contact_id: this.ContactAppointment.id,
          contact_type: this.patienttype,
          provider_id: this.companyProvider.id,
          scheduling_method: this.schedulingmethod,
          end_time: endIs,
          start_time: startIs
        })
          .then(response => {
            if (response.data.data === 'success') {
              this.$alert('Appointment Added Successfully')
              this.ContactAppointment = ''
              // this.getAppointmentData(this.currentPage, this.perPage, this.filter)
              this.$emit('my-custom-event')
              this.$root.$emit('bv::hide::modal', 'modal-1')
            }
          })
          .catch(xhr => {
            var i
            console.log('outerfor', xhr)
            this.errors = []
            for (i = 0; i < xhr.response.data.errors.message.length; i++) {
              console.log('infor', xhr.response.data.errors.message[i].message)
              this.errors.push(xhr.response.data.errors.message[i].message)
            }
            // this.errors.push(e)
          })
        return true
      }
      this.errors = []

      if (!this.companyProvider) {
        this.errors.push('Provider is required.')
      }
      if (!this.ContactAppointment) {
        this.errors.push('Contact is required.')
      }
      if (!this.appointmentslot) {
        this.errors.push('Appointment Date is required.')
      }
      if (!this.reasion) {
        this.errors.push('Reasion is required')
      }
      e.preventDefault()
    },
    rescheduled (item) {
      this.getCompanyProvider()
      let newurl = 'https://app.evergenius.com/api/appointments/show/' + item
      axios.get(newurl, {
        params: {auth_key: this.apiKey}
      })
        .then(response => {
          this.updateappointment = response.data.data
          this.updateappcontact = response.data.data.contacts[0]
          this.reasion = this.updateappointment.appointment_reason[0].title
          this.schedulingmethod = this.updateappointment.scheduling_method
          this.patienttype = this.updateappointment.contact_type
          if (this.updateappointment.provider_user) {
            for (let i = 0; i < this.updateappointment.provider_user.length; i++) {
              this.companyProvider = this.companyProviders[i]
            }
          }
          this.selectedOption()
          let slotis = this.updateappointment.start_datetime
          let aslotis = String(slotis).split(' ')
          this.appointmentslot = aslotis[0]
          let eslotis = this.updateappointment.end_datetime
          let endslotis = String(eslotis).split(' ')
          this.from_time = aslotis[1]
          this.to_time = endslotis[1]
          this.appointment_id = this.updateappointment.id
          this.$root.$emit('bv::show::modal', 'modalupdate')
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    rescheduleAppointment (e) {
      if (this.companyProvider && this.reasion && this.updateappcontact && this.appointmentslot !== '') {
        var startIs = this.appointmentslot + ' ' + this.from_time
        var endIs = this.appointmentslot + ' ' + this.to_time
        axios.post('https://app.evergenius.com/api/appointments/add-modal-appointment', {
          auth_key: this.apiKey,
          appointment_id: this.appointment_id,
          reschedule: this.reschedule,
          appointment_reason: this.reasion,
          contact_id: this.updateappcontact.id,
          contact_type: this.patienttype,
          provider_id: this.companyProvider.id,
          scheduling_method: this.schedulingmethod,
          end_time: endIs,
          start_time: startIs
        })
          .then(response => {
            if (response.data.data === 'success') {
              this.$alert('Appointment Rescheduled Successfully')
              // this.getAppointmentData(this.currentPage, this.perPage, this.filter)
              this.$emit('my-custom-event')
              this.$root.$emit('bv::hide::modal', 'modalupdate')
            }
          })
          .catch(xhr => {
            var i
            console.log('outerfor', xhr)
            this.errors = []
            for (i = 0; i < xhr.response.data.errors.message.length; i++) {
              this.errors.push(xhr.response.data.errors.message[i].message)
            }
          })
      }
      this.errors = []

      if (!this.companyProvider) {
        this.errors.push('Provider is required.')
      }
      if (!this.updateappcontact) {
        this.errors.push('Contact is required.')
      }
      if (!this.appointmentslot) {
        this.errors.push('Appointment Date is required.')
      }
      if (!this.reasion) {
        this.errors.push('Reasion is required')
      }
      e.preventDefault()
    }
  }
}
</script>
