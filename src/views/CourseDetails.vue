<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-title>
        <v-img src="https://raw.githubusercontent.com/metnerium/school_project/2765b9dffafd14995ef75c04b55ac09e578f332d/school_app/templates/school_app/img/logopur1.svg" class="ml-2 mt-1 wid1" :width="160"></v-img>
      </v-app-bar-title>
      <v-btn variant="plain" @click="goToPage('courses')">
        Курсы
      </v-btn>
      <v-btn variant="outlined" @click="goToPage('login')">
        Войти <v-icon icon="mdi-login-variant" end></v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer width="244">
      <h2 class="ml-3 mt-3 align-content-end">{{course.title}}</h2>

      <v-list>
        <v-list-item
          v-for="lesson in course.lessons"
          :key="lesson.id"
          :title=lesson.title
          link
          variant="tonal"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      class="px-3"
      color="grey-lighten-4"
      height="72"
      flat
    >
      <h1>{{course.lessons[0].title}}</h1>

    </v-app-bar>

    <v-main>
      <v-container>
        <v-responsive width="100%" height="500px">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/zEUN2hBBdmk"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </v-responsive>
      </v-container>
    </v-main>
    <v-footer
      height="72"
      app
    >
      <v-row justify="end">
        <v-btn class="mr-3" color="green" variant="outlined" @click="goToPage('')">
          Следующий урок
        </v-btn>
      </v-row>

    </v-footer>

  </v-app>
</template>

<script>
export default {
  name: 'CourseDetails',
  data() {
    return {
      course: {
        id: 1,
        title: 'Курс подготовки к ЕГЭ по математике',
        description: 'Всесторонняя подготовка к успешной сдаче ЕГЭ по математике профильного уровня',
        lessons: [
          {
            id: 1,
            title: 'Алгебраические выражения и уравнения',
            description: 'Разберем способы преобразования алгебраических выражений, решения различных видов уравнений и систем уравнений, необходимые для успешного выполнения заданий ЕГЭ.'
          },
          {
            id: 2,
            title: 'Функции и их свойства',
            description: 'Изучим основные свойства функций, построение графиков и решение задач на исследование функций, которые встречаются в заданиях ЕГЭ.'
          },
          {
            id: 3,
            title: 'Геометрия на плоскости и в пространстве',
            description: 'Повторим основные геометрические формулы и теоремы, научимся применять их для решения задач по планиметрии и стереометрии, включая задания повышенной сложности из ЕГЭ.'
          },
          {
            id: 4,
            title: 'Производная и ее применение',
            description: 'Разберем правила дифференцирования и научимся использовать производную для исследования функций и решения прикладных задач, встречающихся в ЕГЭ.'
          },
          {
            id: 5,
            title: 'Вероятность и статистика',
            description: 'Изучим основные понятия теории вероятностей и статистики, научимся решать задачи на комбинаторику, вычисление вероятностей событий и анализ статистических данных, которые включены в ЕГЭ.'
          }
        ]
      }
    }
  },
  methods: {
    goToPage(page) {
      this.$router.push(`/${page}`);
    },
  },
}
</script>
