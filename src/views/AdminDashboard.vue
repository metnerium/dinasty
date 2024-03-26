<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Онлайн Школа - Панель администратора</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <h1>Панель администратора</h1>
        <v-tabs v-model="tab">
          <v-tab>Пользователи</v-tab>
          <v-tab>Курсы</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-data-table
              :headers="userHeaders"
              :items="users"
              sort-by="username"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Пользователи</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="addUserDialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                        Добавить пользователя
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Новый пользователь</span>
                      </v-card-title>
                      <v-card-text>
                        <v-form ref="addUserForm">
                          <v-text-field v-model="newUser.username" label="Имя пользователя" required></v-text-field>
                          <v-text-field
                            v-model="newUser.password"
                            label="Пароль"
                            type="password"
                            required
                          ></v-text-field>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="addUserDialog = false">Отмена</v-btn>
                        <v-btn color="blue darken-1" text @click="addUser">Сохранить</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn color="primary" @click="editUser(item)">Редактировать</v-btn>
                <v-btn color="error" @click="deleteUser(item)">Удалить</v-btn>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item>
            <v-data-table
              :headers="courseHeaders"
              :items="courses"
              sort-by="title"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Курсы</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="addCourseDialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                        Добавить курс
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Новый курс</span>
                      </v-card-title>
                      <v-card-text>
                        <v-form ref="addCourseForm">
                          <v-text-field v-model="newCourse.title" label="Название курса" required></v-text-field>
                          <v-textarea v-model="newCourse.description" label="Описание курса" required></v-textarea>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="addCourseDialog = false">Отмена</v-btn>
                        <v-btn color="blue darken-1" text @click="addCourse">Сохранить</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn color="primary" @click="editCourse(item)">Редактировать</v-btn>
                <v-btn color="error" @click="deleteCourse(item)">Удалить</v-btn>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      tab: null,
      addUserDialog: false,
      addCourseDialog: false,
      newUser: {
        username: '',
        password: ''
      },
      newCourse: {
        title: '',
        description: ''
      },
      userHeaders: [
        { text: 'Имя пользователя', value: 'username' },
        { text: 'Действия', value: 'actions', sortable: false }
      ],
      users: [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' },
        { id: 3, username: 'user3' }
      ],
      courseHeaders: [
        { text: 'Название курса', value: 'title' },
        { text: 'Описание', value: 'description' },
        { text: 'Действия', value: 'actions', sortable: false }
      ],
      courses: [
        { id: 1, title: 'Курс по JavaScript', description: 'Изучите JavaScript с нуля' },
        { id: 2, title: 'Курс по Python', description: 'Освойте Python для анализа данных' },
        { id: 3, title: 'Курс по React', description: 'Создавайте современные веб-приложения с React' }
      ]
    }
  },
  methods: {
    addUser() {
      // Логика добавления нового пользователя в базу данных
      console.log('Добавлен новый пользователь:', this.newUser)
      this.addUserDialog = false
      this.newUser = { username: '', password: '' }
    },
    editUser(user) {
      // Логика редактирования пользователя
      console.log('Редактируется пользователь:', user)
    },
    deleteUser(user) {
      // Логика удаления пользователя
      console.log('Удаляется пользователь:', user)
    },
    addCourse() {
      // Логика добавления нового курса в базу данных
      console.log('Добавлен новый курс:', this.newCourse)
      this.addCourseDialog = false
      this.newCourse = { title: '', description: '' }
    },
    editCourse(course) {
      // Логика редактирования курса
      console.log('Редактируется курс:', course)
    },
    deleteCourse(course) {
      // Логика удаления курса
      console.log('Удаляется курс:', course)
    }
  }
}
</script>
