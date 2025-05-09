// Texts in the Spanish language.

export default {
  error: {
    notFound: 'Ups. Nada aquí...',
    withoutPermission: 'Lo siento, no tienes permisos.',
    labelButton: 'Ir al inicio',
  },
  globalMessages: {
    wait: 'Por favor, espere un momento...',
    successfulChange: '¡Nota actualizada con éxito!',
    successfulCreate: '¡Nota creada con éxito!',
    errorApi: 'Ocurrió algo inesperado intenta de nuevo.',
    errorNotFound: 'Usuario no encontrado.',
    errorDisabled: 'Usuario deshabilitado.',
    confirm: '¿Está seguro?',
    delete: 'Se eliminara: ',
    errorFetchingData: 'Error al obtener los datos.',
  },
  layout: {
    mainLayout: {
      loginPage: {
        titles: {
          main: 'Iniciar sesión',
        },
        form: {
          email: 'Correo Electrónico',
          password: 'Contraseña',
          emailPlaceholder: 'Ingrese su correo',
          passwordPlaceholder: 'Ingrese su contraseña',
        },
        buttons: {
          login: 'Iniciar Sesión',
          forgotPassword: '¿Olvidaste tu contraseña?',
          showPassword: 'Mostrar Contraseña',
          hidePassword: 'Ocultar Contraseña',
        },
        messages: {
          successLogin: 'Inicio de sesión exitoso',
          invalidLogin: 'Credenciales incorrectas',
          errorLogin: 'Error en el inicio de sesión',
        },
      },
      profile: {
        titles: {
          profile: 'Perfil',
          name: 'Nombre',
          email: 'Correo',
          verification: 'Verificación',
        },
        buttons: {
          logOut: 'Cerrar sesión',
        },
        messages: {
          errorProfile: 'No se pudo cargar el perfil. Por favor, intente nuevamente.',
          successSignout: 'Sesión cerrada de manera exitosa',
          errorSignout: 'No se pudo cerrar sesión. Por favor, intente nuevamente.',
        },
      },
      notesDashboard: {
        titles: {
          notes: 'Notas',
          createNote: 'Crear Nota',
          editNote: 'Editar Nota',
          deleteNote: 'Eliminar Nota',
        },
        buttons: {
          seeMore: 'Ver Más',
          delete: 'Eliminar',
          accept: 'Aceptar',
          cancel: 'Cancelar',
        },
        messages: {
          noNotes: 'Actualmente no tienes ninguna nota activa.',
          errorNotes: 'No se pudo actualizar el listado de notas. Por favor, intente nuevamente.',
          errorNote: 'No se pudo visualizar la nota. Por favor, intente nuevamente.',
          successCreate: 'Nota creada de manera exitosa',
          errorCreate: 'No se pudo crear la nota. Por favor, intente nuevamente.',
          successEdit: 'Nota actualizada de manera exitosa',
          errorEdit: 'No se pudo actualizar la nota. Por favor, intente nuevamente.',
          confirmationDelete: '¿Estás seguro de que quieres eliminar la nota?',
          successDelete: 'Nota eliminada de manera exitosa',
          errorDelete: 'No se pudo eliminar la nota. Por favor, intente nuevamente.',
        },
      },
    },
  },
};
