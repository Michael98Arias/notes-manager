<template>
    <q-drawer v-model="modelValue" side="right" overlay bordered behavior="mobile">
        <q-toolbar class="q-px-md q-pt-sm">
            <q-toolbar-title>{{ t('layout.mainLayout.profile.titles.profile') }}</q-toolbar-title>

            <q-btn v-if="$q.screen.width < 720" dense flat round icon="close" @click="modelValue = false"
                class="q-ml-auto" />
        </q-toolbar>

        <q-list class="q-pa-md">
            <div class="column items-center q-mb-md">
                <q-avatar size="64px" icon="person" color="primary" text-color="white" />
                <q-separator class="q-my-sm" />

                <div v-if="user?.firstName && user?.lastName" class="q-mb-md q-mt-sm text-center">
                    <div class="text-h6 q-mt-sm">{{ t('layout.mainLayout.profile.titles.name') }}</div>
                    <div class="text-caption">{{ user.firstName + ' ' + user.lastName }}</div>
                </div>

                <div v-if="user?.email" class="q-mb-md q-mt-sm text-center">
                    <div class="text-h6 q-mt-sm">{{ t('layout.mainLayout.profile.titles.email') }}</div>
                    <div class="text-caption">{{ user.email }}</div>
                </div>

                <div v-if="user?.emailVerified !== undefined" class="q-mb-md q-mt-sm text-center">
                    <div class="text-h6 q-mt-sm">{{ t('layout.mainLayout.profile.titles.verification') }}</div>
                    <div class="text-caption">{{ user.emailVerified ? '✔️' : '❌' }}</div>
                </div>
            </div>

            <q-separator class="q-my-sm" />

            <q-item clickable @click="logout">
                <q-item-section avatar>
                    <q-icon name="logout" />
                </q-item-section>
                <q-item-section>{{ t('layout.mainLayout.profile.buttons.logOut') }}</q-item-section>
            </q-item>
        </q-list>

    </q-drawer>
</template>

<script setup lang="ts">
import { useUserProfile } from 'src/composables/useUserProfile';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';

const { t } = useI18n();
const modelValue = defineModel<boolean | null>({ default: false });

const { user, loadProfile, signOut } = useUserProfile();

async function logout() {
    await signOut();
    modelValue.value = false;
}

watch(
    () => modelValue.value,
    async (newVal) => {
        if (newVal) {
            try {
                await loadProfile();
            } catch (err) {
                console.error('Error loading profile:', err);
            }
        }
    }
);
</script>
