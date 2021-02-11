<template>
  <div>
    <div v-if="showModelLoader == true">
      <Loader></Loader>
    </div>
    <b-container v-if="showModelLoader == false">
      <div class="contact-view">
        <b-card v-if="this.firstArray != ''" class="mb-2" aria-hidden="true">
          <b-row>
          <b-col md="6" v-for="(item, key) in firstArray.dataitems" :key="key">
            <label class="mr-4 ml-0">{{ key }}: </label><span>{{ item }}</span>
          </b-col>
          </b-row>
        </b-card>
<!--        <b-card v-if="this.secondArray != ''" class="mb-2" aria-hidden="true">-->
<!--          <b-row>-->
<!--          <b-col md="6" v-for="(item, key) in secondArray.dataitems" :key="key">-->
<!--            <label class="mr-4 ml-0">{{ key }}: </label><span>{{ item }}</span>-->
<!--          </b-col>-->
<!--          </b-row>-->
<!--        </b-card>-->
      </div>
    </b-container>
  </div>
</template>
<script>
import Loader from './Loader.vue'

export default {
  name: 'ArrayModel',
  components: {
    Loader
  },
  props: [ 'firstArray', 'secondArray', 'showModelLoader', 'firstTitle' ]
}
</script>
