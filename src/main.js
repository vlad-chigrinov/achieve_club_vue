import '../assets/styles/app.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './Pages/HomePage.vue'
import LoginPage from './Pages/LoginPage.vue'
import RegistrationPage from './Pages/RegistrationPage.vue'
import TopUsersPage from './Pages/TopUsersPage.vue'
import InfoPage from './Pages/InfoPage.vue'
import AnotherUserPage from './Pages/AnotherUserPage.vue'
import { createI18n } from 'vue-i18n'
import axios from 'axios'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/registration', component: RegistrationPage },
  { path: '/topusers', component: TopUsersPage },
  { path: '/info', component: InfoPage },
  { path: '/users/:id', component: AnotherUserPage }
]

const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes
})

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'ru',
  fallbackLocale: 'ru',
  availableLocales: ['ru', 'pl'],
  messages: {
    ru: {
      login: {
        title: 'Вход в аккаунт',
        or: 'или',
        registerLink: 'зарегистрируйтесь',
        email: 'Почта',
        password: 'Пароль',
        forgotPassword: 'Забыли пароль?',
        login: 'Войти',
        errors: {
          wrongLoginOrPassword: 'Неправильный логин или пароль',
          enterEmail: 'Введите почту',
          wrongEmail: 'Вы ввели недействительную почту',
          enterPassword: 'Введите пароль',
          password6Characters: 'Минимум 6 символом',
          password1Letter: 'Минимум 1 буква',
          password1Digit: 'Минимум 1 цифра'
        }
      },
      forgotPassword: {
        title: 'Восстановление пароля',
        enterEmailHint: 'Введите адрес электронной почты, с помощью которой вы создавали аккаунт',
        email: 'Почта',
        sendCode: 'Отправить код',
        checkEmailHint: 'Проверьте почту {email}. Код должен придти в течение {interval} минут',
        enterCodeHint: 'Введите 4-значный код',
        newPasswordHint: 'Придумайте новый пароль',
        password: 'Пароль',
        passwordConfirm: 'Подтвеждение пароля',
        changePassword: 'Сменить пароль',
        successMessage: 'Пароль был успешно изменен!',
        backToLogin: 'Вернуться ко входу',
        errors: {
          enterEmail: 'Введите почту',
          wrongEmail: 'Вы ввели недействительную почту',
          userWithEmailNotFound: 'Пользователя с такой почтой не существует',
          serverError: 'Ошибка сервера',
          wrongCodeMessage: 'Вы ввели неправильный код, попробуйте еще раз',
          enterPassword: 'Введите пароль',
          password6Characters: 'Минимум 6 символом',
          password1Letter: 'Минимум 1 буква',
          password1Digit: 'Минимум 1 цифра',
          passwordNotEqualConfirmPassword: 'Пароли должны совпадать'
        }
      },
      register: {
        title: 'Зарегистрируйтесь',
        or: 'или',
        loginLink: 'войдите в аккаунт',
        firstName: 'Имя',
        firstNamePlaceholder: 'Введите имя...',
        lastName: 'Фамилия',
        lastNamePlaceholder: 'Введите фамилию...',
        email: 'E-mail',
        password: 'Пароль',
        confirmPassword: 'Подтверждение пароля',
        register: 'Зарегистрироваться',
        checkEmailHint: 'Проверьте почту {email}. Код должен придти в течение {interval} минут',
        checkProofCode: 'Проверить',
        closeModal: 'Закрыть',
        errors: {
          emailAlreadyUse: 'Эта почта уже используется',
          firstName2Letters: 'Имя должно содержать не менее 2 символов',
          lastName5Letters: 'Имя должно содержать не менее 5 символов',
          enterEmail: 'Введите почту',
          wrongEmail: 'Вы ввели недействительную почту',
          enterPassword: 'Введите пароль',
          password6Characters: 'Пароль не должен содержать меньше 6 символов',
          password1Letter: 'Пароль должен содержать минимум 1 букву',
          password1Digit: 'Пароль должен содержать минимум 1 цифру',
          passwordNotEqualConfirmPassword: 'Пароли должны совпадать',
          wrongCode: 'Неверный код'
        }
      },
      menu: {
        profile: 'Профиль',
        topUsers: 'Топ 100',
        infoPage: 'Инфо'
      },
      profile: {
        stats: {
          xpSum: 'Всего XP',
          achieveCompleted: 'Заданий выполнено',
          achieveCompletedFormat: '{0} из {1}'
        },
        filters: {
          combo: 'комбо',
          completed: 'сделано',
          nonCompleted: 'несделано'
        },
        emptyCompletedHero: {
          title: 'Начни выполнять достижения!',
          content:
            'Тут отображаются все твои выполненные достижения, чтобы тут что-то появилось - выполни любое достижение.'
        }
      },
      qrModal: {
        achievementCount: 'Достижений: {count}',
        scanHint: 'Пожалуйста, покажите QR-код тренеру.',
        close: 'Закрыть'
      },
      profileSettings: {
        title: 'Настройки',
        selectAvatar: 'Выбрать аватарку...'
      },
      topUsers: {
        title: 'Топ пользователей'
      },
      userPage: {
        stats: {
          xpSum: 'Всего XP',
          achieveCompleted: 'Заданий выполнено',
          achieveCompletedFormat: '{0} из {1}'
        },
        completedAchievementsTitle: 'Полученные достижения:',
        emptyCompletedHero: {
          title: 'Тут пока пусто!',
          content: '{userName} пока не выполнил ни одного достижения.'
        }
      },
      achievement: {
        startCombo: 'Начни комбо!',
        comboFormat: 'Комбо ×{count}'
      },
      infoPage: [
        {
          title: 'Выполнение достижений',
          subTitle: 'Чтобы выполнить достижение вам нужно:',
          points: [
            'Выбрать желаемое достижение',
            'Нажать на вспывающую кнопку',
            'Попросить у тренера просканировать код'
          ]
        },
        {
          title: 'Получайте XP за достижения',
          points: ['Больше достижений', 'Больше XP', 'Вы поднимаетесь в топе пользователей']
        },
        {
          title: 'Комбо достижения',
          points: [
            'Все комбо достижения отображаются во вкладке КОМБО. Их вы можете выполнять СКОЛЬКО УГОДНО - и каждый раз получать за это очки.',
            'К примеру: если вы выполнили такое достижение на 100 очков 10 раз, то получили 100 × 10 = 1000XP!'
          ]
        },
        {
          title: 'Топ пользователей',
          points: [
            'Чем выше вы в топе - тем вы круче',
            'За первые места в топе можно получить приятные призы'
          ]
        }
      ]
    },
    pl: {
      login: {
        title: 'Logowanie',
        or: 'lub',
        registerLink: 'rejestracja',
        email: 'Poczta',
        password: 'Hasło',
        forgotPassword: 'Zapomniałeś hasła?',
        login: 'Login',
        errors: {
          wrongLoginOrPassword: 'Nieprawidłowy login lub hasło',
          enterEmail: 'Wprowadź swój adres e-mail',
          wrongEmail: 'Wprowadzono nieprawidłowy adres e-mail',
          enterPassword: 'Wprowadź hasło',
          password6Characters: 'Minimum 6 znaków',
          password1Letter: 'Minimum 1 litera',
          password1Digit: 'Minimum 1 cyfra'
        }
      },
      forgotPassword: {
        title: 'Odzyskaj hasło',
        enterEmailHint: 'Wprowadź adres e-mail użyty do utworzenia konta',
        email: 'Poczta',
        sendCode: 'Wyślij kod',
        checkEmailHint: 'Sprawdź {email}. Kod powinien dotrzeć w ciągu {interval} minut',
        enterCodeHint: 'Wprowadź 4-cyfrowy kod',
        newPasswordHint: 'Wprowadź nowe hasło',
        password: 'Hasło',
        passwordConfirm: 'Potwierdź hasło',
        changePassword: 'Zmień hasło',
        successMessage: 'Hasło zostało pomyślnie zmienione!',
        backToLogin: 'Wróć do logowania',
        errors: {
          enterEmail: 'Wprowadź swój adres e-mail',
          wrongEmail: 'Wprowadzono nieprawidłowy adres e-mail',
          userWithEmailNotFound: 'Użytkownik z tym adresem e-mail nie istnieje',
          serverError: 'Błąd serwera',
          wrongCodeMessage: 'Wprowadzono nieprawidłowy kod, spróbuj ponownie',
          enterPassword: 'Wprowadź hasło',
          password6Characters: 'Minimum 6 znaków',
          password1Letter: 'Minimum 1 litera',
          password1Digit: 'Minimum 1 cyfra',
          passwordNotEqualConfirmPassword: 'Hasła muszą być zgodne'
        }
      },
      register: {
        title: 'Rejestracja',
        or: 'lub',
        loginLink: 'logowanie',
        firstName: 'Nazwa',
        firstNamePlaceholder: 'Wprowadź nazwę...',
        lastName: 'Nazwisko',
        lastNamePlaceholder: 'Wprowadź nazwisko...',
        email: 'E-mail',
        password: 'Hasło',
        confirmPassword: 'Potwierdzenie hasła',
        register: 'Zarejestruj się',
        checkEmailHint: 'Sprawdź {email}. Kod powinien dotrzeć w ciągu {interval} minut',
        checkProofCode: 'Sprawdź to',
        closeModal: 'Zamknij',
        errors: {
          emailAlreadyUse: 'Ten post jest już używany',
          firstName2Letters: 'Nazwa musi składać się z co najmniej 2 znaków',
          lastName5Letters: 'Nazwa musi składać się z co najmniej 5 znaków',
          enterEmail: 'Wprowadź swój adres e-mail',
          wrongEmail: 'Wprowadzono nieprawidłowy adres e-mail',
          enterPassword: 'Wprowadź hasło',
          password6Characters: 'Hasło nie może zawierać mniej niż 6 znaków',
          password1Letter: 'Hasło musi zawierać co najmniej 1 literę',
          password1Digit: 'Hasło musi zawierać co najmniej 1 cyfrę',
          passwordNotEqualConfirmPassword: 'Hasła muszą być zgodne',
          wrongCode: 'Nieprawidłowy kod'
        }
      },
      menu: {
        profile: 'Profil',
        topUsers: 'Top 100',
        infoPage: 'Info'
      },
      profile: {
        stats: {
          xpSum: 'Total XP',
          achieveCompleted: 'Ukończone zadania',
          achieveCompletedFormat: '{0} z {1}'
        },
        filters: {
          combo: 'combo',
          completed: 'done',
          nonCompleted: 'not done'
        },
        emptyCompletedHero: {
          title: 'Zacznij zdobywać osiągnięcia!',
          content:
            'Wszystkie ukończone osiągnięcia są wyświetlane tutaj, aby coś się tutaj pojawiło - ukończ dowolne osiągnięcie.'
        }
      },
      qrModal: {
        achievementCount: 'Osiągnięcia: {count}',
        scanHint: 'Prosimy o pokazanie kodu QR trenerowi.',
        close: 'Zamknij'
      },
      profileSettings: {
        title: 'Ustawienia',
        selectAvatar: 'Wybierz awatar...'
      },
      topUsers: {
        title: 'Najlepsi użytkownicy'
      },
      userPage: {
        stats: {
          xpSum: 'Total XP',
          achieveCompleted: 'Ukończone zadania',
          achieveCompletedFormat: '{0} z {1}'
        },
        completedAchievementsTitle: 'Zdobyte osiągnięcia:',
        emptyCompletedHero: {
          title: 'Nadal jest pusty!',
          content: '{userName} nie ukończył jeszcze żadnych osiągnięć.'
        }
      },
      achievement: {
        startCombo: 'Uruchom kombinację!',
        comboFormat: 'Combo ×{count}'
      },
      infoPage: [
        {
          title: 'Osiągnięcia',
          subTitle: 'Aby zdobyć to osiągnięcie, musisz:',
          points: [
            'Wybierz żądane osiągnięcie',
            'Naciśnij przycisk wyskakujący',
            'Poproś trenera o zeskanowanie kodu'
          ]
        },
        {
          title: 'Zdobywaj XP za osiągnięcia',
          points: ['Więcej osiągnięć', 'Więcej XP', 'Wchodzisz na szczyt użytkowników']
        },
        {
          title: 'Osiągnięcie Combo',
          points: [
            'Wszystkie osiągnięcia combo są wyświetlane w zakładce COMBO. Możesz je wykonywać tyle razy, ile chcesz - i za każdym razem otrzymasz za nie punkty.',
            'Na przykład: jeśli ukończyłeś takie osiągnięcie za 100 punktów 10 razy, otrzymałeś 100 × 10 = 1000XP!'
          ]
        },
        {
          title: 'Najlepsi użytkownicy',
          points: [
            'Im wyżej na górze, tym chłodniej.',
            'Za pierwsze miejsca w czołówce można otrzymać fajne nagrody'
          ]
        }
      ]
    }
  }
})

axios.defaults.baseURL = 'https://localhost:7170/' //'https://achieve.by:5000/'

createApp(App).use(pinia).use(router).use(i18n).mount('#app')
