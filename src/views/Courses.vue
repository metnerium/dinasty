<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <v-img src="https://raw.githubusercontent.com/metnerium/school_project/2765b9dffafd14995ef75c04b55ac09e578f332d/school_app/templates/school_app/img/logopur1.svg" class="ml-2 mt-1 wid1" :width="160"></v-img>
      </v-app-bar-title>
      <v-btn variant="plain" @click="goToPage('')"> Главная </v-btn>
      <v-btn v-if="!username" variant="outlined" @click="goToPage('login')">
        Войти <v-icon icon="mdi-login-variant" end></v-icon>
      </v-btn>
      <span v-else class="username" @click="goToPage('profil')">{{ username }}</span>
    </v-app-bar>
    <v-main>
      <v-container>
        <h1>Доступные курсы</h1>
        <v-row>
          <v-col v-for="course in courses" :key="course.id" cols="12" md="4">
            <CourseCard :course="course" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CourseCard from '../components/CourseCard.vue'
import axios from "axios";

export default {
  name: 'Courses',
  created() {
    if (this.$store.state.jwtToken) {
      this.fetchProfileData();
    }
    this.fetchCourses();
  },
  components: {
    CourseCard
  },
  data() {
    return {
      username: null,
      courses: []
    }
  },
  methods: {
    goToPage(page) {
      this.$router.push(`/${page}`);
    },
    async fetchProfileData() {
      try {
        const response = await axios.get('/profile', {
          params: {
            jwt_token: this.$store.state.jwtToken,
          },
        });
        this.username = response.data.username;
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    },
    async fetchCourses() {
      try {
        const response = await axios.get('/courses');
        this.courses = response.data;
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
  }
}
</script>
