<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Онлайн Школа</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text :to="`/course/${courseId}`">Назад к курсу</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <h1>{{ lesson.title }}</h1>
        <p>{{ lesson.content }}</p>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LessonView',
  data() {
    return {
      courseId: 1, // Здесь должен быть идентификатор курса
      lesson: {
        id: 1,
        title: 'Введение в JavaScript',
        content: 'Содержание урока...'
      }
    }
  }
}
</script>
