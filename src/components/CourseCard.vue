<template>
  <v-card>
    <v-img
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    ></v-img>
    <v-card-title>{{ course.name }}</v-card-title>
    <v-card-text>{{ course.description }}</v-card-text>
    <v-card-actions>
      <v-btn variant="outlined" class="ml-1 border bg-deep-purple-darken-1" @click="enroll(course.id)">Записаться на курс</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  methods: {
    async enroll(courseId) {
      if (this.$store.state.jwtToken) {
        try {
          const jwtToken = localStorage.getItem('jwtToken')
          await axios.post('/enroll',  {jwt_token: jwtToken, course_id: courseId})
          this.$router.push("/profil")
        } catch (error) {
          console.error('Error enrolling in course:', error)
          this.$router.push("/profil")
        }
      } else {
        this.$router.push('/login');
      }
    }
  }
}
</script>
