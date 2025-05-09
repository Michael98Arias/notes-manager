<template>
    <q-card>
        <q-card-section>
            <q-form @submit.prevent="login">
                <q-input v-model="formLogin.email" filled :label="t('layout.mainLayout.loginPage.form.email')"
                    :placeholder="t('layout.mainLayout.loginPage.form.emailPlaceholder')" />

                <q-input v-model="formLogin.password" color="secondary" filled
                    :type="showPassword ? 'text' : 'password'" :label="t('layout.mainLayout.loginPage.form.password')"
                    :placeholder="t('layout.mainLayout.loginPage.form.passwordPlaceholder')">
                    <template v-slot:append>
                        <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                            @click="togglePasswordVisibility" />
                    </template>
                </q-input>

                <q-banner v-if="error" class="bg-red text-white q-mt-md">
                    {{ error }}
                </q-banner>
            </q-form>
        </q-card-section>

        <q-card-actions align="center">
            <q-btn color="secondary" :label="t('layout.mainLayout.loginPage.buttons.login')"
                :disable="!isFormValidLogin" @click="login" />
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
import { useLogin } from 'src/composables/useLogin';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { formLogin, showPassword, togglePasswordVisibility, login, isFormValidLogin, error } = useLogin();
</script>