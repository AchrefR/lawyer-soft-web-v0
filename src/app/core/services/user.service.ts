import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AddAgentDTO} from "../model/request/addAgent.model";
import {AddLawyerDTO} from "../model/request/addLawyer.model";
import {UpdateAgentDTO} from "../model/request/updateAgent.model";
import {UpdateLawyerDTO} from "../model/request/updateLawyer.model";
import {User} from "../model/user.model";

@Injectable({providedIn: 'root'})
export class UserProfileService {

    url = "http://localhost:8082/api/users"

    constructor(private httpClient: HttpClient) {
    }

    getAll() {
        return this.httpClient.get<User[]>(`api/users`);
    }

    register(user: User) {
        return this.httpClient.post(`/users/register`, user);
    }


    findAllUsers() {
        return this.httpClient.get<User[]>(this.url + "/");
    }

    addAgent(addAgentDTO: AddAgentDTO) {
        return this.httpClient.post<User>(this.url + "/agents/", addAgentDTO);
    }

    addLawyer(addLawyerDTO: AddLawyerDTO) {
        return this.httpClient.post<User>(this.url + "/lawyers/", addLawyerDTO);
    }

    finAllLawyers() {
        return this.httpClient.get<User[]>(this.url + "/allLawyers/")
    }

    deleteUserById(userId: string) {
        return this.httpClient.delete<void>(this.url + "/" + userId)
    }

    updateAgentByAdmin(id: string, updateAgentDTO: UpdateAgentDTO) {
        return this.httpClient.put<User>(this.url + "/" + "agentsByAdmin" + "/" + id, updateAgentDTO)
    }

    updateLawyerByAdmin(id: string, updateLawyerDTO: UpdateLawyerDTO) {
        return this.httpClient.put<User>(this.url + "/" + "lawyersByAdmin" + "/" + id, updateLawyerDTO)
    }

    findUserById(id: string) {
        return this.httpClient.get<User>(this.url + "/" + id)
    }

    updateAgent(id: string, updateAgentDTO: UpdateAgentDTO) {
        return this.httpClient.put<User>(this.url + '/'+"agents"+"/"+ id, updateAgentDTO);
    }

    updateLawyer(id: string, updateLawyerDTO: UpdateLawyerDTO) {
        return this.httpClient.put<User>(this.url + '/'+"lawyers"+"/"+ id, updateLawyerDTO);
    }


}
