import http from './http-common'

class UrgencyService{
    postUrgency(data){
        return http.post("/Urgencies",data);
    }
    getByGuardianId(id){
        return http.get(`/Urgencies?guardianId=${id}`);
    }
}

export default new UrgencyService();
