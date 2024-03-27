<template>
  <v-card>
    <v-img
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    ></v-img>
    <v-card-title>{{ course.title }}</v-card-title>
    <v-card-text>{{ course.description }}</v-card-text>
    <v-card-actions>
      <v-btn variant="outlined" class="ml-1 border bg-deep-purple-darken-1" :to="`/course/${course.id}`">Записаться на курс</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true
    }
  }
}
</script>
