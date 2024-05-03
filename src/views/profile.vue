<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <v-img src="https://raw.githubusercontent.com/metnerium/school_project/2765b9dffafd14995ef75c04b55ac09e578f332d/school_app/templates/school_app/img/logopur1.svg" class="ml-2 mt-1 wid1" :width="160"></v-img>
      </v-app-bar-title>
      <v-btn variant="plain" @click="goToPage('')"> Главная </v-btn>
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
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>Информация Аккаунта</v-card-title>
              <v-card-text v-if="username">
                <div v-if="!editingNameMode">
                  <p>Имя: {{ username }} <v-icon @click="editingNameMode = true">mdi-pencil</v-icon></p>
                  <p>Номер телефона: {{ phoneNumber }}</p>
                </div>
                <div v-else>
                  <p>Новое имя: <input v-model="editingName" /></p>
                  <v-btn class="mr-3 mt-2 bg-deep-purple-darken-1" @click="updateName">Сохранить</v-btn>
                  <v-btn class="mr-3 mt-2" @click="editingNameMode = false">Отмена</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card>
              <v-card-title>Мои курсы</v-card-title>
              <v-row>
                <v-col v-for="course in enrolledcourses" :key="course.id" cols="12" sm="6" md="4">
                  <v-card class="mt-2 ml-3 mb-3 mr-3" min-width="350px" min-height="200px">
                    <v-img
                      height="200px"
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                      cover
                    ></v-img>
                    <v-card-title>{{ course.name }}</v-card-title>
                    <v-card-text>{{ course.description }}</v-card-text>
                    <v-btn variant="outlined" class="ml-3 mb-2 border bg-deep-purple-darken-1" @click="this.$router.push('/course/' + course.id)">К курсу</v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mt-5">
              <v-card-title>Доступные курсы</v-card-title>
              <v-row>
                <v-col v-for="course in availableCourses" :key="course.id" cols="12" sm="6" md="4">
                  <v-card class="mt-2 ml-3 mb-3 mr-3" min-width="350px" min-height="200px">
                    <v-img
                      height="200px"
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                      cover
                    ></v-img>
                    <v-card-title>{{ course.name }}</v-card-title>
                    <v-card-text>{{ course.description }}</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-list-item-action class="align-start" v-if="isEnrolledInCourse(course.id)">
                        <v-icon color="success">mdi-check</v-icon>
                        <span>Вы зачислены</span>
                      </v-list-item-action>
                      <v-list-item-action v-else>
                        <v-btn class="mr-3 mt-2 bg-deep-purple-darken-1" @click="enrollCourse(course.id)">Записаться</v-btn>
                      </v-list-item-action>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      availableCourses: [],
      enrolledcourses:[],
      username: null,
      phoneNumber: null,
      editingName: null,
      editingNameMode: false,
    }
  },
  created() {
    this.fetchProfileData();
  },
  methods: {
    goToPage(page) {
      this.$router.push(`/${page}`);
    },
    async fetchProfileData() {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken) {
        try {
          const profileResponse = await axios.get('/profile', {
            params: { jwt_token: jwtToken }
          })
          this.username = profileResponse.data.username
          this.phoneNumber = profileResponse.data.phone_number
          this.editingName = this.username;

          const coursesResponse = await axios.get('/courses')
          this.availableCourses = coursesResponse.data
          const encourseResponse = await axios.get('/enrolled_courses', {
            params: { jwt_token: jwtToken }
          })
          this.enrolledcourses = encourseResponse.data
        } catch (error) {
          console.error('Error fetching data:', error)
          this.$router.push('/login')
        }
      } else {
        this.$router.push('/login')
      }
    },
    async enrollCourse(courseId) {
      try {
        const jwtToken = localStorage.getItem('jwtToken')
        await axios.post('/enroll', {jwt_token: jwtToken, course_id: courseId})
        this.fetchProfileData(); // Обновить данные после зачисления на курс
      } catch (error) {
        console.error('Error enrolling in course:', error)
      }
    },
    async updateName() {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await axios.post('/set_name', {
          name: this.editingName,
          jwt_token: jwtToken,
        });
        this.username = this.editingName;
        this.editingNameMode = false;
      } catch (error) {
        console.error('Ошибка обновления имени:', error);
      }
    },
    isEnrolledInCourse(courseId) {
      return this.enrolledcourses.some(course => course.id === courseId);
    }
  }
}
</script>
