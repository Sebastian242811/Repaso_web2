import html from './http-common'

class GuardianService{
    getAll(){
        return html.get('/Guardians');
    }
    getById(id){
        return html.get(`/Guardians/${id}`);
    }
}

export default new GuardianService();
