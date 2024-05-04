<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-title>
        <v-img
          src="https://raw.githubusercontent.com/metnerium/school_project/2765b9dffafd14995ef75c04b55ac09e578f332d/school_app/templates/school_app/img/logopur1.svg"
          class="ml-2 mt-1 wid1"
          :width="160"
        ></v-img>
      </v-app-bar-title>
      <v-btn-toggle v-model="activeBtn" class="hidden-sm-and-down" mandatory>
        <v-btn v-for="(item, i) in navItems" :key="i" @click="goToPage(item.route)">{{ item.title }}</v-btn>
      </v-btn-toggle>
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn class="hidden-md-and-up" color="primary" v-bind="props" icon="mdi-menu"></v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in navItems" :key="i">
            <v-list-item-title @click="goToPage(item.route)">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <span class="username">{{ username }}</span>
    </v-app-bar>

    <v-navigation-drawer width="244">
      <h2 class="ml-3 mt-3 align-content-end">{{ course?.name }}</h2>

      <v-list>
        <v-list-item
          v-for="(lessonTitle, index) in course?.lessons"
          :key="index"
          :title="lessonTitle"
          link
          variant="tonal"
          @click="showLesson(index)"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="currentLesson" class="px-3" color="grey-lighten-4" height="72" flat>
      <h1>{{ currentLesson.title }}</h1>
    </v-app-bar>

    <v-main v-if="currentLesson" class="video-container">
      <v-responsive class="video-wrapper">
        <iframe
          class="video-frame"
          :src="currentLesson.video_link"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </v-responsive>
    </v-main>
    <v-footer v-if="currentLesson" height="72" app>
      <v-row justify="end">
        <v-btn class="mr-3" color="green" variant="outlined" @click="showNextLesson">Следующий урок</v-btn>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseDetails',
  data() {
    return {
      course: null,
      currentLesson: null,
      currentLessonIndex: 0,
      username: null,
      navItems: [
        { title: 'Профиль', route: 'profil' },
        { title: 'ЕГЭ', route: 'courses' },
        { title: 'Курсы', route: 'courses' },
        { title: 'Преподаватели', route: 'teachers' },
        { title: 'О нас', route: 'about' },
      ],
    };
  },
  created() {
    this.fetchCourseDetails();
    this.fetchProfileData();
  },
  methods: {
    async fetchProfileData() {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await axios.get('/profile', {
          params: {
            jwt_token: jwtToken,
          },
        });
        this.username = response.data.username;
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    },
    fetchCourseDetails() {
      const jwtToken = localStorage.getItem('jwtToken');
      const courseId = this.$route.params.id;
      axios
        .get(`/course_details/${courseId}`, {
          params: {
            jwt_token: jwtToken,
          },
        })
        .then((response) => {
          this.course = response.data;
          this.showLesson(0);
        })
        .catch((error) => {
          console.error('Error fetching course details:', error);
        });
    },
    showLesson(lessonIndex) {
      if (this.course && this.course.lessons[lessonIndex]) {
        this.currentLesson = {
          title: this.course.lessons[lessonIndex],
          video_link: this.course.video_links[lessonIndex],
        };
        this.currentLessonIndex = lessonIndex;
      }
    },
    showNextLesson() {
      const nextLessonIndex = this.currentLessonIndex + 1;
      if (nextLessonIndex < this.course.lessons.length) {
        this.showLesson(nextLessonIndex);
      } else {
        console.log('No more lessons in this course.');
      }
    },
    goToPage(page) {
      if (page === '') {
        this.$router.push('/');
      } else {
        this.$router.push(`/${page}`);
      }
    },
  },
};
</script>

<style>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 144px); /* Вычитаем высоту app-bar и footer */
}

.video-wrapper {
  width: 100%;
  max-width: 1200px; /* Максимальная ширина видео */
  height: 0;
  padding-bottom: 56.25%; /* Соотношение сторон 16:9 */
  position: relative;
}

.video-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
