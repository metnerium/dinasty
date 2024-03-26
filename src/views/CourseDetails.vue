<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Онлайн Школа</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/courses">Курсы</v-btn>
      <v-btn text to="/login">Вход</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <h1>{{ course.title }}</h1>
        <p>{{ course.description }}</p>
        <h2>Уроки</h2>
        <v-list>
          <v-list-item v-for="lesson in course.lessons" :key="lesson.id" :to="`/lesson/${lesson.id}`">
            <v-list-item-content>
              <v-list-item-title>{{ lesson.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'CourseDetails',
  data() {
    return {
      course: {
        id: 1,
        title: 'Курс по JavaScript',
        description: 'Изучите JavaScript с нуля',
        lessons: [
          { id: 1, title: 'Введение в JavaScript' },
          { id: 2, title: 'Типы данных и операторы' },
          { id: 3, title: 'Управляющие конструкции' },
          { id: 4, title: 'Функции' },
          { id: 5, title: 'Объекты и массивы' }
        ]
      }
    }
  }
}
</script>
