import type { ProfileData } from 'src/interfaces/profile.interface';
import profileService from 'src/services/profile.service';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from 'src/stores/data-store';
import signoutService from 'src/services/signout.service';
import { useRouter } from 'vue-router';

export function useUserProfile() {
  const user = ref<ProfileData | null>(null);
  const error = ref<string | null>(null);
  const $q = useQuasar();
  const { t } = useI18n();
  const authStore = useAuthStore();
  const router = useRouter();

  const loadProfile = async () => {
    $q.loading.show({ message: t('globalMessages.wait') });
    try {
      const profileData = await profileService.getProfile();
      user.value = profileData;
      error.value = null;
    } catch (err) {
      if (err instanceof Error) {
        $q.notify({
          type: 'negative',
          message: t('layout.mainLayout.loginPage.messages.errorProfile'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      } else {
        $q.notify({
          type: 'negative',
          message: t('layout.mainLayout.loginPage.messages.errorProfile'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      }
    } finally {
      $q.loading.hide();
    }
  };
  const signOut = async () => {
    $q.loading.show({ message: t('globalMessages.wait') });

    try {
      await signoutService.deleteSignout();

      authStore.logout();

      user.value = null;
      error.value = null;
      $q.notify({
        type: 'positive',
        message: t('layout.mainLayout.profile.messages.successSignout'),
        actions: [
          {
            icon: 'close',
            color: 'white',
            round: true,
          },
        ],
      });

      void router.push('/login');
    } catch (err) {
      if (err instanceof Error) {
        $q.notify({
          type: 'negative',
          message: t('layout.mainLayout.loginPage.messages.errorSignout'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      } else {
        $q.notify({
          type: 'negative',
          message: t('layout.mainLayout.loginPage.messages.errorSignout'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      }
    } finally {
      $q.loading.hide();
    }
  };
  return {
    user,
    error,
    loadProfile,
    signOut,
  };
}
