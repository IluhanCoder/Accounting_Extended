import $api from "../axios-setup"

export default new class DepartamentService {
    async createDepartament(name: string, userIds: string[]) {
        await $api.post("/departament", {name, userIds});
    }

    async pushUser(departamentId: string, userId: string) {
        await $api.patch(`/departament/user/${departamentId}`, {userId});
    }

    async fetchDepartaments() {
        return (await $api.get(`/departaments`)).data
    }
}