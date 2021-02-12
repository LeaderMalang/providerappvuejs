<template>
  <div>
    <b-button v-b-modal.modal-1 class="btn btn-primary float-right">Add Provider Local</b-button>
    <b-modal id="modal-1" size="lg" title="Provider" :hide-footer="true">
      <form class="mt-3">
        <div>
          <b-card class="mt-2" title="Provider" aria-hidden="true">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" v-model="name" name="name" id="name" aria-describedby="emailHelp"
                         placeholder="Name">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" class="form-control" v-model="email" name="email" id="email" aria-describedby="emailHelp"
                         placeholder="Email">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone">Phone</label>
                  <input type="text" class="form-control" v-model="phone" name="phone" id="phone" aria-describedby="emailHelp"
                         placeholder="Phone">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="city">City</label>
                  <input type="text" class="form-control" v-model="city" name="city" id="city" aria-describedby="emailHelp"
                         placeholder="City">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone">State/Province</label>
                  <input type="text" class="form-control" v-model="state" name="state" id="state" aria-describedby="emailHelp"
                         placeholder="State">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="city">Country</label>
                  <input type="text" class="form-control" v-model="country" name="country" id="country" aria-describedby="emailHelp"
                         placeholder="Country">
                </div>
              </div>
            </div>

<!--            <div class="row">-->
<!--              <div class="col-md-6">-->
<!--                <div class="form-group">-->
<!--                  <label for="phone">Gender</label>-->
<!--                  <select name="gender" v-model="gender" class="form-control">-->
<!--                    <option value="1">Male</option>-->
<!--                    <option value="0">Female</option>-->
<!--                  </select>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-md-6">-->
<!--                <div class="form-group">-->
<!--                  <label for="password">Password</label>-->
<!--                  <input type="password" class="form-control" v-model="password" name="password" id="password" aria-describedby="emailHelp"-->
<!--                         placeholder="Password">-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->

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
          </b-card>
          <div class="row mt-1" v-if="this.name && this.email && this.phone && this.city && this.state && this.country">
            <div class="col-12">
              <div class="float-right">
                <!--              <button class="btn btn-primary" @click="addAppointment">Save</button>-->
                <input v-if="updateId === 0" class="btn btn-primary" @click="addProvider" type="button" value="Save">
                <input v-if="updateId !== 0" class="btn btn-primary" @click="updateProvider" type="button" value="Update">
              </div>
            </div>
          </div>
        </div>
      </form>
    </b-modal>

  </div>
</template>
<script>
// import axios from 'axios'
import axios from 'axios'

export default {
  name: 'AddAppointmentModel',
  components: {},
  data () {
    return {
      apiKey: '',
      baseUrlLive: 'https://evergenius.staging.wishpond.com/',
      name: '',
      updateId: 0,
      email: '',
      phone: '',
      city: '',
      state: '',
      password: '',
      country: '',
      gender: 1,
      success: '',
      errors: []
    }
  },
  props: [ 'showModelLoader', 'bus', 'apiKeyParent' ],
  methods: {
    addProvider (e) {
      this.apiKey = this.api_Key
      console.log(this.apiKeyParent)
      if (this.name && this.email && this.phone && this.city && this.country && this.state !== '') {
        var url = this.baseUrlLive + 'api/users/doctors'
        axios.post(url, {
          auth_key: this.apiKey,
          name: this.name,
          email: this.email,
          phone: this.phone,
          city: this.city,
          state: this.state,
          country: this.country,
          gender: null,
          password: null,
          hd_publish_status: 1,
          job_title: null
        })
          .then(response => {
            if (response.data.data) {
              this.$alert('Provider Added Successfully')
              // this.getDataList(this.currentPage, this.perPage, this.filter)
            }
            this.resetAll()
          })
          .catch(function (error) {
            if (error.response) {
              alert('Server Error')
            }
          })
        this.$emit('my-custom-event')
        this.$root.$emit('bv::hide::modal', 'modal-1')
        return true
      }

      if (!this.name) {
        this.errors.push('Name is required.')
      }
      if (!this.email) {
        this.errors.push('Email is required.')
      }
      if (!this.phone) {
        this.errors.push('Phone is required.')
      }
      if (!this.city) {
        this.errors.push('City is required')
      }
      if (!this.state) {
        this.errors.push('State is required.')
      }
      if (!this.country) {
        this.errors.push('Country is required')
      }
      e.preventDefault()
    },
    editForm (id) {
      var url = this.baseUrlLive + 'api/users/show/' + id
      axios.get(url, {
        params: {auth_key: this.apiKey}
      })
        .then(response => {
          var resss = response.data.data
          if (resss) {
            this.$root.$emit('bv::show::modal', 'modal-1')
            this.updateId = resss.id
            this.name = resss.name
            this.email = resss.email
            this.phone = resss.phone
            this.city = resss.city
            this.state = resss.state
            this.country = resss.country
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    resetAll () {
      this.updateId = 0
      this.name = ''
      this.email = ''
      this.phone = ''
      this.city = ''
      this.state = ''
      this.country = ''
    },
    updateProvider () {
      if (this.name && this.email && this.phone && this.city && this.country && this.state !== '') {
        var data = {id: this.updateId,
          name: this.name,
          email: this.email,
          phone: this.phone,
          city: this.city,
          password: null,
          state: this.state,
          country: this.country
        }
        var urlNew = this.baseUrlLive + 'api/users/show'
        axios.put(urlNew, {
          data: data,
          auth_key: this.apiKey
        })
          .then(response => {
            console.log(response)
            if (response.data.data) {
              this.$alert('Provider Update Successfully')
            }
          })
          .catch(function (error) {
            if (error.response) {
              alert('Server Error')
            }
          })
        this.resetAll()
        this.$emit('my-custom-event')
        this.$root.$emit('bv::hide::modal', 'modal-1')
        return true
      }

      if (!this.name) {
        this.errors.push('Name is required.')
      }
      if (!this.email) {
        this.errors.push('Email is required.')
      }
      if (!this.phone) {
        this.errors.push('Phone is required.')
      }
      if (!this.city) {
        this.errors.push('City is required')
      }
      if (!this.state) {
        this.errors.push('State is required.')
      }
      if (!this.country) {
        this.errors.push('Country is required')
      }
    }
  }
}
</script>
