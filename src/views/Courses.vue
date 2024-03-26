<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Онлайн Школа</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Главная</v-btn>
      <v-btn text to="/login">Вход</v-btn>
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

export default {
  name: 'Courses',
  components: {
    CourseCard
  },
  data() {
    return {
      courses: [
        { id: 1, title: 'Курс по JavaScript', description: 'Изучите JavaScript с нуля' },
        { id: 2, title: 'Курс по Python', description: 'Освойте Python для анализа данных' },
        { id: 3, title: 'Курс по React', description: 'Создавайте современные веб-приложения с React' }
      ]
    }
  }
}
</script>
