<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Онлайн Школа - Панель администратора</v-toolbar-title>
      <span class="ml-2">{{ currentUser.name }}</span>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ currentUser.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ currentUser.phone_number }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <h1>Панель администратора</h1>
        <v-card>
          <v-tabs
            v-model="tab"
            bg-color="primary"
          >
            <v-tab value="one">Пользователи</v-tab>
            <v-tab value="two">Курсы</v-tab>
            <v-tab alue="three">Зачисления</v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="one">
                <v-data-table
                  :headers="userHeaders"
                  :items="users"
                  :sort-by="['phone_number']"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Пользователи</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="addUserDialog" max-width="500px">
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">Новый пользователь</span>
                          </v-card-title>
                          <v-card-text>
                            <v-form ref="addUserForm">
                              <v-text-field v-model="newUser.phone_number" label="Номер телефона" required></v-text-field>
                            </v-form>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="addUserDialog = false">Отмена</v-btn>
                            <v-btn color="blue darken-1" text @click="addUser">Сохранить</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-btn color="primary" dark class="mb-2" @click="addUserDialog = true">
                        Добавить пользователя
                      </v-btn>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn color="error" @click="deleteUser(item)">Удалить</v-btn>
                  </template>
                </v-data-table>
              </v-tabs-window-item>

              <v-tabs-window-item value="two">
                <v-data-table
                  :headers="courseHeaders"
                  :items="courses"
                  :sort-by="['name']"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Курсы</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="addCourseDialog" max-width="500px">
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">Новый курс</span>
                          </v-card-title>
                          <v-card-text>
                            <v-form ref="addCourseForm">
                              <v-text-field v-model="newCourse.name" label="Название курса" required></v-text-field>
                              <v-text-field
                                v-model="newCourse.lessons"
                                label="Уроки (через запятую)"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="newCourse.video_links"
                                label="Ссылки на видео (через запятую)"
                                required
                              ></v-text-field>
                            </v-form>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="addCourseDialog = false">Отмена</v-btn>
                            <v-btn color="blue darken-1" text @click="addCourse">Сохранить</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-btn color="primary" dark class="mb-2" @click="addCourseDialog = true">
                        Добавить курс
                      </v-btn>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn color="primary" @click="editCourse(item)">Редактировать</v-btn>
                    <v-btn color="error" @click="deleteCourse(item)">Удалить</v-btn>
                  </template>
                </v-data-table>
              </v-tabs-window-item>

              <v-tabs-window-item value="three">
                <v-data-table
                  :headers="enrollmentHeaders"
                  :items="enrollments"
                  class="elevation-1"
                >

                </v-data-table>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      tab: null,
      addUserDialog: false,
      addCourseDialog: false,
      newUser: {
        phone_number: '',
      },
      newCourse: {
        name: '',
        lessons: '',
        video_links: '',
      },
      userHeaders: [
        { text: 'Имя', value: 'username' },
        { text: 'Номер телефона', value: 'phone_number' },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      users: [],
      courseHeaders: [
        { text: 'Название курса', value: 'name' },
        { text: 'Уроки', value: 'lessons' },
        { text: 'Ссылки на видео', value: 'video_links' },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      courses: [],
      enrollmentHeaders: [
        { text: 'Пользователь', value: 'user.username' },
        { text: 'Курс', value: 'course.name' },
      ],
      enrollments: [],
      jwtToken: null,
      currentUser: {
        name: '',
        phone_number: '',
      },
    }
  },
  created() {
    this.jwtToken = localStorage.getItem('jwtToken')
    if (this.jwtToken) {
      this.fetchUsers()
      this.fetchCourses()
      this.fetchEnrollments()
      this.fetchProfile()
    } else {
      console.error('JWT токен не найден в локальном хранилище')
    }
  },
  methods: {
    fetchUsers() {
      axios.get('/users', {
        params: {
          jwt_token: this.jwtToken
        }
      })
        .then(response => {
          this.users = response.data.map(user => ({
            id: user.id,
            username: user.username,
            phone_number: user.phone_number
          }))
        })
        .catch(error => {
          console.error('Ошибка при получении пользователей:', error)
        })
    },
    fetchCourses() {
      axios.get('/courses')
        .then(response => {
          this.courses = response.data
        })
        .catch(error => {
          console.error('Ошибка при получении курсов:', error)
        })
    },
    fetchProfile() {
      axios.get('/profile', {
        params: {
          jwt_token: this.jwtToken
        }
      })
        .then(response => {
          this.currentUser.name = response.data.username
          this.currentUser.phone_number = response.data.phone_number
        })
        .catch(error => {
          console.error('Ошибка при получении профиля:', error)
        })
    },
    fetchEnrollments() {
      axios.get('/enrollments', {
        params: {
          jwt_token: this.jwtToken
        }
      })
        .then(response => {
          this.enrollments = response.data
        })
        .catch(error => {
          console.error('Ошибка при получении зачислений:', error)
        })
    },
    addUser() {
      axios.post('/users', this.newUser, {
        params: {
          jwt_token: this.jwtToken
        }
      })
        .then(response => {
          console.log('Новый пользователь добавлен:', response.data)
          this.addUserDialog = false
          this.newUser = { phone_number: '' }
          this.fetchUsers()
        })
        .catch(error => {
          console.error('Ошибка при добавлении пользователя:', error)
        })
    },
    deleteUser(user) {
      const userId = user.id
      axios.delete(`/users/${userId}`, {
        params: {
          jwt_token: this.jwtToken
        }
      })
        .then(() => {
          console.log('Пользователь удален:', user)
          this.fetchUsers()
        })
        .catch(error => {
          console.error('Ошибка при удалении пользователя:', error)
        })
    },
    addCourse() {
      const course = {
        name: this.newCourse.name,
        lessons: this.newCourse.lessons.split(','),
        video_links: this.newCourse.video_links.split(',')
      }
      axios.post('/create_courses', course)
        .then(response => {
          console.log('Новый курс добавлен:', response.data)
          this.addCourseDialog = false
          this.newCourse = {
            name: '',
            lessons: '',
            video_links: '',
          }
          this.fetchCourses()
        })
        .catch(error => {
          console.error('Ошибка при добавлении курса:', error)
        })
    },
    editCourse(course) {
      const courseId = course.id
      const updatedCourse = {
        name: course.name,
        lessons: course.lessons,
        video_links: course.video_links
      }
      axios.put(`/edit_courses/${courseId}`, updatedCourse)
        .then(response => {
          console.log('Курс обновлен:', response.data)
          this.fetchCourses()
        })
        .catch(error => {
          console.error('Ошибка при обновлении курса:', error)
        })
    },
    deleteCourse(course) {
      const courseId = course.id
      axios.delete(`/edit_courses/${courseId}`)
        .then(() => {
          console.log('Курс удален:', course)
          this.fetchCourses()
        })
        .catch(error => {
          console.error('Ошибка при удалении курса:', error)
        })
    }
  }
}
</script>
