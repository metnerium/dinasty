<template>
  <v-card>
    <v-card-title>{{ course.title }}</v-card-title>
    <v-card-text>{{ course.description }}</v-card-text>
    <v-card-actions>
      <v-btn color="primary" :to="`/course/${course.id}`">Перейти к курсу</v-btn>
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
