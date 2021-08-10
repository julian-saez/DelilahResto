const codes = [
    {
    Ok:{
        description: "Se ha realizado con éxito esta solicitud."
    },
    Created:{
        description: "Recurso creado con éxito."
    },
    BadRequest:{
        description: "Falta información para completar esta solicitud."
    },
    Unauthorized:{
        description: "Usuario sin autorización para realizar esta acción."
    },
    Forbidden:{
        description: "No tienes acceso a esta información."
    },
    NotFound:{
        description: "No se ha encontrado el recurso que solicita."
    },
    InternalServerError:{
        description: "Ha ocurrido un error durante el proceso."
    }
}]

module.exports = {
    codes
}