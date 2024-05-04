<template>
  <v-app>
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
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <h1>О нас</h1>
            <p>
              Онлайн школа "Династия" специализируется на подготовке к ЕГЭ, ОГЭ и репетиторстве по различным предметам. Наши опытные преподаватели помогут вам достичь высоких результатов и поступить в желаемый вуз.
            </p>
            <p>
              Мы используем современные методики обучения, адаптированные для онлайн-формата. Наши курсы разработаны с учетом требований экзаменов и включают в себя теоретическую и практическую части.
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <v-img src="https://raw.githubusercontent.com/metnerium/school_project/2765b9dffafd14995ef75c04b55ac09e578f332d/school_app/templates/school_app/img/logopur1.svg"
                             alt="Изображение школы"></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2>Наши преимущества</h2>
            <v-row>
              <v-col cols="12" md="4">
                <v-card>
                  <v-card-title>Опытные преподаватели</v-card-title>
                  <v-card-text>
                    Наши преподаватели имеют большой опыт в подготовке к экзаменам и обладают глубокими знаниями в своих предметных областях.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card>
                  <v-card-title>Индивидуальный подход</v-card-title>
                  <v-card-text>
                    Мы разрабатываем индивидуальные программы обучения, учитывая уровень подготовки и потребности каждого ученика.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card>
                  <v-card-title>Гибкий график</v-card-title>
                  <v-card-text>
                    Занятия проводятся в удобное для вас время, что позволяет совмещать обучение с работой или учебой.
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "AboutUs",
  data() {
    return {
      username: null,
      navItems: [
        { title: "Главная", route: "" },
        { title: "ЕГЭ", route: "courses" },
        { title: "Курсы", route: "courses" },
        { title: "Преподаватели", route: "teachers" },
        { title: "О нас", route: "about" },
      ],
    };
  },
  created() {
    this.fetchProfileData();
  },
  methods: {
    goToPage(page) {
      this.$router.push(`/${page}`);
    },
    async fetchProfileData() {
      try {
        console.log(this.$store.state.jwtToken);
        const response = await axios.get("/profile", {
          params: {
            jwt_token: this.$store.state.jwtToken,
          },
        });
        this.username = response.data.username;
        console.log(this.username);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    },
  },
};
</script>
