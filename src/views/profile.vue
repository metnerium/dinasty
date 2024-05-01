<template>
  <v-app>
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
              <v-card-title>Доступные курсы</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="course in availableCourses" :key="course.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ course.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ course.description }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn color="primary" @click="enrollCourse(course.id)">Enroll</v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card-text>
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
        await axios.post('/enroll', { courseId }, { headers: { 'Authorization': `Bearer ${jwtToken}` } })
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
    }
  }
}
</script>
