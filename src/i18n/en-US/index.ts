// Texts in the English language.

export default {
  error: {
    notFound: 'Oops. Nothing here...',
    withoutPermission: "Sorry, you don't have permissions.",
    labelButton: 'Go Home',
  },
  globalMessages: {
    wait: 'Wait a moment please...',
    successfulChange: '¡Updated with successful!',
    successfulCreate: '¡Successfully created!',
    errorApi: 'Something unexpected happened try again.',
    errorNotFound: 'User not found.',
    errorDisabled: 'Disabled user.',
    confirm: 'Are you sure?',
    delete: 'Will be eliminated: ',
    errorFetchingData: 'Error fetching data.',
  },
  layout: {
    mainLayout: {
      loginPage: {
        titles: {
          main: 'Login',
        },
        form: {
          email: 'Email',
          password: 'Password',
          emailPlaceholder: 'Enter your email',
          passwordPlaceholder: 'Enter your password',
        },
        buttons: {
          login: 'Login',
          forgotPassword: 'Forgot your password?',
          showPassword: 'Show Password',
          hidePassword: 'Hide Password',
        },
        messages: {
          successLogin: 'Login successful',
          invalidLogin: 'Invalid credentials',
          errorLogin: 'Login failed',
        },
      },
      profile: {
        titles: {
          profile: 'Profile',
          name: 'Name',
          email: 'Email',
          verification: 'Verification',
        },
        buttons: {
          logOut: 'Log Out',
        },
        messages: {
          errorProfile: 'Failed to load profile. Please try again.',
          successSignout: 'Session successfully closed',
          errorSignout: 'Could not log out. Please try again.',
        },
      },
      notesDashboard: {
        titles: {
          notes: 'Notes',
          createNote: 'Create Note',
          editNote: 'Edit Note',
          deleteNote: 'Delete Note',
        },
        buttons: {
          seeMore: 'See More',
          delete: 'Delete',
          accept: 'Accept',
          cancel: 'Cancel',
        },
        messages: {
          noNotes: "You don't have any active notes at the moment.",
          errorNotes: 'Could not update the list of notes. Please try again.',
          errorNote: 'Could not view the note. Please try again.',
          successCreate: 'Note created successfully',
          errorCreate: 'Could not create the note. Please try again.',
          successEdit: 'Note updated successfully',
          errorEdit: 'Could not update the note. Please try again.',
          confirmationDelete: 'Are you sure you want to delete the note?',
          successDelete: 'Note deleted successfully',
          errorDelete: 'Could not delete the note. Please try again.',
        },
      },
    },
  },
};
